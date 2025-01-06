import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Navbar from './Navbar';
import './Dashboard.css';

function Dashboard() {
  const { userId } = useParams();
  const [userPreferences, setUserPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const FMP_API_KEY = process.env.REACT_APP_FMP_API_KEY;

  useEffect(() => {
    if (!FMP_API_KEY) {
      setError('FMP API key is missing. Please check your environment variables.');
      setLoading(false);
      return;
    }

    const fetchUserPreferences = async () => {
      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error) throw error;
        setUserPreferences(data);
      } catch (err) {
        setError('Error fetching user preferences');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPreferences();
  }, [userId, FMP_API_KEY]);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard">
      <Navbar />
      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1>Your Investment Dashboard</h1>
          <p className="welcome-text">Welcome to your personalized stock suggestions</p>
        </div>

        <section className="preferences-summary">
          <h2>Your Investment Profile</h2>
          <div className="preferences-grid">
            <div className="preference-card">
              <h3>Investment Goal</h3>
              <p>{userPreferences?.investment_goal?.replace(/-/g, ' ')}</p>
            </div>
            <div className="preference-card">
              <h3>Risk Tolerance</h3>
              <p>{userPreferences?.risk_tolerance}</p>
            </div>
            <div className="preference-card">
              <h3>Time Horizon</h3>
              <p>{userPreferences?.time_horizon}</p>
            </div>
            <div className="preference-card">
              <h3>Investment Amount</h3>
              <p>{userPreferences?.investment_amount}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;