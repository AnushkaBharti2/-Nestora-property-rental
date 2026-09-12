import { useState } from 'react';

const ReviewForm = ({ propertyId, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: '1.5rem' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Write a Review</h3>
      
      <div className="form-group">
        <label className="form-label">Rating</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({ ...formData, rating: star })}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: star <= formData.rating ? '#f59e0b' : '#d1d5db',
              }}
            >
              ★
            </button>
          ))}
        </div>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'block' }}>
          {formData.rating} out of 5 stars
        </span>
      </div>
      
      <div className="form-group">
        <label className="form-label">Your Review</label>
        <textarea
          name="comment"
          className="form-input"
          rows="4"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Share your experience with this property..."
          required
        />
      </div>
      
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
