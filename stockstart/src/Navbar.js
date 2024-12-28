import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span>Stock</span><span className="logo-accent">Start</span>
      </Link>
      <div className="nav-links">
        <a href="#features">Features</a>
        <Link to="/about">About</Link>
        <Link to="/login" className="login-btn">Login</Link>
        <button className="signup-btn">Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;