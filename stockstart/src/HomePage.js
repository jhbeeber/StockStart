import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
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
      <nav className="navbar">
      <div className="logo">
        <span>Stock</span><span className="logo-accent">Start</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <Link to="/login" className="login-btn">Login</Link>
          <button className="signup-btn">Get Started</button>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content fade-in">
          <h1>Your Journey to Smart Investing <br/>
            <span className="gradient-text">Starts Here</span>
          </h1>
          <p>Personalized stock recommendations based on your goals</p>
          <button className="cta-btn">Start Smart Investing Today
            <span className="btn-arrow">→</span>
          </button>
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