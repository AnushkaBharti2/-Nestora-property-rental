import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyAPI, bookingAPI, reviewAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatDate } from '../utils/helpers';
import Loader from '../components/common/Loader';
import BookingForm from '../components/booking/BookingForm';
import ReviewForm from '../components/review/ReviewForm';
import ReviewList from '../components/review/ReviewList';

const PropertyDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchProperty();
    fetchReviews();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getOne(id);
      setProperty(response.data.data);
    } catch (err) {
      setError('Failed to load property details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getPropertyReviews(id);
      setReviews(response.data.data || []);
    } catch (err) {
      console.error('Failed to load reviews', err);
    }
  };

  const handleBookingSubmit = async (formData) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    try {
      setBookingLoading(true);
      await bookingAPI.create({
        property: id,
        ...formData,
      });
      setSuccessMessage('Booking request sent successfully!');
      setShowBookingForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit booking request');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReviewSubmit = async (formData) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    try {
      setReviewLoading(true);
      await reviewAPI.create({
        property: id,
        ...formData,
      });
      setSuccessMessage('Review submitted successfully!');
      fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error && !property) {
    return (
      <div className="alert alert-danger">
        {error}
        <Link to="/properties" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
          Back to Properties
        </Link>
      </div>
    );
  }

  const mainImage = property?.images?.[0]?.url || 'https://via.placeholder.com/800x600?text=No+Image';

  return (
    <div>
      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success" style={{ marginBottom: '1rem' }}>
          {successMessage}
        </div>
      )}

      {/* Back Button */}
      <Link to="/properties" style={{ textDecoration: 'none', color: 'var(--primary-color)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        ← Back to Properties
      </Link>

      {/* Property Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          {/* Image Gallery */}
          <div style={{ marginBottom: '1rem' }}>
            <img
              src={mainImage}
              alt={property?.title}
              style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '0.75rem' }}
            />
          </div>
          
          {/* Additional Images */}
          {property?.images?.length > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
              {property.images.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`${property.title} ${index + 2}`}
                  style={{ width: '100px', height: '75px', objectFit: 'cover', borderRadius: '0.5rem', cursor: 'pointer' }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Property Info Sidebar */}
        <div>
          <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '100px' }}>
            <div className="property-price" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              {formatCurrency(property?.price)}/month
            </div>
            
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{property?.title}</h2>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              📍 {property?.location?.address}, {property?.location?.city}, {property?.location?.state} {property?.location?.zipCode}
            </p>

            {/* Features */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div>🛏️ {property?.features?.bedrooms} Bedrooms</div>
              <div>🚿 {property?.features?.bathrooms} Bathrooms</div>
              {property?.features?.sqft && <div>📐 {property?.features?.sqft} sq ft</div>}
              {property?.features?.parking && <div>🅿️ Parking</div>}
              {property?.features?.furnished && <div>🪑 Furnished</div>}
              {property?.features?.petsAllowed && <div>🐕 Pets Allowed</div>}
              {property?.features?.airConditioning && <div>❄️ A/C</div>}
              {property?.features?.heating && <div>🔥 Heating</div>}
            </div>

            {/* Status Badge */}
            <span className={`badge badge-${property?.status === 'available' ? 'success' : 'warning'}`} style={{ marginBottom: '1rem' }}>
              {property?.status}
            </span>

            {/* Action Buttons */}
            {property?.status === 'available' && (
              <button
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '0.5rem' }}
              >
                Book Now
              </button>
            )}
            
            <Link to={`/chat?property=${property?._id}&landlord=${property?.landlord?._id}`} className="btn btn-outline" style={{ width: '100%' }}>
              Contact Landlord
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      {showBookingForm && (
        <div style={{ marginBottom: '2rem' }}>
          <BookingForm
            property={property}
            onSubmit={handleBookingSubmit}
            loading={bookingLoading}
          />
        </div>
      )}

      {/* Description */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Description</h3>
        <p style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{property?.description}</p>
        
        {property?.availableFrom && (
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            Available from: {formatDate(property.availableFrom)}
          </p>
        )}
      </div>

      {/* Reviews Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Reviews</h3>
        
        {isAuthenticated && (
          <div style={{ marginBottom: '2rem' }}>
            <ReviewForm
              propertyId={id}
              onSubmit={handleReviewSubmit}
              loading={reviewLoading}
            />
          </div>
        )}
        
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default PropertyDetail;
