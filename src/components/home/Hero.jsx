import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Search,
  MessageCircle,
  Video,
  MoveUpRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';
import Button from '../common/Button';
export default function Hero() {
  const [q, setQ] = useState('');
  const nav = useNavigate();
  return (
    <section className="hero-section">
      <div className="hero-grid-glow" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="announcement">
            <i />
            THE PROFESSIONAL NETWORK, REIMAGINED <ArrowRight size={13} />
          </div>
          <h1>
            Good work starts
            <br />
            with <span className="gradient-text">a good</span>
            <br />
            <span className="outline-text">connection.</span>
          </h1>
          <p className="hero-description">
            Meet the people who can move your next idea forward. Get expert
            advice, make meaningful connections, and turn conversations into
            progress.
          </p>
          <form
            className="hero-search"
            onSubmit={(e) => {
              e.preventDefault();
              nav(`/explore?q=${encodeURIComponent(q)}`);
            }}
          >
            <Search size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try “product designer” or “business advisor”"
            />
            <Button type="submit">
              Find a pro <ArrowRight size={15} />
            </Button>
          </form>
          <div className="hero-proof">
            <div className="avatar-stack">
              <span>AM</span>
              <span>RS</span>
              <span>KK</span>
              <span>+</span>
            </div>
            <div>
              <strong>People first. Always.</strong>
              <small>Real conversations. Better outcomes.</small>
            </div>
            <div className="proof-divider" />
            <div>
              <strong>
                8.4k<span>+</span>
              </strong>
              <small>connections made</small>
            </div>
          </div>
          <a href="#featured" className="hero-scroll">
            SCROLL TO EXPLORE <ArrowDownRight size={14} />
          </a>
        </div>
        <div className="hero-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-visual-label">
            <i /> YOUR NEXT COLLABORATOR IS OUT THERE
          </div>
          <div className="visual-center">
            <div className="center-core">
              <div className="core-ring" />
              <div className="core-letter">
                c<span>.</span>
              </div>
              <span className="core-caption">
                CONNECT
                <br />
                WITH INTENT
              </span>
            </div>
          </div>
          <div className="floating-card float-card-one">
            <div className="mini-avatar mini-violet">AM</div>
            <div>
              <strong>Aarav Mehta</strong>
              <small>Product Designer</small>
              <span className="float-available">
                <i /> Available today
              </span>
            </div>
            <MessageCircle size={15} />
          </div>
          <div className="floating-card float-card-two">
            <div className="mini-avatar mini-blue">RS</div>
            <div>
              <strong>Riya Sen</strong>
              <small>Full-stack Developer</small>
              <span className="float-available">
                <i /> Open to connect
              </span>
            </div>
          </div>
          <div className="floating-card float-card-three">
            <Video size={18} />
            <div>
              <strong>Make it face-to-face</strong>
              <small>Book a space, meet in person</small>
            </div>
            <MoveUpRight size={15} />
          </div>
          <div className="floating-badge">✧ MEANINGFUL BY DESIGN</div>
          <div className="visual-coordinates">
            22°34' N<br />
            88°22' E
          </div>
        </div>
      </div>
      <div className="container hero-categories">
        <span className="hero-category-label">EXPLORE YOUR NEXT MOVE</span>
        {categories.slice(0, 5).map((c) => (
          <button
            key={c.id}
            onClick={() => nav(`/explore?category=${c.id}`)}
            className="hero-category"
          >
            <span>{c.icon}</span>
            {c.name}
            <ArrowRight size={13} />
          </button>
        ))}
      </div>
    </section>
  );
}
