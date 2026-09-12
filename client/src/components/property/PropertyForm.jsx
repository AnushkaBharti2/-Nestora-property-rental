import { useState } from 'react';

const PropertyForm = ({ property, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    description: property?.description || '',
    propertyType: property?.propertyType || 'apartment',
    price: property?.price || '',
    deposit: property?.deposit || '',
    address: property?.location?.address || '',
    city: property?.location?.city || '',
    state: property?.location?.state || '',
    zipCode: property?.location?.zipCode || '',
    bedrooms: property?.features?.bedrooms || 1,
    bathrooms: property?.features?.bathrooms || 1,
    sqft: property?.features?.sqft || '',
    parking: property?.features?.parking || false,
    furnished: property?.features?.furnished || false,
    petsAllowed: property?.features?.petsAllowed || false,
    airConditioning: property?.features?.airConditioning || false,
    heating: property?.features?.heating || false,
    availableFrom: property?.availableFrom || '',
    status: property?.status || 'available',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const propertyData = {
      title: formData.title,
      description: formData.description,
      propertyType: formData.propertyType,
      price: Number(formData.price),
      deposit: Number(formData.deposit),
      location: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      features: {
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        sqft: formData.sqft ? Number(formData.sqft) : undefined,
        parking: formData.parking,
        furnished: formData.furnished,
        petsAllowed: formData.petsAllowed,
        airConditioning: formData.airConditioning,
        heating: formData.heating,
      },
      availableFrom: formData.availableFrom || undefined,
      status: formData.status,
    };

    onSubmit(propertyData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Basic Information</h3>
        
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            type="text"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea
            name="description"
            className="form-input"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Property Type *</label>
            <select
              name="propertyType"
              className="form-input"
              value={formData.propertyType}
              onChange={handleChange}
              required
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="studio">Studio</option>
              <option value="room">Room</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Monthly Rent *</label>
            <input
              type="number"
              name="price"
              className="form-input"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Security Deposit</label>
            <input
              type="number"
              name="deposit"
              className="form-input"
              value={formData.deposit}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Location</h3>
        
        <div className="form-group">
          <label className="form-label">Address *</label>
          <input
            type="text"
            name="address"
            className="form-input"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">City *</label>
            <input
              type="text"
              name="city"
              className="form-input"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">State *</label>
            <input
              type="text"
              name="state"
              className="form-input"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Zip Code *</label>
            <input
              type="text"
              name="zipCode"
              className="form-input"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Features</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Bedrooms *</label>
            <input
              type="number"
              name="bedrooms"
              className="form-input"
              value={formData.bedrooms}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Bathrooms *</label>
            <input
              type="number"
              name="bathrooms"
              className="form-input"
              value={formData.bathrooms}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Sq Ft</label>
            <input
              type="number"
              name="sqft"
              className="form-input"
              value={formData.sqft}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Available From</label>
            <input
              type="date"
              name="availableFrom"
              className="form-input"
              value={formData.availableFrom}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="parking"
              checked={formData.parking}
              onChange={handleChange}
            />
            Parking
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="furnished"
              checked={formData.furnished}
              onChange={handleChange}
            />
            Furnished
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="petsAllowed"
              checked={formData.petsAllowed}
              onChange={handleChange}
            />
            Pets Allowed
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="airConditioning"
              checked={formData.airConditioning}
              onChange={handleChange}
            />
            Air Conditioning
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="heating"
              checked={formData.heating}
              onChange={handleChange}
            />
            Heating
          </label>
        </div>
      </div>
      
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Status</h3>
        
        <div className="form-group">
          <label className="form-label">Property Status</label>
          <select
            name="status"
            className="form-input"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>
      
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Saving...' : property ? 'Update Property' : 'Create Property'}
      </button>
    </form>
  );
};

export default PropertyForm;
