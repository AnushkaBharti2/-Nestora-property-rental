import { useState } from 'react';
import { formatDate, formatCurrency } from '../../utils/helpers';

const BookingForm = ({ property, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    message: '',
    contactPhone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Calculate total price based on selected dates
  const calculateTotal = () => {
    if (formData.startDate && formData.endDate && property) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (days > 0) {
        return days * (property.price / 30); // Approximate monthly to daily
      }
    }
    return 0;
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: '1.5rem' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Book Property</h3>
      
      {property && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--background-color)', borderRadius: '0.5rem' }}>
          <div className="property-price">{formatCurrency(property.price)}/month</div>
          <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)' }}>
            {property.location?.city}, {property.location?.state}
          </p>
        </div>
      )}
      
      <div className="form-group">
        <label className="form-label">Move-in Date *</label>
        <input
          type="date"
          name="startDate"
          className="form-input"
          value={formData.startDate}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Move-out Date *</label>
        <input
          type="date"
          name="endDate"
          className="form-input"
          value={formData.endDate}
          onChange={handleChange}
          min={formData.startDate || new Date().toISOString().split('T')[0]}
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Contact Phone</label>
        <input
          type="tel"
          name="contactPhone"
          className="form-input"
          value={formData.contactPhone}
          onChange={handleChange}
          placeholder="Your phone number"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Message to Landlord</label>
        <textarea
          name="message"
          className="form-input"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          placeholder="Introduce yourself and explain why you're interested in this property..."
        />
      </div>
      
      {calculateTotal() > 0 && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--background-color)', borderRadius: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Estimated Duration:</span>
            <span>{Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))} days</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>Estimated Total:</span>
            <span>{formatCurrency(calculateTotal())}</span>
          </div>
        </div>
      )}
      
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
        {loading ? 'Sending...' : 'Send Booking Request'}
      </button>
    </form>
  );
};

export default BookingForm;
