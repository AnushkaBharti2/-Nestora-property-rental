const express = require('express');
const router = express.Router();
const {
  getConversations,
  getMessages,
  sendMessage,
  getUnreadCount,
  startConversation,
  deleteMessage,
} = require('../controllers/message.controller');

const { protect } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(protect);

router.get('/conversations', getConversations);
router.get('/unread', getUnreadCount);
router.get('/:conversationId', getMessages);
router.post('/', sendMessage);
router.post('/conversation', startConversation);
router.delete('/:id', deleteMessage);

module.exports = router;
