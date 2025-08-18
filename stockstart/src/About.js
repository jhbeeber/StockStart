import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './About.css';

function About() {

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="about">
      <Navbar />
      <main className="about-content">
        <div className={`about-hero${isLoaded ? ' loaded' : ''}`}>
            <h1>
              <span className="about-black">About </span>
              <span className="gradient-text">StockStart</span>
            </h1>
          <p className="about-description">
            StockStart aims to make the stock market and investing more approachable and understandable for everyone. Our platform combines up to date financial information with personalized guidance to help you make decisions that lead to your goals. With this, it is important that the application remains simple and intuitive for all users.
          </p>
        </div>
        <section className="about-details">
          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              To embrace the complexities of the stock market and make it more approachable for beginners.
            </p>
          </div>
          <div className="about-card">
            <h2>Our Approach</h2>
            <p>
              We keep track of your personal financial and stock market goals, and utilize the Free Stock Market API to provide stock suggestions based on the end of day prices and trends, and historical data. This information will be illustrated in an easy to understand format.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;