const jwt = require('jsonwebtoken');
const User = require('../models/User');

const setupSocket = (io) => {
  // Authentication middleware for socket connections
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication required'));
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user
      const user = await User.findById(decoded.id).select('_id name email role');
      
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.name} (${socket.user.id})`);

    // Join user's personal room
    socket.join(socket.user.id);

    // Handle joining conversation rooms
    socket.on('joinConversation', (conversationId) => {
      socket.join(`conversation:${conversationId}`);
      console.log(`User ${socket.user.name} joined conversation: ${conversationId}`);
    });

    // Handle leaving conversation rooms
    socket.on('leaveConversation', (conversationId) => {
      socket.leave(`conversation:${conversationId}`);
      console.log(`User ${socket.user.name} left conversation: ${conversationId}`);
    });

    // Handle typing indicator
    socket.on('typing', (data) => {
      socket.to(`conversation:${data.conversationId}`).emit('userTyping', {
        userId: socket.user.id,
        userName: socket.user.name,
        conversationId: data.conversationId,
      });
    });

    // Handle stop typing
    socket.on('stopTyping', (data) => {
      socket.to(`conversation:${data.conversationId}`).emit('userStoppedTyping', {
        userId: socket.user.id,
        conversationId: data.conversationId,
      });
    });

    // Handle private message
    socket.on('sendPrivateMessage', (data) => {
      const { receiverId, message, conversationId } = data;
      
      // Send to receiver's personal room
      io.to(receiverId).emit('newMessage', {
        message,
        sender: {
          _id: socket.user.id,
          name: socket.user.name,
        },
        conversationId,
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.name} (${socket.user.id})`);
    });

    // Send online status
    socket.broadcast.emit('userOnline', {
      userId: socket.user.id,
    });
  });

  return io;
};

module.exports = setupSocket;
