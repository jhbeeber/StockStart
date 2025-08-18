import React, { useEffect } from 'react';
import Navbar from './Navbar';
import './About.css';

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
  
  const mainFeatures = [
    {
      icon: "📊",
      title: "Smart Analytics Dashboard",
      desc: "Track your investments with our intuitive dashboard featuring real-time market trends, personalized stock recommendations, end-of-day price updates, and 5-year historical performance data."
    },
    {
      icon: "🎯",
      title: "Goal-Based Investment Planning",
      desc: "Set and achieve your financial goals with customized investment strategies, progress tracking, risk assessment tools, and portfolio diversification guidance."
    }
  ];

  const additionalFeatures = [
    {
      icon: "📱",
      title: "Mobile Responsive",
      desc: "Access your portfolio and make decisions on any device, anywhere, anytime."
    },
    {
      icon: "🔒",
      title: "Secure Platform",
      desc: "Enterprise-grade security to protect your data and investment suggestions."
    },
    {
      icon: "📈",
      title: "Performance Tracking",
      desc: "Monitor your portfolio's performance with detailed analytics."
    },
    {
      icon: "📚",
      title: "Educational Resources",
      desc: "Learn and grow with our comprehensive investment guides."
    }
  ];

  return (
    <div className="about">
      <Navbar />
      <main className="about-content">
        <div className="about-hero loaded">
          <h1>
            <span className="about-black">Features of </span>
            <span className="gradient-text">StockStart</span>
          </h1>
          <p className="about-description">
            Discover the tools and capabilities that make StockStart your perfect companion in your investment journey. Our platform combines simplicity with powerful analytics to help you make informed decisions.
          </p>
        </div>
        <section className="about-details">
          {mainFeatures.map((feature) => (
            <div className="about-card fade-in" key={feature.title}>
              <div className="card-icon pulse" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                {feature.icon}
              </div>
              <h2>{feature.title}</h2>
              <p>{feature.desc}</p>
            </div>
          ))}
        </section>
        <section className="additional-features-grid">
          <div style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            marginBottom: "2rem"
          }}>
            <h2 style={{
              color: "#000000ff",
              fontSize: "2rem",
              fontWeight: 700,
              margin: 0
            }}>
              Additional Features
            </h2>
          </div>
          {additionalFeatures.map((feature) => (
            <div className="about-card fade-in" key={feature.title}>
              <div className="card-icon" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {feature.icon}
              </div>
              <h3 style={{ marginBottom: "0.5rem" }}>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Features;