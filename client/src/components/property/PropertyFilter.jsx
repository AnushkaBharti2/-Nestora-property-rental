import { useState } from 'react';

const PropertyFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    petsAllowed: false,
    parking: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      city: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      petsAllowed: false,
      parking: false,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Filter Properties</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Search</label>
          <input
            type="text"
            name="search"
            className="form-input"
            placeholder="Search properties..."
            value={filters.search}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-input"
            placeholder="Enter city..."
            value={filters.city}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Property Type</label>
          <select
            name="propertyType"
            className="form-input"
            value={filters.propertyType}
            onChange={handleChange}
          >
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="studio">Studio</option>
            <option value="room">Room</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Min Price</label>
          <input
            type="number"
            name="minPrice"
            className="form-input"
            placeholder="Min price..."
            value={filters.minPrice}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            className="form-input"
            placeholder="Max price..."
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Bedrooms</label>
          <select
            name="bedrooms"
            className="form-input"
            value={filters.bedrooms}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Bathrooms</label>
          <select
            name="bathrooms"
            className="form-input"
            value={filters.bathrooms}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
        
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="parking"
              checked={filters.parking}
              onChange={handleChange}
            />
            Parking
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="petsAllowed"
              checked={filters.petsAllowed}
              onChange={handleChange}
            />
            Pets Allowed
          </label>
        </div>
      </div>
      
      <button onClick={handleReset} className="btn btn-outline" style={{ marginTop: '1rem' }}>
        Reset Filters
      </button>
    </div>
  );
};

export default PropertyFilter;
