import { Link } from 'react-router-dom';
export default function AuthLayout({ children }) {
  return (
    <div className="auth-shell">
      <div className="auth-art">
        <Link to="/" className="brand">
          <span className="brand-mark">
            c<span>.</span>
          </span>
          <span>
            connext<span className="brand-dot">/</span>
          </span>
        </Link>
        <div className="auth-art-copy">
          <span className="eyebrow">GOOD WORK STARTS HERE</span>
          <h2>
            People are
            <br />
            the <span className="gradient-text">real</span>
            <br />
            superpower.
          </h2>
          <p>A better way to meet the people who move your work forward.</p>
          <div className="auth-orbit">
            <div>
              c<span>.</span>
            </div>
          </div>
        </div>
        <span className="auth-art-foot">
          CONNECTION, WITH INTENTION. / 2026
        </span>
      </div>
      <div className="auth-form-side">{children}</div>
    </div>
  );
}
