import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { userId } = useParams();
  const isLoggedIn = location.pathname.includes('/dashboard') || location.pathname.includes('/suggestions') || location.pathname.includes('/settings') || (location.pathname.includes('/privacy-policy') && userId) || (location.pathname.includes('/terms') && userId);;

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span>Stock</span><span className="logo-accent">Start</span>
      </Link>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link 
              to={`/dashboard/${userId}`} 
              className={location.pathname === `/dashboard/${userId}` ? 'active' : ''}>
              Dashboard
            </Link>
            <Link 
              to={`/suggestions/${userId}`} 
              className={location.pathname === `/suggestions/${userId}` ? 'active' : ''}>
              Suggestions
            </Link>
            <Link 
              to={`/settings/${userId}`} 
              className="settings-btn">
              Settings
            </Link>
          </>
        ) : (
          <>
            <Link 
              to="/features" 
              className={location.pathname === '/features' ? 'active' : ''}>
              Features
            </Link>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Link>
            <Link to="/login" className="login-btn">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;