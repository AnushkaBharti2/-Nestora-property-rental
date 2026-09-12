const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    title: {
      type: String,
      required: [true, 'Please provide a review title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide a review comment'],
      maxlength: [1000, 'Comment cannot be more than 1000 characters'],
    },
    photos: [
      {
        public_id: String,
        url: String,
      },
    ],
    isApproved: {
      type: Boolean,
      default: true,
    },
    landlordResponse: {
      response: String,
      respondedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting multiple reviews for the same property
reviewSchema.index({ property: 1, user: 1 }, { unique: true });

// Static method to calculate average rating
reviewSchema.statics.calcAverageRating = async function (propertyId) {
  const stats = await this.aggregate([
    {
      $match: { property: propertyId },
    },
    {
      $group: {
        _id: '$property',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  try {
    await mongoose.model('Property').findByIdAndUpdate(propertyId, {
      averageRating: stats[0] ? stats[0].avgRating.toFixed(1) : 0,
      nRating: stats[0] ? stats[0].nRating : 0,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call calcAverageRating after save
reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.property);
});

// Call calcAverageRating before remove
reviewSchema.pre('remove', function (next) {
  this.constructor.calcAverageRating(this.property);
  next();
});

module.exports = mongoose.model('Review', reviewSchema);
