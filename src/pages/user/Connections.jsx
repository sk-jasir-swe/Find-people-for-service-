import { Link } from 'react-router-dom';
import { ArrowUpRight, Users } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useApp } from '../../context/AuthContext';
import ProfessionalCard from '../../components/common/ProfessionalCard';
export default function Connections() {
  const { currentUser, connections, professionals } = useApp();
  const people = connections
    .filter((c) => c.userId === currentUser?.id)
    .map((c) => professionals.find((p) => p.id === c.professionalId))
    .filter(Boolean);
  return (
    <DashboardLayout
      title="Your connections."
      subtitle="The people you have chosen to keep close as you move your work forward."
    >
      {people.length ? (
        <div className="professional-grid">
          {people.map((p) => (
            <ProfessionalCard person={p} key={p.id} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Users size={28} />
          <h3>Your network is waiting.</h3>
          <p>Explore professionals and connect with someone new.</p>
          <Link className="btn btn-primary" to="/explore">
            Explore professionals <ArrowUpRight size={15} />
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
