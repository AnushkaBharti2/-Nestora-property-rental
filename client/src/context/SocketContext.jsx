import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    let newSocket = null;

    if (isAuthenticated && user) {
      // Connect to socket server
      newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
        auth: {
          token: localStorage.getItem('token'),
        },
      });

      newSocket.on('connect', () => {
        console.log('Socket connected');
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });

      newSocket.on('newMessage', (message) => {
        setUnreadCount((prev) => prev + 1);
      });

      newSocket.on('userOnline', (data) => {
        console.log('User online:', data.userId);
      });

      setSocket(newSocket);
    }

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [isAuthenticated, user]);

  const joinConversation = (conversationId) => {
    if (socket) {
      socket.emit('joinConversation', conversationId);
    }
  };

  const leaveConversation = (conversationId) => {
    if (socket) {
      socket.emit('leaveConversation', conversationId);
    }
  };

  const sendTyping = (conversationId) => {
    if (socket) {
      socket.emit('typing', { conversationId });
    }
  };

  const sendStopTyping = (conversationId) => {
    if (socket) {
      socket.emit('stopTyping', { conversationId });
    }
  };

  const sendPrivateMessage = (receiverId, message, conversationId) => {
    if (socket) {
      socket.emit('sendPrivateMessage', { receiverId, message, conversationId });
    }
  };

  const clearUnreadCount = () => {
    setUnreadCount(0);
  };

  const value = {
    socket,
    isConnected,
    unreadCount,
    joinConversation,
    leaveConversation,
    sendTyping,
    sendStopTyping,
    sendPrivateMessage,
    clearUnreadCount,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
