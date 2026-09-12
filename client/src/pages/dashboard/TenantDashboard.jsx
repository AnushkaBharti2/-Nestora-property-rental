import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI, bookingAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/helpers';
import PropertyCard from '../../components/property/PropertyCard';
import Loader from '../../components/common/Loader';

const TenantDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookingsRes] = await Promise.all([
        bookingAPI.getAll({ status: 'approved' }),
      ]);
      setBookings(bookingsRes.data.data || []);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const activeBookings = bookings.filter(b => b.status === 'approved');
  const pendingBookings = bookings.filter(b => b.status === 'pending');

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Welcome, {user?.name}!</h1>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            {activeBookings.length}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>Active Rentals</div>
        </div>
        
        <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-color)' }}>
            {pendingBookings.length}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>Pending Requests</div>
        </div>
        
        <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
            {savedProperties.length}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>Saved Properties</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/properties" className="btn btn-primary">
            Browse Properties
          </Link>
          <Link to="/bookings" className="btn btn-outline">
            View My Bookings
          </Link>
          <Link to="/chat" className="btn btn-outline">
            Messages
          </Link>
        </div>
      </div>

      {/* Active Rentals */}
      {activeBookings.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Your Active Rentals</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activeBookings.slice(0, 3).map((booking) => (
              <div key={booking._id} className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
                <img
                  src={booking.property?.images?.[0]?.url || 'https://via.placeholder.com/150x100?text=No+Image'}
                  alt={booking.property?.title}
                  style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '0.5rem' }}
                />
                <div>
                  <h3 style={{ margin: '0 0 0.5rem' }}>{booking.property?.title}</h3>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    {booking.property?.location?.city}, {booking.property?.location?.state}
                  </p>
                  <p style={{ margin: '0.5rem 0 0', fontWeight: '600' }}>
                    {formatCurrency(booking.totalPrice)}/month
                  </p>
                </div>
                <Link
                  to={`/properties/${booking.property?._id}`}
                  className="btn btn-outline"
                  style={{ marginLeft: 'auto', alignSelf: 'center' }}
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDashboard;
