const express = require('express');
const router = express.Router();
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
  getFeaturedProperties,
  uploadImages,
} = require('../controllers/property.controller');

const { protect, authorize } = require('../middleware/auth.middleware');
const { uploadMultipleImages } = require('../middleware/upload.middleware');

// Public routes
router.get('/featured', getFeaturedProperties);
router.get('/', getProperties);
router.get('/:id', getProperty);

// Private routes - Landlord/Agent only
router.post('/', protect, authorize('landlord', 'agent'), createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);
router.get('/my/properties', protect, authorize('landlord', 'agent'), getMyProperties);

// Upload images
router.post(
  '/:id/images',
  protect,
  authorize('landlord', 'agent'),
  uploadMultipleImages,
  uploadImages
);

module.exports = router;
