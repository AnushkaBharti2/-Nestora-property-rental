const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a property title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    propertyType: {
      type: String,
      required: [true, 'Please specify property type'],
      enum: ['apartment', 'house', 'condo', 'townhouse', 'studio', 'room'],
    },
    status: {
      type: String,
      enum: ['available', 'rented', 'unavailable'],
      default: 'available',
    },
    price: {
      type: Number,
      required: [true, 'Please provide monthly rent price'],
      min: [0, 'Price cannot be negative'],
    },
    deposit: {
      type: Number,
      default: 0,
    },
    location: {
      address: {
        type: String,
        required: [true, 'Please provide an address'],
      },
      city: {
        type: String,
        required: [true, 'Please provide a city'],
      },
      state: {
        type: String,
        required: [true, 'Please provide a state'],
      },
      zipCode: {
        type: String,
        required: [true, 'Please provide a zip code'],
      },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    features: {
      bedrooms: {
        type: Number,
        required: [true, 'Please specify number of bedrooms'],
        min: 0,
      },
      bathrooms: {
        type: Number,
        required: [true, 'Please specify number of bathrooms'],
        min: 0,
      },
      sqft: {
        type: Number,
        min: 0,
      },
      parking: {
        type: Boolean,
        default: false,
      },
      furnished: {
        type: Boolean,
        default: false,
      },
      petsAllowed: {
        type: Boolean,
        default: false,
      },
      airConditioning: {
        type: Boolean,
        default: false,
      },
      heating: {
        type: Boolean,
        default: false,
      },
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    views: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    availableFrom: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
propertySchema.index({ title: 'text', description: 'text', 'location.city': 'text' });

// Virtual for average rating
propertySchema.virtual('averageRating').get(function () {
  if (this.reviews && this.reviews.length > 0) {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / this.reviews.length).toFixed(1);
  }
  return 0;
});

module.exports = mongoose.model('Property', propertySchema);
