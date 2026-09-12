import { formatRelativeTime, getInitials } from '../../utils/helpers';

const ChatList = ({ conversations, selectedId, onSelect }) => {
  return (
    <div className="chat-list">
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <h3>Messages</h3>
      </div>
      
      {conversations.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          No conversations yet
        </div>
      ) : (
        <div>
          {conversations.map((conversation) => (
            <div
              key={conversation._id}
              onClick={() => onSelect(conversation)}
              style={{
                padding: '1rem',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                backgroundColor: selectedId === conversation._id ? 'var(--background-color)' : 'transparent',
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
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
                    fontSize: '0.875rem',
                  }}
                >
                  {getInitials(conversation.otherUser?.name)}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600' }}>{conversation.otherUser?.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {formatRelativeTime(conversation.lastMessage?.createdAt)}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {conversation.lastMessage?.content || 'No messages yet'}
                  </div>
                  {conversation.unreadCount > 0 && (
                    <span
                      className="badge badge-danger"
                      style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}
                    >
                      {conversation.unreadCount} new
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
