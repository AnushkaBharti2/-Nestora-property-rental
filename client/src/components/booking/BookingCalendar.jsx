import { useState } from 'react';

const BookingCalendar = ({ bookings = [], onDateSelect, selectedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty days for padding
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add actual days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateBooked = (date) => {
    if (!date || bookings.length === 0) return false;
    return bookings.some(booking => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      return date >= start && date <= end && booking.status === 'approved';
    });
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDates?.start || !selectedDates?.end) return false;
    const start = new Date(selectedDates.start);
    const end = new Date(selectedDates.end);
    return date >= start && date <= end;
  };

  const isStartDate = (date) => {
    if (!date || !selectedDates?.start) return false;
    const start = new Date(selectedDates.start);
    return date.toDateString() === start.toDateString();
  };

  const isEndDate = (date) => {
    if (!date || !selectedDates?.end) return false;
    const end = new Date(selectedDates.end);
    return date.toDateString() === end.toDateString();
  };

  const handleDateClick = (date) => {
    if (date && !isDateBooked(date)) {
      onDateSelect(date);
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const days = getDaysInMonth(currentDate);

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          className="btn btn-outline"
          style={{ padding: '0.5rem 1rem' }}
        >
          ←
        </button>
        <h3 style={{ margin: 0 }}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          className="btn btn-outline"
          style={{ padding: '0.5rem 1rem' }}
        >
          →
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem', textAlign: 'center' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{ padding: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
            {day}
          </div>
        ))}

        {days.map((date, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(date)}
            style={{
              padding: '0.5rem',
              cursor: date && !isDateBooked(date) ? 'pointer' : 'not-allowed',
              backgroundColor: isStartDate(date) || isEndDate(date)
                ? 'var(--primary-color)'
                : isDateSelected(date)
                  ? 'rgba(37, 99, 235, 0.2)'
                  : isDateBooked(date)
                    ? 'var(--background-color)'
                    : 'transparent',
              color: isStartDate(date) || isEndDate(date)
                ? 'white'
                : isDateBooked(date)
                  ? 'var(--text-secondary)'
                  : 'inherit',
              borderRadius: '0.25rem',
              opacity: date ? 1 : 0,
              textDecoration: isDateBooked(date) ? 'line-through' : 'none',
            }}
          >
            {date?.getDate()}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginRight: '1rem' }}>
          <span style={{ width: '12px', height: '12px', backgroundColor: 'var(--background-color)', borderRadius: '2px' }}></span>
          Booked
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '12px', height: '12px', backgroundColor: 'rgba(37, 99, 235, 0.2)', borderRadius: '2px' }}></span>
          Selected
        </span>
      </div>
    </div>
  );
};

export default BookingCalendar;
