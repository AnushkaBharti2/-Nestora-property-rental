const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBooking,
  createBooking,
  updateBookingStatus,
  cancelBooking,
  getBookingsSummary,
} = require('../controllers/booking.controller');

const { protect, authorize } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(protect);

// Tenant routes
router.post('/', authorize('tenant'), createBooking);
router.put('/:id/cancel', authorize('tenant'), cancelBooking);

// Landlord routes
router.put('/:id/status', authorize('landlord', 'admin'), updateBookingStatus);
router.get('/summary', authorize('landlord', 'admin'), getBookingsSummary);

// Common routes
router.get('/', getBookings);
router.get('/:id', getBooking);

module.exports = router;
