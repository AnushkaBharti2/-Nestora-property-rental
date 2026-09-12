import PropertyCard from './PropertyCard';
import Loader from '../common/Loader';

const PropertyList = ({ properties, loading, error }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3>No Properties Found</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Try adjusting your search criteria or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
