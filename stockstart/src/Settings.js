import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Navbar from './Navbar';
import './Settings.css';

function Settings() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [preferences, setPreferences] = useState({
    investmentGoal: '',
    riskTolerance: '',
    timeHorizon: '',
    preferredIndustries: [],
    investmentAmount: ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

const fetchUserPreferences = useCallback(async () => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    setPreferences({
      investmentGoal: data.investment_goal || '',
      riskTolerance: data.risk_tolerance || '',
      timeHorizon: data.time_horizon || '',
      preferredIndustries: data.preferred_industries || [],
      investmentAmount: data.investment_amount || ''
    });
  } catch (err) {
    console.error('Error fetching preferences:', err);
    setError('Failed to load preferences');
  } finally {
    setLoading(false);
  }
}, [userId]);

useEffect(() => {
  fetchUserPreferences();
}, [fetchUserPreferences]); 

const handleLogout = () => {
  localStorage.removeItem('userSession');
  navigate('/');
};

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIndustryToggle = (industry) => {
    setPreferences(prev => ({
      ...prev,
      preferredIndustries: prev.preferredIndustries.includes(industry)
        ? prev.preferredIndustries.filter(i => i !== industry)
        : [...prev.preferredIndustries, industry]
    }));
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('user_preferences')
        .update({
          investment_goal: preferences.investmentGoal,
          risk_tolerance: preferences.riskTolerance,
          time_horizon: preferences.timeHorizon,
          preferred_industries: preferences.preferredIndustries,
          investment_amount: preferences.investmentAmount
        })
        .eq('user_id', userId);

      if (error) throw error;
    } catch (err) {
      console.error('Error saving preferences:', err);
      setError('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setError(null);

    try {
      await supabase
        .from('saved_stocks')
        .delete()
        .eq('user_id', userId);

      await supabase
        .from('user_preferences')
        .delete()
        .eq('user_id', userId);

      const { error } = await supabase
        .from('users')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      navigate('/');
    } catch (err) {
      console.error('Error deleting account:', err);
      setError('Failed to delete account');
      setDeleting(false);
    }
  };

  if (loading) return <div className="settings-loading">Loading...</div>;

  return (
    <div className="settings">
      <Navbar />
      <main className="settings-content">
        <div className="settings-header">
          <h1>Account Settings</h1>
          <p className="settings-description">Manage your preferences and account</p>
        </div>

        <section className="preferences-section">
          <h2>Investment Preferences</h2>
          <div className="preferences-form">
            <div className="form-group">
              <label>Investment Goal</label>
              <select
                value={preferences.investmentGoal}
                onChange={(e) => handlePreferenceChange('investmentGoal', e.target.value)}
              >
                <option value="">Select goal</option>
                <option value="long-term-growth">Long-term Growth</option>
                <option value="regular-income">Regular Income</option>
                <option value="short-term-trading">Short-term Trading</option>
                <option value="retirement">Retirement Planning</option>
              </select>
            </div>

            <div className="form-group">
              <label>Risk Tolerance</label>
              <select
                value={preferences.riskTolerance}
                onChange={(e) => handlePreferenceChange('riskTolerance', e.target.value)}
              >
                <option value="">Select risk level</option>
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>

            <div className="form-group">
              <label>Time Horizon</label>
              <select
                value={preferences.timeHorizon}
                onChange={(e) => handlePreferenceChange('timeHorizon', e.target.value)}
              >
                <option value="">Select timeframe</option>
                <option value="short">Short-term (&lt; 1 year)</option>
                <option value="medium">Medium-term (1-5 years)</option>
                <option value="long">Long-term (5+ years)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Investment Amount</label>
              <select
                value={preferences.investmentAmount}
                onChange={(e) => handlePreferenceChange('investmentAmount', e.target.value)}
              >
                <option value="">Select amount</option>
                <option value="small">$100 - $1,000</option>
                <option value="medium">$1,000 - $5,000</option>
                <option value="large">$5,000 - $10,000</option>
                <option value="xlarge">$10,000+</option>
              </select>
            </div>

            <div className="form-group">
              <label>Preferred Industries</label>
              <div className="industries-grid">
                {['tech', 'healthcare', 'finance', 'consumer', 'energy', 'real-estate'].map((industry) => (
                  <button
                    key={industry}
                    type="button"
                    className={`industry-btn ${preferences.preferredIndustries.includes(industry) ? 'selected' : ''}`}
                    onClick={() => handleIndustryToggle(industry)}
                  >
                    {industry.charAt(0).toUpperCase() + industry.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              className="save-btn"
              onClick={handleSavePreferences}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </section>

        <section className="logout-section">
          <h2>User Session</h2>
          <button 
            className="logout-btn" 
            onClick={handleLogout}
          >
            Log Out
          </button>
        </section>

        <section className="danger-zone">
          <h2>Danger Zone</h2>
          <div className="delete-account">
            <p>Once you delete your account, there is no going back. Please be certain.</p>
            
            {!showDeleteConfirm ? (
              <button
                className="delete-btn"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Account
              </button>
            ) : (
              <div className="delete-confirm">
                <p className="confirm-message">Are you sure you want to delete your account?</p>
                <div className="confirm-buttons">
                  <button
                    className="cancel-btn"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={deleting}
                  >
                    Cancel
                  </button>
                  <button
                    className="confirm-delete-btn"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                  >
                    {deleting ? 'Deleting...' : 'Yes, Delete My Account'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Settings;