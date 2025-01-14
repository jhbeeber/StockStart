import React from 'react';
import './FirstVisitPopup.css';

function FirstVisitPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Welcome to StockStart</h2>
        <p>
          Please note that this website is currently a work in progress. 
          Some features may be limited or not yet implemented.
        </p>
        <button className="popup-close-btn" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}

export default FirstVisitPopup;