import { formatDate, getInitials } from '../../utils/helpers';

const ReviewList = ({ reviews, loading, canDelete, onDelete }) => {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading reviews...</div>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem' }}>Reviews ({reviews.length})</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {reviews.map((review) => (
          <div key={review._id} className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
                  {getInitials(review.user?.name)}
                </div>
                <div>
                  <span style={{ fontWeight: '600' }}>{review.user?.name || 'Anonymous'}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#f59e0b', fontSize: '1.25rem' }}>
                  {'★'.repeat(review.rating)}
                </span>
                <span style={{ color: '#d1d5db', fontSize: '1.25rem' }}>
                  {'★'.repeat(5 - review.rating)}
                </span>
              </div>
            </div>
            
            <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>{review.comment}</p>
            
            {canDelete && (
              <button
                onClick={() => onDelete(review._id)}
                className="btn btn-outline"
                style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                Delete Review
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
