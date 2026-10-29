import { Link } from 'react-router-dom';
import {
  Users,
  BriefcaseBusiness,
  CalendarDays,
  Wallet,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useApp } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatCurrency';
export default function AdminDashboard() {
  const {
    professionals,
    bookings,
    payments,
    connections,
    setProfessionals,
    notify,
  } = useApp();
  const remove = (p) => {
    setProfessionals((prev) => prev.filter((x) => x.id !== p.id));
    notify(`${p.name} removed from demo directory`);
  };
  return (
    <DashboardLayout
      title="Platform overview."
      subtitle="A high-level view of the Connext demo marketplace. All records shown are local sample data."
    >
      <div className="admin-banner">
        <ShieldCheck size={18} />
        <div>
          <strong>Admin demo mode</strong>
          <p>
            Actions here affect only this browser’s local demo data. No live
            users or payments are connected.
          </p>
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <span>PROFESSIONALS</span>
          <strong>{professionals.length}</strong>
          <small>
            <BriefcaseBusiness size={13} /> Demo directory
          </small>
        </div>
        <div className="stat-card">
          <span>CONNECTIONS</span>
          <strong>{connections.length}</strong>
          <small>
            <Users size={13} /> Local connection records
          </small>
        </div>
        <div className="stat-card">
          <span>MEETING BOOKINGS</span>
          <strong>{bookings.length}</strong>
          <small>
            <CalendarDays size={13} /> Demo reservations
          </small>
        </div>
        <div className="stat-card">
          <span>PAYMENT RECORDS</span>
          <strong>{payments.length}</strong>
          <small>
            <Wallet size={13} />{' '}
            {formatCurrency(payments.reduce((s, p) => s + p.amount, 0))}{' '}
            simulated
          </small>
        </div>
      </div>
      <div className="dashboard-two-col">
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">DIRECTORY MANAGEMENT</span>
              <h2>Professionals</h2>
            </div>
            <Link to="/explore" className="text-link">
              View directory <ArrowUpRight size={14} />
            </Link>
          </div>
          {professionals.map((p) => (
            <div className="list-row" key={p.id}>
              <div className={`avatar avatar-${p.color}`}>{p.initials}</div>
              <div className="list-row-main">
                <strong>{p.name}</strong>
                <small>
                  {p.title} · {p.location}
                </small>
              </div>
              <button
                className="text-button danger-text"
                onClick={() => remove(p)}
              >
                Remove
              </button>
            </div>
          ))}
        </section>
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">LATEST ACTIVITY</span>
              <h2>Bookings & payments</h2>
            </div>
          </div>
          {bookings.slice(0, 5).map((b) => (
            <div className="list-row" key={b.id}>
              <div className="list-row-icon">
                <CalendarDays size={16} />
              </div>
              <div className="list-row-main">
                <strong>{b.spaceName}</strong>
                <small>
                  {b.date} · {b.time}
                </small>
              </div>
              <span className="status-pill">{b.status}</span>
            </div>
          ))}
          {payments.slice(0, 4).map((p) => (
            <div className="list-row" key={p.id}>
              <div className="list-row-icon">
                <Wallet size={16} />
              </div>
              <div className="list-row-main">
                <strong>{p.purpose}</strong>
                <small>Demo transaction</small>
              </div>
              <strong>{formatCurrency(p.amount)}</strong>
            </div>
          ))}
          {!bookings.length && !payments.length && (
            <p className="muted-paragraph">
              Demo activity will appear here after bookings or simulated
              checkouts.
            </p>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
