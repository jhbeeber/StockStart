import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span>Stock</span><span className="logo-accent">Start</span>
      </Link>
      <div className="nav-links">
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
      </div>
    </nav>
  );
}

export default Navbar;