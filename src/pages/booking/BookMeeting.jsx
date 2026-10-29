import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
export default function BookMeeting() {
  const { id } = useParams();
  const { meetingSpaces, bookMeeting, addPayment, notify } = useApp();
  const s = meetingSpaces.find((x) => x.id === id);
  const nav = useNavigate();
  const [date, setDate] = useState(
    new Date(Date.now() + 86400000).toISOString().slice(0, 10),
  );
  const [time, setTime] = useState('11:00');
  const [duration, setDuration] = useState('1');
  const [done, setDone] = useState(false);
  const [booking, setBooking] = useState(null);
  if (!s)
    return <div className="container page-shell">Meeting space not found.</div>;
  const total = s.price * Number(duration);
  const submit = (e) => {
    e.preventDefault();
    const p = addPayment({
      purpose: `Meeting room: ${s.name}`,
      amount: total,
      bookingId: null,
    });
    const b = bookMeeting({
      spaceId: s.id,
      spaceName: s.name,
      area: s.area,
      date,
      time,
      duration: Number(duration),
      amount: total,
      paymentId: p.id,
    });
    setBooking(b);
    setDone(true);
    notify('Demo meeting booked');
  };
  return (
    <div className="container page-shell">
      <button className="back-link" onClick={() => nav(-1)}>
        <ArrowLeft size={15} /> Meeting spaces
      </button>
      {done ? (
        <div className="booking-success">
          <div className="success-mark">
            <CheckCircle2 size={34} />
          </div>
          <span className="eyebrow">BOOKING CONFIRMED · DEMO</span>
          <h1>Your space is reserved.</h1>
          <p>
            This is a simulated booking. No physical room has actually been
            reserved and no real money was charged.
          </p>
          <div className="booking-ticket">
            <div>
              <span>MEETING SPACE</span>
              <strong>{s.name}</strong>
              <small>{s.area}</small>
            </div>
            <div>
              <span>DATE & TIME</span>
              <strong>{booking.date}</strong>
              <small>
                {booking.time} · {booking.duration} hour(s)
              </small>
            </div>
            <div>
              <span>DEMO BOOKING ID</span>
              <strong>{booking.id.toUpperCase()}</strong>
              <small>Amount: {formatCurrency(total)}</small>
            </div>
          </div>
          <Button onClick={() => nav('/dashboard')}>View my dashboard</Button>
          <Link to="/meeting-spaces" className="text-link">
            Explore other spaces
          </Link>
        </div>
      ) : (
        <div className="booking-layout">
          <section className="booking-form-card">
            <span className="eyebrow">MAKE IT FACE-TO-FACE</span>
            <h1>
              Book your meeting
              <br />
              <span className="gradient-text">space.</span>
            </h1>
            <p className="muted-paragraph">
              Choose a time that works. This is a demo reservation only.
            </p>
            <div
              className={`space-art space-art-${meetingSpaces.findIndex((x) => x.id === s.id) + 1}`}
            >
              <span className="space-art-label">
                CONNEXT SPACES / RESERVATION
              </span>
              <div className="space-art-shape">
                <span />
                <span />
                <span />
              </div>
            </div>
            <h2>{s.name}</h2>
            <p className="space-location-line">
              <MapPin size={14} />
              {s.area} <span>·</span> {s.capacity}
            </p>
            <form onSubmit={submit} className="booking-fields">
              <label>
                <span>
                  <CalendarDays size={15} /> Meeting date
                </span>
                <input
                  className="form-input"
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </label>
              <label>
                <span>
                  <Clock size={15} /> Start time
                </span>
                <select
                  className="form-input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  {[
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '13:00',
                    '14:00',
                    '15:00',
                    '16:00',
                    '17:00',
                  ].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>
                  <Clock size={15} /> Duration
                </span>
                <select
                  className="form-input"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option value="4">4 hours</option>
                </select>
              </label>
              <Button type="submit" className="full-width">
                Confirm demo booking · {formatCurrency(total)}
              </Button>
            </form>
          </section>
          <aside className="booking-summary">
            <span className="eyebrow">BOOKING SUMMARY</span>
            <h3>Details & pricing</h3>
            <div className="summary-line">
              <span>Space rate</span>
              <strong>{formatCurrency(s.price)} / hour</strong>
            </div>
            <div className="summary-line">
              <span>Duration</span>
              <strong>{duration} hour(s)</strong>
            </div>
            <div className="summary-total">
              <span>Total (demo)</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
            <div className="demo-notice">
              <CheckCircle2 size={16} />
              <p>
                <strong>Demo only.</strong> The booking is saved locally for
                your client presentation. No actual room is reserved.
              </p>
            </div>
            <div className="space-amenities">
              {s.amenities.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
