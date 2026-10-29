import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AuthContext';
import Button from './Button';
export default function Navbar() {
  const { currentUser, logout } = useApp();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const dest =
    currentUser?.role === 'admin'
      ? '/admin'
      : currentUser?.role === 'professional'
        ? '/professional'
        : '/dashboard';
  const links = [
    ['Explore', '/explore'],
    ['Categories', '/categories'],
    ['Meeting spaces', '/meeting-spaces'],
    ['How it works', '/#how-it-works'],
  ];
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand">
          <span className="brand-mark">
            c<span>.</span>
          </span>
          <span>
            Offlink<span className="brand-dot">/</span>
          </span>
        </Link>
        <nav className={`nav-links ${open ? 'nav-open' : ''}`}>
          {links.map(([label, to]) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => setOpen(false)}
              className="nav-link"
            >
              {label}
            </NavLink>
          ))}
          {currentUser && (
            <button className="nav-link mobile-only" onClick={() => nav(dest)}>
              Dashboard
            </button>
          )}
        </nav>
        <div className="nav-actions">
          {currentUser ? (
            <>
              <button className="nav-user" onClick={() => nav(dest)}>
                <span className="nav-user-avatar">{currentUser.avatar}</span>
                {currentUser.name.split(' ')[0]}
              </button>
              <button
                className="icon-btn"
                title="Log out"
                onClick={() => {
                  logout();
                  nav('/');
                }}
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-login">
                Log in
              </Link>
              <Button size="sm" onClick={() => nav('/login')}>
                Get started <ArrowUpRight size={15} />
              </Button>
            </>
          )}
        </div>
        <button
          className="mobile-menu icon-btn"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
