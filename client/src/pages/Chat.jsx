import { useState, useEffect } from 'react';
import { messageAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';
import Loader from '../components/common/Loader';

const Chat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation._id);
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await messageAPI.getConversations();
      setConversations(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch conversations', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      setMessagesLoading(true);
      const response = await messageAPI.getMessages(conversationId);
      setMessages(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleSendMessage = async (messageData) => {
    try {
      if (messageData.isNew) {
        const response = await messageAPI.send({
          conversationId: selectedConversation._id,
          content: messageData.content,
        });
        
        // Add the new message to the list
        setMessages(prev => [...prev, response.data.data]);
        
        // Update conversation list
        fetchConversations();
      }
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Messages</h1>
      
      <div className="chat-container">
        <ChatList
          conversations={conversations}
          selectedId={selectedConversation?._id}
          onSelect={handleSelectConversation}
        />
        <ChatWindow
          conversation={selectedConversation}
          messages={messages}
          onSendMessage={handleSendMessage}
          loading={messagesLoading}
        />
      </div>
    </div>
  );
};

export default Chat;
