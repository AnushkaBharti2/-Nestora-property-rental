import { Link } from 'react-router-dom';
import { formatDate, formatCurrency, getStatusColor } from '../../utils/helpers';

const BookingCard = ({ booking, onApprove, onReject, onCancel, userRole }) => {
  const { property, startDate, endDate, status, totalPrice } = booking;

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <img
          src={property?.images?.[0]?.url || 'https://via.placeholder.com/200x150?text=No+Image'}
          alt={property?.title}
          style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '0.5rem' }}
        />
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem' }}>
                <Link to={`/properties/${property?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {property?.title}
                </Link>
              </h3>
              <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {property?.location?.city}, {property?.location?.state}
              </p>
            </div>
            <span className={`badge badge-${getStatusColor(status)}`}>
              {status}
            </span>
          </div>
          
          <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Move-in Date</span>
              <p style={{ margin: '0.25rem 0', fontWeight: '500' }}>{formatDate(startDate)}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Move-out Date</span>
              <p style={{ margin: '0.25rem 0', fontWeight: '500' }}>{formatDate(endDate)}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Price</span>
              <p style={{ margin: '0.25rem 0', fontWeight: '500' }}>{formatCurrency(totalPrice)}</p>
            </div>
          </div>
          
          {/* Action buttons based on role and status */}
          {userRole === 'landlord' && status === 'pending' && (
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => onApprove(booking._id)} className="btn btn-success">
                Approve
              </button>
              <button onClick={() => onReject(booking._id)} className="btn btn-danger">
                Reject
              </button>
            </div>
          )}
          
          {userRole === 'tenant' && status === 'pending' && (
            <div style={{ marginTop: '1rem' }}>
              <button onClick={() => onCancel(booking._id)} className="btn btn-outline">
                Cancel Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
