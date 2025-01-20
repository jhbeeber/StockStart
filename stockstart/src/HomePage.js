import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import FirstVisitPopup from './FirstVisitPopup';
import './HomePage.css';

function HomePage() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowPopup(true);
      localStorage.setItem('hasVisited', 'true');
    }
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="home">
      {showPopup && <FirstVisitPopup onClose={() => setShowPopup(false)} />}
      <Navbar />
      <main className={`hero ${isLoaded ? 'loaded' : ''}`}>
        <div className="hero-content fade-in">
          <div className="animated-heading">
            <h1>
              Your Journey to Smart Investing
              <br/>
              <span className="gradient-text animated-gradient">Starts Here</span>
            </h1>
          </div>
          <p className="hero-description">Personalized stock recommendations based on your goals</p>
          <Link to="/signup">
            <button className="cta-btn hover-effect">
              <span className="btn-text">Start Smart Investing Today</span>
              <span className="btn-arrow">→</span>
            </button>
          </Link>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="hero-background parallax"></div>
      </main>

      <section className="features" id="features">
        <h2 className="fade-in">Why use StockStart?</h2>
        <div className="feature-grid">
          <div className="feature-card fade-in hover-float">
            <div className="card-icon pulse">📈</div>
            <div className="card-content">
              <h3>Personalized Guidance</h3>
              <p>Get stock suggestions tailored to your investment goals</p>
              <div className="card-overlay"></div>
            </div>
          </div>
          <div className="feature-card fade-in hover-float">
            <div className="card-icon pulse">🎯</div>
            <div className="card-content">
              <h3>Goal Tracking</h3>
              <p>Set and monitor your investment objectives</p>
              <div className="card-overlay"></div>
            </div>
          </div>
          <div className="feature-card fade-in hover-float">
            <div className="card-icon pulse">📊</div>
            <div className="card-content">
              <h3>Smart Analytics</h3>
              <p>Make informed decisions with our end-of-day market analysis</p>
              <div className="card-overlay"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;