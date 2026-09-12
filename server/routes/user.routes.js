const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/user.controller');

const { protect, authorize } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(protect);

router.get('/me', getUserProfile);
router.put('/me', updateUserProfile);

// Admin only routes
router.use(authorize('admin'));

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
