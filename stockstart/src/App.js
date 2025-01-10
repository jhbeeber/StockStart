import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';
import SetupGoals from './SetupGoals';
import About from './About';
import Features from './Features';
import ScrollToTop from './ScrollToTop';
import Footer from './Footer';
import PrivacyPolicy from './PrivacyPolicy';
import Terms from './Terms';
import Dashboard from './Dashboard';
import Suggestions from './Suggestions';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/setup-goals/:userId" element={<SetupGoals />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/suggestions/:userId" element={<Suggestions />} />
          <Route path="/privacy-policy/:userId" element={<PrivacyPolicy />} />
          <Route path="/terms/:userId" element={<Terms />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;