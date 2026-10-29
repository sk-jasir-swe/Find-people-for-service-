import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-panel">
          <div className="cta-glow" />
          <div className="cta-content">
            <span className="eyebrow">
              <Sparkles size={13} /> YOUR NEXT CHAPTER STARTS HERE
            </span>
            <h2>
              The right conversation
              <br />
              can change <span className="gradient-text">everything.</span>
            </h2>
            <p>Find someone who has been where you want to go.</p>
            <div className="cta-actions">
              <Link to="/explore" className="btn btn-primary">
                Explore professionals <ArrowUpRight size={16} />
              </Link>
              <Link to="/login" className="btn btn-glass">
                Join the network
              </Link>
            </div>
          </div>
          <div className="cta-decoration">
            <div className="cta-orbit cta-orbit-a" />
            <div className="cta-orbit cta-orbit-b" />
            <div className="cta-center">
              c<span>.</span>
            </div>
            <span className="cta-coord">
              MAKE IT
              <br />
              MEAN SOMETHING.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
