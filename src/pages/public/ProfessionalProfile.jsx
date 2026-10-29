import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  Star,
  Briefcase,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AuthContext';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
export default function ProfessionalProfile() {
  const { id } = useParams();
  const { professionals, currentUser, connect, notify } = useApp();
  const p = professionals.find((x) => x.id === id);
  const nav = useNavigate();
  const [saved, setSaved] = useState(false);
  if (!p)
    return (
      <div className="container page-shell">
        <div className="empty-state">
          <h2>Professional not found</h2>
          <Link to="/explore" className="btn btn-secondary">
            Back to explore
          </Link>
        </div>
      </div>
    );
  const chat = () => {
    if (!currentUser) {
      nav('/login?next=' + encodeURIComponent(`/chat/${p.id}`));
      return;
    }
    nav(`/payment?professional=${p.id}`);
  };
  return (
    <div className="container page-shell">
      <button className="back-link" onClick={() => nav(-1)}>
        <ArrowLeft size={15} /> Back
      </button>
      <div className="profile-layout">
        <main>
          <section className="profile-hero-card">
            <div className="profile-cover">
              <span>CONNEXT / PROFESSIONAL PROFILE</span>
              <div className="cover-orbit" />
            </div>
            <div className="profile-main-info">
              <Avatar person={p} size="xl" />
              <div className="profile-title-block">
                <div className="pro-name-row">
                  <h1>{p.name}</h1>
                  {p.verified && (
                    <BadgeCheck size={18} className="verified-icon" />
                  )}
                </div>
                <p>
                  {p.title} <span>·</span> {p.company}
                </p>
                <div className="profile-meta">
                  <span>
                    <MapPin size={14} />
                    {p.location}
                  </span>
                  <span>
                    <Star size={14} fill="currentColor" />
                    {p.rating} ({p.reviews} reviews)
                  </span>
                  <span>
                    <Briefcase size={14} />
                    {p.experience}
                  </span>
                </div>
              </div>
              <button
                className={`btn ${saved ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                onClick={() => {
                  setSaved((v) => !v);
                  notify(saved ? 'Removed from saved list' : 'Profile saved');
                }}
              >
                {saved ? 'Saved' : 'Save profile'}
              </button>
            </div>
            <div className="profile-content">
              <span className="eyebrow">A LITTLE ABOUT ME</span>
              <p className="profile-bio">{p.bio}</p>
              <h3>Skills & expertise</h3>
              <div className="tag-row profile-tags">
                {p.skills.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <h3>Selected work</h3>
              <div className="portfolio-grid">
                {p.portfolio.map((x, i) => (
                  <div className={`portfolio-item portfolio-${i + 1}`} key={x}>
                    <span>SELECTED PROJECT / 0{i + 1}</span>
                    <strong>{x}</strong>
                    <ArrowUpRight size={17} />
                  </div>
                ))}
              </div>
              <h3>What to expect</h3>
              <div className="expect-list">
                <span>
                  <Check size={15} /> Practical, focused advice
                </span>
                <span>
                  <Check size={15} /> Clear next steps
                </span>
                <span>
                  <Check size={15} /> Respectful, confidential conversation
                </span>
              </div>
            </div>
          </section>
        </main>
        <aside className="profile-side">
          <div className="profile-book-card">
            <span className="eyebrow">LET’S TALK</span>
            <div className="profile-rate">
              {formatCurrency(p.rate)}
              <small> / hour</small>
            </div>
            <p className="availability">
              <i /> {p.availability}
            </p>
            <div className="side-divider" />
            <div className="profile-side-row">
              <Clock size={16} />
              <span>
                Flexible consultation
                <br />
                <small>Choose a time that works</small>
              </span>
            </div>
            <div className="profile-side-row">
              <ShieldCheck size={16} />
              <span>
                Secure demo checkout
                <br />
                <small>No real payment is taken</small>
              </span>
            </div>
            <Button className="full-width" onClick={chat}>
              <MessageCircle size={16} /> Start a paid chat
            </Button>
            <Button
              variant="secondary"
              className="full-width"
              onClick={() => {
                if (!currentUser) {
                  nav('/login');
                  return;
                }
                connect(p.id);
                nav('/meeting-spaces');
              }}
            >
              <CalendarDays size={16} /> Book a meeting
            </Button>
            <p className="profile-side-foot">
              Demo price shown. Real payments are disabled.
            </p>
          </div>
          <div className="profile-tip">
            <strong>Good to know</strong>
            <p>
              Come with a question, a challenge, or an idea. A little context
              makes a great conversation.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
