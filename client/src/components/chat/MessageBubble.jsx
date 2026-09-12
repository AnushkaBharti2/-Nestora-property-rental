const MessageBubble = ({ message, isOwn }) => {
  const { content, sender, createdAt } = message;
  
  const formatTime = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message-bubble ${isOwn ? 'sent' : 'received'}`}>
      {!isOwn && (
        <div style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem' }}>
          {sender?.name || 'Unknown'}
        </div>
      )}
      <div>{content}</div>
      <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.25rem', textAlign: 'right' }}>
        {formatTime(createdAt)}
      </div>
    </div>
  );
};

export default MessageBubble;
