import React from 'react';
import Navbar from './Navbar';
import './Disclaimer.css';

function Disclaimer() {
  return (
    <div className="policy-page">
      <Navbar />
      <main className="policy-content">
        <h1>Disclaimer</h1>
        <p className="last-updated">Last updated 08/13/2025</p>

        <div className="section">
          <h2>Educational Purpose Only</h2>
          <p>
            StockStart is provided solely for educational and informational purposes. The content, suggestions, and data presented on this website are not intended as financial, investment, tax, or legal advice. You should not rely on any information from StockStart to make investment decisions. Always consult with a qualified financial advisor before making any financial decisions.
          </p>
        </div>

        <div className="section">
          <h2>Accuracy of Information</h2>
          <p>
            The information and suggestions provided by StockStart are based on data obtained from third-party financial APIs. We do not guarantee the accuracy, completeness, or timeliness of any data or content. Financial data may be delayed, incomplete, or inaccurate. Use of this information is at your own risk.
          </p>
        </div>

        <div className="section">
          <h2>No Liability</h2>
          <p>
            StockStart and its affiliates, partners, and contributors shall not be liable for any losses, damages, or expenses arising from the use or inability to use this website, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
          </p>
        </div>

        <div className="section">
          <h2>No Endorsement</h2>
          <p>
            Reference to any specific securities, cryptocurrencies, financial products, or services does not constitute or imply endorsement, recommendation, or favoring by StockStart.
          </p>
        </div>

        <div className="section">
          <h2>Past Performance</h2>
          <p>
            Past performance of any stock, cryptocurrency, or financial product is not indicative of future results. All investments carry risk, and you may lose money.
          </p>
        </div>

        <div className="section">
          <h2>No Client Relationship</h2>
          <p>
            Use of StockStart does not create any client, advisor, or fiduciary relationship between you and StockStart or its affiliates. No professional relationship is established by your use of this website.
          </p>
        </div>

        <div className="section">
          <h2>Third-Party Links</h2>
          <p>
            StockStart may contain links to third-party websites or services. We are not responsible for the content, accuracy, or practices of any third-party sites. Accessing third-party links is at your own risk.
          </p>
        </div>

        <div className="section">
          <h2>No Guarantee of Results</h2>
          <p>
            StockStart does not guarantee any specific outcomes or results from using this website or its services. All information is provided "as is" without any warranty of any kind.
          </p>
        </div>

        <div className="section">
          <h2>Jurisdiction</h2>
          <p>
            This disclaimer and your use of StockStart are governed by the laws of the United States. By using this website, you consent to the exclusive jurisdiction of the courts in the United States for any disputes arising from your use of the site.
          </p>
        </div>

        <div className="section">
          <h2>Age Restriction</h2>
          <p>
            StockStart is intended for users who are at least 18 years old. If you are under 18, please do not use this website.
          </p>
        </div>

        <div className="section">
          <h2>Accessibility</h2>
          <p>
            While we strive to keep StockStart accessible and operational, we do not guarantee uninterrupted, timely, secure, or error-free access to the website. Access may be affected by maintenance, updates, or technical issues beyond our control.
          </p>
        </div>

        <div className="section">
          <h2>Reservation of Rights</h2>
          <p>
            StockStart reserves the right to update or change this disclaimer at any time without prior notice. Please review this page periodically for any changes.
          </p>
        </div>

        <div className="section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this disclaimer, please contact us at stockstart@outlook.com.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Disclaimer;
