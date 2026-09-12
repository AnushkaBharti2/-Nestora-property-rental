const { upload } = require('../config/cloudinary');

// Upload single image
exports.uploadSingleImage = upload.single('image');

// Upload multiple images
exports.uploadMultipleImages = upload.array('images', 10);

// Upload user avatar
exports.uploadAvatar = upload.single('avatar');

// Error handling middleware for multer
exports.handleMulterError = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload error',
      error: err,
    });
  }
  next();
};

// File filter helper
exports.fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(file.mimetype.toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};
