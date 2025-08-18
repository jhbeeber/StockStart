import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const location = useLocation();
  const userId = location.pathname.split('/').find(segment => 
    !isNaN(segment) && segment.length > 0
  );
  
  const isLoggedIn = location.pathname.includes('/dashboard') || 
    location.pathname.includes('/suggestions') || 
    location.pathname.includes('/settings') ||
    (location.pathname.includes('/privacy-policy') && userId) ||
    (location.pathname.includes('/disclaimer') && userId) ||
    (location.pathname.includes('/terms') && userId);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to={isLoggedIn && userId ? `/privacy-policy/${userId}` : '/privacy-policy'}>
            Privacy Policy
          </Link>
          <Link to={isLoggedIn && userId ? `/terms/${userId}` : '/terms'}>
            Terms & Conditions
          </Link>
          <Link to={isLoggedIn && userId ? `/disclaimer/${userId}` : '/disclaimer'}>
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;