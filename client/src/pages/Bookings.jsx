import { useState, useEffect } from 'react';
import { bookingAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import BookingCard from '../components/booking/BookingCard';
import Loader from '../components/common/Loader';

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await bookingAPI.getAll(params);
      setBookings(response.data.data || []);
    } catch (err) {
      setError('Failed to load bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await bookingAPI.updateStatus(bookingId, 'approved');
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve booking');
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await bookingAPI.updateStatus(bookingId, 'rejected');
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject booking');
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await bookingAPI.cancel(bookingId);
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>
        {user?.role === 'landlord' || user?.role === 'agent' ? 'Booking Requests' : 'My Bookings'}
      </h1>

      {/* Filter */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem' }}>
        {['all', 'pending', 'approved', 'rejected', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`btn ${filter === status ? 'btn-primary' : 'btn-outline'}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No bookings found</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              userRole={user?.role}
              onApprove={handleApprove}
              onReject={handleReject}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
