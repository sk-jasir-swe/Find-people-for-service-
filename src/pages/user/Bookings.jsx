import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Clock } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useApp } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatCurrency';
export default function Bookings() {
  const { currentUser, bookings } = useApp();
  const list = bookings.filter((b) => b.userId === currentUser?.id);
  return (
    <DashboardLayout
      title="Meeting bookings."
      subtitle="Your upcoming face-to-face conversations and the spaces attached to them."
    >
      {list.length ? (
        <div className="dashboard-panel">
          {list.map((b) => (
            <div className="booking-history-row" key={b.id}>
              <div className="list-row-icon">
                <CalendarDays size={19} />
              </div>
              <div className="list-row-main">
                <strong>{b.spaceName}</strong>
                <small>
                  <MapPin size={12} />
                  {b.area} · <Clock size={12} />
                  {b.date} at {b.time}
                </small>
                <small>
                  {b.duration} hour(s) · Demo booking ID {b.id}
                </small>
              </div>
              <div className="booking-history-price">
                <strong>{formatCurrency(b.amount)}</strong>
                <span className="status-pill">{b.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <CalendarDays size={28} />
          <h3>No bookings yet</h3>
          <p>Choose a meeting space and create a demo reservation.</p>
          <Link to="/meeting-spaces" className="btn btn-primary">
            Explore spaces
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
