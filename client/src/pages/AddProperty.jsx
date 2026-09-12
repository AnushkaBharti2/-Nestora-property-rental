import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyAPI } from '../utils/api';
import PropertyForm from '../components/property/PropertyForm';

const AddProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (propertyData) => {
    try {
      setLoading(true);
      setError('');
      const response = await propertyAPI.create(propertyData);
      navigate(`/properties/${response.data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Add New Property</h1>
      
      {error && (
        <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}
      
      <PropertyForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default AddProperty;
