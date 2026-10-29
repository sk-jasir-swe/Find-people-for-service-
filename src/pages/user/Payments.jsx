import { Wallet, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useApp } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatCurrency';
export default function Payments() {
  const { currentUser, payments } = useApp();
  const list = payments.filter((p) => p.userId === currentUser?.id);
  return (
    <DashboardLayout
      title="Payment history."
      subtitle="A transparent record of your demo checkouts. No real money is moved on this site."
    >
      <div className="admin-banner">
        <Wallet size={18} />
        <div>
          <strong>Demo payments only</strong>
          <p>
            All amounts below are simulated records for presentation. No bank,
            wallet, or card is charged.
          </p>
        </div>
      </div>
      <div className="dashboard-panel">
        {list.length ? (
          list.map((p) => (
            <div className="list-row" key={p.id}>
              <div className="list-row-icon">
                <CheckCircle2 size={17} />
              </div>
              <div className="list-row-main">
                <strong>{p.purpose}</strong>
                <small>
                  {new Date(p.createdAt).toLocaleString('en-IN')} · {p.mode}
                </small>
              </div>
              <strong>{formatCurrency(p.amount)}</strong>
              <span className="status-pill">{p.status}</span>
            </div>
          ))
        ) : (
          <div className="empty-inline">
            <Wallet size={24} />
            <strong>No demo payments yet.</strong>
            <p>
              Complete a simulated chat checkout or meeting booking to see a
              record here.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
