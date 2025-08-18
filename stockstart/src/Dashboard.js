import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Navbar from './Navbar';
import './Dashboard.css';

function Dashboard() {
  const { userId } = useParams();
  const [userPreferences, setUserPreferences] = useState(null);
  const [savedStocks, setSavedStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingStocks, setDeletingStocks] = useState(new Set());

  const FMP_API_KEY = process.env.REACT_APP_FMP_API_KEY;

  const handleDeleteStock = async (stockSymbol) => {
    setDeletingStocks(prev => new Set([...prev, stockSymbol]));
    
    try {
      const { error } = await supabase
        .from('saved_stocks')
        .delete()
        .eq('user_id', userId)
        .eq('symbol', stockSymbol);

      if (error) throw error;

      setSavedStocks(currentStocks => 
        currentStocks.filter(stock => stock.symbol !== stockSymbol)
      );
    } catch (err) {
      console.error('Error deleting stock:', err);
    } finally {
      setDeletingStocks(prev => {
        const next = new Set(prev);
        next.delete(stockSymbol);
        return next;
      });
    }
  };

  useEffect(() => {
    const fetchSavedStocks = async () => {
      try {
        const { data, error } = await supabase
          .from('saved_stocks')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSavedStocks(data);
      } catch (err) {
        console.error('Error fetching saved stocks:', err);
      }
    };

    fetchSavedStocks();
  }, [userId]);

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

  if (loading) return <div className="dashboard-loading"></div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard">
      <Navbar />
      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1>Your Investment Dashboard</h1>
          <p className="welcome-text">Welcome to your personalized stock suggestions</p>
        </div>

        <section className="saved-stocks-section">
          <h2>Your Saved Stocks</h2>
          {savedStocks.length === 0 ? (
            <div className="no-stocks-message">
              <p>You haven't saved any stocks yet.</p>
              <p>Visit the suggestions page to discover and save stocks!</p>
            </div>
          ) : (
            <div className="saved-stocks-grid">
              {savedStocks.map((stock) => (
                <div key={stock.symbol} className="saved-stock-card">
                  <div className="saved-stock-header">
                    <h3>{stock.symbol}</h3>
                    <button
                      className={`delete-stock-btn ${deletingStocks.has(stock.symbol) ? 'deleting' : ''}`}
                      onClick={() => handleDeleteStock(stock.symbol)}
                      disabled={deletingStocks.has(stock.symbol)}
                    >
                      {deletingStocks.has(stock.symbol) ? (
                        <span className="delete-icon rotating">↻</span>
                      ) : (
                        <span className="delete-icon">×</span>
                      )}
                    </button>
                  </div>
                  <div className="saved-stock-details">
                    <p className="company-name">{stock.company_name}</p>
                    <p className="sector">{stock.sector}</p>
                    <div className="stock-metrics">
                      <div className="metric">
                        <span className="metric-label">Market Cap</span>
                        <span className="metric-value">
                          ${(stock.market_cap / 1000000000).toFixed(2)}B
                        </span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Beta</span>
                        <span className="metric-value">{stock.beta?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

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