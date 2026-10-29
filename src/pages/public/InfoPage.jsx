import { Mail, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
export default function InfoPage() {
  const { pathname } = useLocation();
  const data = {
    about: [
      'A network for work that matters.',
      'Connext helps people find the right expertise, start focused conversations, and take meaningful work offline. This demo showcases a possible professional connection marketplace.',
    ],
    contact: [
      'Let’s start a conversation.',
      'Have a question about the platform? This demo contact page is interactive for presentation purposes. You can reach the sample team at hello@connext.demo.',
    ],
    terms: [
      'Terms of service',
      'This is a frontend demo. Profiles, reviews, payment records, and bookings are sample data and do not represent real services or transactions.',
    ],
    privacy: [
      'Privacy policy',
      'This demo stores your sample session, chat messages, bookings, and preferences in this browser’s localStorage. No backend service receives this demo data.',
    ],
  };
  const key = pathname.slice(1);
  const [title, desc] = data[key] || data.about;
  return (
    <div className="container page-shell">
      <div className="info-page-card">
        <span className="eyebrow">CONNEXT / {key.toUpperCase()}</span>
        <h1>{title}</h1>
        <p>{desc}</p>
        {key === 'contact' && (
          <a href="mailto:hello@connext.demo" className="btn btn-primary">
            <Mail size={16} /> Email the demo team
          </a>
        )}
        <div className="info-page-bottom">
          <span>Built for thoughtful connections.</span>
          <Link to="/explore" className="text-link">
            Explore professionals <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
