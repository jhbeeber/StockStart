import React from 'react';
import Navbar from './Navbar';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="policy-page">
      <Navbar />
      <main className="policy-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated 12/28/2024</p>

        <div className="section">
          <h2>Introduction</h2>
          <p>
            At StockStart, we are committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our financial web app. By accessing or using the app, you agree to the terms of this Privacy Policy.
          </p>
        </div>

        <div className="section">
          <h2>1. Information We Collect</h2>
          <p>
            The only data that we collect is the information you provide directly to us. This may include:
          </p>
          <p>
            Personal information when you create an account (such as your name, email address, and password).
          </p>
          <p>
            Information regarding your stock goals, preferences, and financial goals that you input into the app.
          </p>
        </div>

        <div className="section">
          <h2>2. Use of Your Information</h2>
          <p>
            We use the information we collect from you for various purposes, including:
          </p>
          <p>
            To create and manage your account.
          </p>
          <p>
            To provide personalized stock and cryptocurrency suggestions based on your inputted dividends, prices, goals, and other preferences.
          </p>
          <p>
            To communicate with you about your account and provide customer support.
          </p>
        </div>

        <div className="section">
          <h2>3. Sharing of Your Information</h2>
          <p>
            We do not share your personal information with third parties, except for the following purposes:
          </p>
          <p>
            Information regarding your stock goals and preferences may be shared with third-party APIs in order to provide you with personalized investment suggestions. These third-party services are contractually bound to use your information solely for the purpose of providing these suggestions and are required to protect your information in accordance with this Privacy Policy.
          </p>
        </div>

        <div className="section">
          <h2>4. Data Storage and Security</h2>
          <p>
            We store your data in a Supabase PostgreSQL database that is encrypted to ensure its security. We take appropriate security measures to protect your information from unauthorized access, disclosure, alteration, or destruction.
          </p>
        </div>

        <div className="section">
          <h2>5. Data Retention and Deletion</h2>
          <p>
            We retain your data for as long as your account is active or as needed to provide you with our services. If you decide to delete your account, all data associated with your account will be deleted from our database.
          </p>
        </div>

        <div className="section">
          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>

        <div className="section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at stockstart@outlook.com.
          </p>
        </div>
      </main>
    </div>
  );
}

export default PrivacyPolicy;