import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link to="/" className="brand">
              <span className="brand-mark">
                c<span>.</span>
              </span>
              <span>
                Offlink<span className="brand-dot">/</span>
              </span>
            </Link>
            <p>Good work starts with a good conversation.</p>
            <a className="footer-email" href="mailto:hello@connext.demo">
              <Mail size={14} /> hello@connext.demo
            </a>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/explore">Professionals</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/meeting-spaces">Meeting spaces</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
          </div>
          <div className="footer-cta">
            <span className="eyebrow">YOUR NEXT MOVE</span>
            <h3>
              Make a connection
              <br />
              that moves you forward.
            </h3>
            <Link to="/explore" className="text-link">
              Find your person <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Offlink. · Frontend demo</span>
          <span className="demo-label">
            <i /> Demo mode · No real payments
          </span>
        </div>
      </div>
    </footer>
  );
}
