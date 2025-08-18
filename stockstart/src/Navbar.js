import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { userId } = useParams();
  const isLoggedIn = location.pathname.includes('/dashboard') || 
                     location.pathname.includes('/suggestions') || 
                     location.pathname.includes('/settings') || 
                     (location.pathname.includes('/privacy-policy') && userId) || 
                     (location.pathname.includes('/terms') && userId);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span>Stock</span><span className="logo-accent">Start</span>
      </Link>
      
  <button className={`hamburger${isMenuOpen ? ' active' : ''}`} onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        {isLoggedIn ? (
          <>
            <Link 
              to={`/dashboard/${userId}`} 
              className={location.pathname === `/dashboard/${userId}` ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to={`/suggestions/${userId}`} 
              className={location.pathname === `/suggestions/${userId}` ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Suggestions
            </Link>
            <Link 
              to={`/settings/${userId}`} 
              className={location.pathname === `/settings/${userId}` ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Settings
            </Link>
          </>
        ) : (
          <>
            <Link 
              to="/features" 
              className={location.pathname === '/features' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/login" 
              className="login-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;