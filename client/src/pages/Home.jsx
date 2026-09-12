import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI } from '../utils/api';
import PropertyCard from '../components/property/PropertyCard';
import Loader from '../components/common/Loader';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getFeatured();
      setFeaturedProperties(response.data.data || []);
    } catch (err) {
      setError('Failed to load featured properties');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center',
        borderRadius: '1rem',
        marginBottom: '3rem'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Find Your Perfect Rental Home
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
          Discover thousands of properties across the country. 
          Connect with landlords and agents directly.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/properties" className="btn" style={{ backgroundColor: 'white', color: '#667eea' }}>
            Browse Properties
          </Link>
          <Link to="/register" className="btn" style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white' }}>
            List Your Property
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Why Choose Us</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
            <h3>Wide Range of Properties</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              From apartments to houses, find the perfect property that fits your needs and budget.
            </p>
          </div>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
            <h3>Direct Communication</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Chat directly with landlords and agents to get your questions answered quickly.
            </p>
          </div>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
            <h3>Verified Reviews</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Read authentic reviews from real tenants to make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Featured Properties</h2>
          <Link to="/properties" className="btn btn-outline">
            View All
          </Link>
        </div>
        
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : featuredProperties.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <p>No featured properties at the moment. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-3">
            {featuredProperties.slice(0, 6).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
