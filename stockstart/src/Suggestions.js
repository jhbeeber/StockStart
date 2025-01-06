import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Navbar from './Navbar';
import './Suggestions.css';

function Suggestions() {
  const { userId } = useParams();
  const [userPreferences, setUserPreferences] = useState(null);
  const [stockSuggestions, setStockSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const FMP_API_KEY = process.env.REACT_APP_FMP_API_KEY;

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    
    try {
      const industries = userPreferences.preferred_industries.map(ind => 
        ({
          'tech': 'Technology',
          'healthcare': 'Healthcare',
          'finance': 'Financial Services',
          'consumer': 'Consumer Cyclical',
          'energy': 'Energy',
          'real-estate': 'Real Estate'
        }[ind] || ind)
      );
  
      const stockPromises = industries.map(industry => {
        const url = new URL('https://financialmodelingprep.com/api/v3/stock-screener');
        
        const params = {
          apikey: FMP_API_KEY,
          marketCapMoreThan: '1000000000',
          betaMoreThan: '1',
          volumeMoreThan: '10000',
          sector: industry
        };
        
        url.search = new URLSearchParams(params).toString();
        
        return fetch(url)
          .then(res => {
            if (!res.ok) {
              throw new Error(`API response error: ${res.status}`);
            }
            return res.json();
          });
      });
  
      const results = await Promise.all(stockPromises);
      let allStocks = results.flat().filter(stock => stock);
  
      if (!Array.isArray(allStocks) || allStocks.length === 0) {
        throw new Error('No stocks found matching your criteria');
      }
  
      const filteredStocks = filterStocksByPreferences(allStocks, userPreferences);
      const shuffled = filteredStocks.sort(() => 0.5 - Math.random());
      setStockSuggestions(shuffled.slice(0, 6));
      
    } catch (err) {
      setError('Error refreshing suggestions: ' + err.message);
      console.error('Refresh error:', err);
    } finally {
      setRefreshing(false);
    }
  };

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
        await fetchStockSuggestions(data);
      } catch (err) {
        setError('Error fetching user preferences');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPreferences();
  }, [userId, FMP_API_KEY]);

  const fetchStockSuggestions = async (preferences) => {
    try {
      const industries = preferences.preferred_industries.map(ind => 
        ({
          'tech': 'Technology',
          'healthcare': 'Healthcare',
          'finance': 'Financial Services',
          'consumer': 'Consumer Cyclical',
          'energy': 'Energy',
          'real-estate': 'Real Estate'
        }[ind] || ind)
      );
  
      const stockPromises = industries.map(industry => {
        const url = new URL('https://financialmodelingprep.com/api/v3/stock-screener');
        
        const params = {
          apikey: FMP_API_KEY,
          marketCapMoreThan: '1000000000',
          betaMoreThan: '1',
          volumeMoreThan: '10000',
          sector: industry
        };
        
        url.search = new URLSearchParams(params).toString();
        
        return fetch(url)
          .then(res => {
            if (!res.ok) {
              throw new Error(`API response error: ${res.status}`);
            }
            return res.json();
          });
      });
  
      const results = await Promise.all(stockPromises);
      let allStocks = results.flat().filter(stock => stock);
  
      if (!Array.isArray(allStocks) || allStocks.length === 0) {
        throw new Error('No stocks found matching your criteria');
      }
  
      const filteredStocks = filterStocksByPreferences(allStocks, preferences);
      setStockSuggestions(filteredStocks.slice(0, 6));
    } catch (err) {
      setError('Error fetching stock suggestions: ' + err.message);
      console.error('Stock API error:', err);
    }
  };

  const filterStocksByPreferences = (stocks, preferences) => {
    if (!Array.isArray(stocks)) {
      console.error('Expected array of stocks but got:', typeof stocks);
      return [];
    }
  
    try {
      let filtered = stocks;
      
      switch(preferences.risk_tolerance) {
        case 'conservative':
          filtered = stocks.filter(stock => stock.beta && stock.beta < 1);
          break;
        case 'moderate':
          filtered = stocks.filter(stock => stock.beta && stock.beta >= 1 && stock.beta <= 1.5);
          break;
        case 'aggressive':
          filtered = stocks.filter(stock => stock.beta && stock.beta > 1.5);
          break;
        default:
          break;
      }
  
      switch(preferences.investment_goal) {
        case 'regular-income':
          return filtered.sort((a, b) => (b.dividendYield || 0) - (a.dividendYield || 0));
        case 'long-term-growth':
          return filtered.sort((a, b) => b.marketCap - a.marketCap);
        case 'short-term-trading':
          return filtered.sort((a, b) => (b.volume || 0) - (a.volume || 0));
        default:
          return filtered.sort((a, b) => b.marketCap - a.marketCap);
      }
    } catch (error) {
      console.error('Error in filtering stocks:', error);
      return [];
    }
  };

  if (loading) return <div className="suggestions-loading">Loading...</div>;
  if (error) return <div className="suggestions-error">{error}</div>;

  return (
    <div className="suggestions">
      <Navbar />
      <main className="suggestions-content">
        <div className="suggestions-header">
          <h1>Stock Suggestions</h1>
          <p className="welcome-text">Personalized recommendations based on your preferences</p>
          <button 
            className={`refresh-button ${refreshing ? 'refreshing' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <span className="refresh-icon">↻</span>
            {refreshing ? 'Refreshing...' : 'Get New Suggestions'}
          </button>
        </div>

        <section className="stock-suggestions">
          <h2>Recommended Stocks</h2>
          <div className="stocks-grid">
            {stockSuggestions.map((stock) => (
              <div key={stock.symbol} className="stock-card">
                <div className="stock-header">
                  <h3>{stock.symbol}</h3>
                  <span className="stock-price">${stock.price}</span>
                </div>
                <div className="stock-details">
                  <p className="company-name">{stock.companyName}</p>
                  <p className="sector">{stock.sector}</p>
                  <div className="stock-metrics">
                    <div className="metric">
                      <span className="metric-label">Market Cap</span>
                      <span className="metric-value">
                        ${(stock.marketCap / 1000000000).toFixed(2)}B
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
        </section>
      </main>
    </div>
  );
}

export default Suggestions;