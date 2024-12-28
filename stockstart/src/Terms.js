import React from 'react';
import Navbar from './Navbar';
import './Terms.css';

function Terms() {
  return (
    <div className="policy-page">
      <Navbar />
      <main className="policy-content">
        <h1>Terms & Conditions</h1>
        <p className="last-updated">Last updated 12/28/2024</p>

        <div className="section">
          <h2>Introduction</h2>
          <p>
            Welcome to StockStart. These terms and conditions outline the rules and regulations for the use of our web application, which provides personalized stock and cryptocurrency suggestions based on your inputted goals and preferences. By accessing and using StockStart, you agree to comply with these terms. If you disagree with any part of the terms, you may not use our service.
          </p>
        </div>

        <div className="section">
          <h2>1. Educational Purpose</h2>
          <p>
            StockStart is an educational tool designed to help users understand stocks and cryptocurrencies. While we strive to provide accurate and up-to-date information, the suggestions and data provided by StockStart should not be considered as financial advice. User discretion is advised, and we recommend consulting with a professional financial advisor before making any investment decisions. Do not solely rely on the suggestions provided by the website.
          </p>
        </div>

        <div className="section">
          <h2>2. Use of Third-Party APIs</h2>
          <p>
            StockStart uses third-party APIs to obtain end-of-day financial data. We are not responsible for the accuracy or reliability of the data provided by these third-party sources. The use of such data is at your own risk.
          </p>
        </div>

        <div className="section">
          <h2>3. Account Creation and Security</h2>
          <p>
            When creating an account on StockStart, you agree to provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. If you suspect any unauthorized use of your account, you must notify us immediately.
          </p>
        </div>

        <div className="section">
          <h2>4. User Data</h2>
          <p>
            The only data collected by StockStart is the information you provide when creating an account, adding goals, and inputting preferences. Your personal information is not shared with third parties, except as necessary to provide personalized stock and cryptocurrency suggestions through third-party APIs.
          </p>
        </div>

        <div className="section">
          <h2>5. Data Storage and Security</h2>
          <p>
            Your data is stored in a Supabase PostgreSQL database that is encrypted to ensure its security. We take appropriate measures to protect your information from unauthorized access, disclosure, alteration, or destruction.
          </p>
        </div>

        <div className="section">
          <h2>6. Account Deletion</h2>
          <p>
            If you decide to delete your account, all data associated with your account will be permanently removed from our database.
          </p>
        </div>

        <div className="section">
          <h2>7. Changes to Terms and Conditions</h2>
          <p>
            We may update these terms and conditions from time to time. We will notify you of any changes by posting the new terms on this page. You are advised to review these terms periodically for any updates.
          </p>
        </div>

        <div className="section">
          <h2>8. Limitation of Liability</h2>
          <p>
            StockStart and its affiliates shall not be liable for any damages resulting from the use or inability to use the service, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
          </p>
        </div>

        <div className="section">
          <h2>9. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of Texas, United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </div>

        <div className="section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these terms and conditions, please contact us at stockstart@outlook.com.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Terms;