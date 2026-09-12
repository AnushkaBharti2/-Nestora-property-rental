import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { getInitials } from '../../utils/helpers';

const ChatWindow = ({ conversation, messages, onSendMessage, loading }) => {
  const { user } = useAuth();
  const { socket, joinConversation, leaveConversation } = useSocket();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (conversation?._id) {
      joinConversation(conversation._id);
      
      if (socket) {
        socket.on('newMessage', (message) => {
          if (message.conversationId === conversation._id) {
            onSendMessage(message);
          }
        });
      }

      return () => {
        leaveConversation(conversation._id);
        if (socket) {
          socket.off('newMessage');
        }
      };
    }
  }, [conversation?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage({ content: newMessage, isNew: true });
      setNewMessage('');
    }
  };

  if (!conversation) {
    return (
      <div className="chat-window" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
          }}
        >
          {getInitials(conversation.otherUser?.name)}
        </div>
        <div>
          <h3 style={{ margin: 0 }}>{conversation.otherUser?.name}</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {conversation.otherUser?.email}
          </p>
        </div>
      </div>

      <div className="chat-messages">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble
              key={message._id || index}
              message={message}
              isOwn={message.sender === user?._id || message.sender?._id === user?._id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
