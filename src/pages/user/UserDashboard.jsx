import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
  Users,
  Wallet,
  Search,
  Clock,
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useApp } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatCurrency';
export default function UserDashboard() {
  const { currentUser, professionals, connections, bookings, payments, chats } =
    useApp();
  const myConnections = connections.filter((c) => c.userId === currentUser?.id);
  const myBookings = bookings.filter((b) => b.userId === currentUser?.id);
  const myPayments = payments.filter((p) => p.userId === currentUser?.id);
  const people = myConnections
    .map((c) => professionals.find((p) => p.id === c.professionalId))
    .filter(Boolean);
  return (
    <DashboardLayout
      title={`Good to see you, ${currentUser?.name?.split(' ')[0] || 'there'}.`}
      subtitle="Your space for the conversations and connections that move you forward."
    >
      <div className="stats-grid">
        <div className="stat-card">
          <span>YOUR CONNECTIONS</span>
          <strong>{myConnections.length}</strong>
          <small>
            <Users size={13} /> People in your network
          </small>
        </div>
        <div className="stat-card">
          <span>UPCOMING MEETINGS</span>
          <strong>{myBookings.length}</strong>
          <small>
            <CalendarDays size={13} /> Demo bookings
          </small>
        </div>
        <div className="stat-card">
          <span>CHAT SESSIONS</span>
          <strong>
            {
              Object.keys(chats).filter((k) =>
                k.startsWith(currentUser?.id + '_'),
              ).length
            }
          </strong>
          <small>
            <MessageCircle size={13} /> Conversation threads
          </small>
        </div>
        <div className="stat-card">
          <span>DEMO SPEND</span>
          <strong>
            {formatCurrency(myPayments.reduce((s, p) => s + p.amount, 0))}
          </strong>
          <small>
            <Wallet size={13} /> No real payment taken
          </small>
        </div>
      </div>
      <div className="dashboard-two-col">
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">YOUR NETWORK</span>
              <h2>Recent connections</h2>
            </div>
            <Link to="/explore" className="text-link">
              Find more <ArrowUpRight size={14} />
            </Link>
          </div>
          {people.length ? (
            people.slice(0, 4).map((p) => (
              <div className="list-row" key={p.id}>
                <div className={`avatar avatar-${p.color}`}>{p.initials}</div>
                <div className="list-row-main">
                  <strong>{p.name}</strong>
                  <small>{p.title}</small>
                </div>
                <Link to={`/professionals/${p.id}`} className="icon-btn">
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            ))
          ) : (
            <div className="empty-inline">
              <Users size={24} />
              <strong>Your network starts here.</strong>
              <p>
                Explore the directory and connect with someone who can help.
              </p>
              <Link to="/explore" className="btn btn-secondary btn-sm">
                Explore professionals
              </Link>
            </div>
          )}
        </section>
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">ON YOUR CALENDAR</span>
              <h2>Meeting bookings</h2>
            </div>
            <Link to="/meeting-spaces" className="text-link">
              Book a space <ArrowUpRight size={14} />
            </Link>
          </div>
          {myBookings.length ? (
            myBookings.slice(0, 4).map((b) => (
              <div className="list-row" key={b.id}>
                <div className="list-row-icon">
                  <CalendarDays size={17} />
                </div>
                <div className="list-row-main">
                  <strong>{b.spaceName}</strong>
                  <small>
                    {b.date} · {b.time}
                  </small>
                </div>
                <span className="status-pill">{b.status}</span>
              </div>
            ))
          ) : (
            <div className="empty-inline">
              <CalendarDays size={24} />
              <strong>No meetings booked yet.</strong>
              <p>Choose a space for your next in-person conversation.</p>
              <Link to="/meeting-spaces" className="btn btn-secondary btn-sm">
                Browse spaces
              </Link>
            </div>
          )}
        </section>
      </div>
      <section className="dashboard-panel recent-payments">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">DEMO TRANSACTIONS</span>
            <h2>Recent payments</h2>
          </div>
          <Link to="/payments" className="text-link">
            View history <ArrowUpRight size={14} />
          </Link>
        </div>
        {myPayments.length ? (
          myPayments.slice(0, 5).map((p) => (
            <div className="list-row" key={p.id}>
              <div className="list-row-icon">
                <Wallet size={17} />
              </div>
              <div className="list-row-main">
                <strong>{p.purpose}</strong>
                <small>
                  {new Date(p.createdAt).toLocaleDateString('en-IN')} · Demo
                  payment
                </small>
              </div>
              <strong>{formatCurrency(p.amount)}</strong>
              <span className="status-pill">Success</span>
            </div>
          ))
        ) : (
          <p className="muted-paragraph">
            Your simulated payments will appear here after a demo checkout.
          </p>
        )}
      </section>
    </DashboardLayout>
  );
}
