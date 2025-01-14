import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import FirstVisitPopup from './FirstVisitPopup';
import './HomePage.css';

function HomePage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowPopup(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="home">
      {showPopup && <FirstVisitPopup onClose={() => setShowPopup(false)} />}
      <Navbar />
      <main className="hero">
        <div className="hero-content fade-in">
          <h1>Your Journey to Smart Investing <br/>
            <span className="gradient-text">Starts Here</span>
          </h1>
          <p>Personalized stock recommendations based on your goals</p>
          <Link to="/signup">
            <button className="cta-btn">
              Start Smart Investing Today
              <span className="btn-arrow">→</span>
            </button>
          </Link>
        </div>
        <div className="hero-background"></div>
      </main>

      <section className="features" id="features">
        <h2 className="fade-in">Why use StockStart?</h2>
        <div className="feature-grid">
          <div className="feature-card fade-in">
            <div className="card-icon">📈</div>
            <h3>Personalized Guidance</h3>
            <p>Get stock suggestions tailored to your investment goals</p>
          </div>
          <div className="feature-card fade-in">
            <div className="card-icon">🎯</div>
            <h3>Goal Tracking</h3>
            <p>Set and monitor your investment objectives</p>
          </div>
          <div className="feature-card fade-in">
            <div className="card-icon">📊</div>
            <h3>Smart Analytics</h3>
            <p>Make informed decisions with our end-of-day market analysis</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;