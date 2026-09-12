import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI, bookingAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/helpers';
import PropertyCard from '../../components/property/PropertyCard';
import Loader from '../../components/common/Loader';

const LandlordDashboard = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [propertiesRes, bookingsRes] = await Promise.all([
        propertyAPI.getMyProperties(),
        bookingAPI.getAll(),
      ]);
      setProperties(propertiesRes.data.data || []);
      setBookings(bookingsRes.data.data || []);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await bookingAPI.updateStatus(bookingId, 'approved');
      fetchData();
    } catch (err) {
      console.error('Failed to approve booking', err);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await bookingAPI.updateStatus(bookingId, 'rejected');
      fetchData();
    } catch (err) {
      console.error('Failed to reject booking', err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const totalProperties = properties.length;
  const availableProperties = properties.filter(p => p.status === 'available').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const totalRevenue = bookings
    .filter(b => b.status === 'approved')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Welcome, {user?.name}!</h1>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            {totalProperties}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>Total Properties</div>
        </div>
        
        <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
            {availableProperties}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>Available</div>
        </div>
        
        <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-color)' }}>
            {pendingBookings}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>Pending Requests</div>
        </div>
        
        <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
            {formatCurrency(totalRevenue)}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>Total Revenue</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/add-property" className="btn btn-primary">
            Add New Property
          </Link>
          <Link to="/bookings" className="btn btn-outline">
            Manage Bookings
          </Link>
          <Link to="/chat" className="btn btn-outline">
            Messages
          </Link>
        </div>
      </div>

      {/* Pending Booking Requests */}
      {pendingBookings > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Pending Booking Requests</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {bookings.filter(b => b.status === 'pending').slice(0, 3).map((booking) => (
              <div key={booking._id} className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img
                  src={booking.property?.images?.[0]?.url || 'https://via.placeholder.com/150x100?text=No+Image'}
                  alt={booking.property?.title}
                  style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '0.5rem' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.25rem' }}>{booking.property?.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Tenant: {booking.tenant?.name}
                  </p>
                </div>
                <button onClick={() => handleApprove(booking._id)} className="btn btn-success" style={{ marginRight: '0.5rem' }}>
                  Approve
                </button>
                <button onClick={() => handleReject(booking._id)} className="btn btn-danger">
                  Reject
                </button>
              </div>
            ))}
          </div>
          <Link to="/bookings" style={{ marginTop: '1rem', display: 'inline-block' }}>
            View All Requests →
          </Link>
        </div>
      )}

      {/* My Properties */}
      <div>
        <h2 style={{ marginBottom: '1rem' }}>My Properties</h2>
        {properties.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <p>You haven't listed any properties yet.</p>
            <Link to="/add-property" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Add Your First Property
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3">
            {properties.slice(0, 6).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandlordDashboard;
