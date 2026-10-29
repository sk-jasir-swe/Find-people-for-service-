import { ArrowRight, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { meetingSpaces } from '../../data/meetingSpaces';
import { formatCurrency } from '../../utils/formatCurrency';
export default function MeetingPreview() {
  return (
    <section className="section meeting-preview">
      <div className="container">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow">WHEN ONLINE ISN’T ENOUGH</span>
            <h2>
              Good conversations
              <br />
              deserve <span className="gradient-text">good spaces.</span>
            </h2>
          </div>
          <div className="heading-action">
            <p>
              Book a professional meeting space when you’re ready to take the
              next step in person.
            </p>
            <Link className="text-link" to="/meeting-spaces">
              Explore meeting spaces <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <div className="spaces-preview-grid">
          {meetingSpaces.map((s, i) => (
            <article className="space-preview-card" key={s.id}>
              <div className={`space-art space-art-${i + 1}`}>
                <span className="space-art-label">
                  CONNEXT SPACES / 0{i + 1}
                </span>
                <div className="space-art-shape">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="space-art-bottom">
                  <span>{s.type}</span>
                  <span>
                    <Users size={13} />
                    {s.capacity}
                  </span>
                </div>
              </div>
              <div className="space-info">
                <div>
                  <h3>{s.name}</h3>
                  <p>
                    <MapPin size={13} />
                    {s.area}
                  </p>
                </div>
                <div className="space-price">
                  <strong>{formatCurrency(s.price)}</strong>
                  <small>/ hour</small>
                </div>
              </div>
              <div className="space-amenities">
                {s.amenities.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
