import React, { useEffect } from 'react';
import Navbar from './Navbar';
import './Features.css';

function Features() {
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
    <div className="features-page">
      <Navbar />
      <main className="features-content">
        <div className="features-hero">
          <h1>Powerful <span className="gradient-text">Features</span></h1>
          <p className="features-description">
            Discover the tools and capabilities that make StockStart your perfect companion in your investment journey. Our platform combines simplicity with powerful analytics to help you make informed decisions.
          </p>
        </div>

        <section className="feature-sections">
          <div className="feature-section fade-in">
            <div className="feature-image-left">
              <div className="feature-icon-large">📊</div>
            </div>
            <div className="feature-content-right">
              <h2>Smart Analytics Dashboard</h2>
              <p>Track your investments with our intuitive dashboard featuring:</p>
              <ul>
                <li>Real-time market trends and analysis</li>
                <li>Personalized stock recommendations</li>
                <li>End-of-day price updates</li>
                <li>5 year historical performance data</li>
              </ul>
            </div>
          </div>

          <div className="feature-section reverse fade-in">
            <div className="feature-content-left">
              <h2>Goal-Based Investment Planning</h2>
              <p>Set and achieve your financial goals with:</p>
              <ul>
                <li>Customized investment strategies</li>
                <li>Progress tracking and milestones</li>
                <li>Risk assessment tools</li>
                <li>Portfolio diversification guidance</li>
              </ul>
            </div>
            <div className="feature-image-right">
              <div className="feature-icon-large">🎯</div>
            </div>
          </div>
        </section>

        <section className="feature-grid-section">
          <h2 className="fade-in">Additional Features</h2>
          <div className="features-grid">
            <div className="feature-card fancy fade-in">
              <div className="card-icon">📱</div>
              <h3>Mobile Responsive</h3>
              <p>Access your portfolio and make decisions on any device, anywhere, anytime</p>
            </div>
            <div className="feature-card fancy fade-in">
              <div className="card-icon">🔒</div>
              <h3>Secure Platform</h3>
              <p>Enterprise-grade security to protect your data and investment suggestions</p>
            </div>
            <div className="feature-card fancy fade-in">
              <div className="card-icon">📈</div>
              <h3>Performance Tracking</h3>
              <p>Monitor your portfolio's performance with detailed analytics</p>
            </div>
            <div className="feature-card fancy fade-in">
              <div className="card-icon">🎓</div>
              <h3>Educational Resources</h3>
              <p>Learn and grow with our comprehensive investment guides</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Features;