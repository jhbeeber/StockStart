import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
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
import Settings from './Settings';
import './App.css';
import ProtectedRoute from './ProtectedRoute';

function ProtectedSetupGoals() {
  const { userId } = useParams();
  return (
    <ProtectedRoute userId={userId}>
      <SetupGoals />
    </ProtectedRoute>
  );
}

function ProtectedDashboard() {
  const { userId } = useParams();
  return (
    <ProtectedRoute userId={userId}>
      <Dashboard />
    </ProtectedRoute>
  );
}

function ProtectedSuggestions() {
  const { userId } = useParams();
  return (
    <ProtectedRoute userId={userId}>
      <Suggestions />
    </ProtectedRoute>
  );
}

function ProtectedPrivacyPolicy() {
  const { userId } = useParams();
  return (
    <ProtectedRoute userId={userId}>
      <PrivacyPolicy />
    </ProtectedRoute>
  );
}

function ProtectedTerms() {
  const { userId } = useParams();
  return (
    <ProtectedRoute userId={userId}>
      <Terms />
    </ProtectedRoute>
  );
}

function ProtectedSettings() {
  const { userId } = useParams();
  return (
    <ProtectedRoute userId={userId}>
      <Settings />
    </ProtectedRoute>
  );
}

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
          <Route path="/setup-goals/:userId" element={<ProtectedSetupGoals />} />
          <Route path="/dashboard/:userId" element={<ProtectedDashboard />} />
          <Route path="/suggestions/:userId" element={<ProtectedSuggestions />} />
          <Route path="/privacy-policy/:userId" element={<ProtectedPrivacyPolicy />} />
          <Route path="/terms/:userId" element={<ProtectedTerms />} />
          <Route path="/settings/:userId" element={<ProtectedSettings />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;