const express = require('express');
const router = express.Router();
const {
  getPropertyReviews,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
  approveReview,
  respondToReview,
} = require('../controllers/review.controller');

const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/property/:propertyId', getPropertyReviews);

// Private routes
router.get('/my', protect, getMyReviews);
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.post('/:id/respond', protect, respondToReview);

// Admin routes
router.get('/', protect, authorize('admin'), getAllReviews);
router.put('/:id/approve', protect, authorize('admin'), approveReview);

module.exports = router;
