import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Navbar from './Navbar';
import './Suggestions.css';

function Suggestions() {
  const { userId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [userPreferences, setUserPreferences] = useState(null);
  const [stockSuggestions, setStockSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [savedStocks, setSavedStocks] = useState(new Set());
  const [savingStocks, setSavingStocks] = useState(new Set());

  const FMP_API_KEY = process.env.REACT_APP_FMP_API_KEY;

  const handleSaveStock = async (stock) => {
    if (savingStocks.has(stock.symbol)) return;
    
    setSavingStocks(prev => new Set([...prev, stock.symbol]));
    
    try {
      const { error } = await supabase
        .from('saved_stocks')
        .insert([{
          user_id: parseInt(userId, 10),
          symbol: stock.symbol,
          company_name: stock.companyName,
          price: stock.price,
          market_cap: stock.marketCap,
          beta: stock.beta,
          sector: stock.sector
        }]);

      if (error) throw error;

      setSavedStocks(prev => new Set([...prev, stock.symbol]));
      
      setTimeout(() => {
        setSavingStocks(prev => {
          const next = new Set(prev);
          next.delete(stock.symbol);
          return next;
        });
      }, 1000);

    } catch (err) {
      console.error('Error saving stock:', err);
      setSavingStocks(prev => {
        const next = new Set(prev);
        next.delete(stock.symbol);
        return next;
      });
    }
  };

  useEffect(() => {
    const fetchSavedStocks = async () => {
      try {
        const { data, error } = await supabase
          .from('saved_stocks')
          .select('symbol')
          .eq('user_id', userId);

        if (error) throw error;

        setSavedStocks(new Set(data.map(stock => stock.symbol)));
      } catch (err) {
        console.error('Error fetching saved stocks:', err);
      }
    };

    fetchSavedStocks();
  }, [userId]);

  const handleRefresh = async () => {
    console.log('handleRefresh called');
    setRefreshing(true);
    setError(null);
    
    try {
      await fetchStockSuggestions();
    } catch (err) {
      setError('Error refreshing suggestions: ' + err.message);
      console.error('Refresh error:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchStockSuggestions = useCallback(async () => {
    console.log('fetchStockSuggestions called');
    
    if (!FMP_API_KEY) {
      setError('FMP API key is missing. Please check your environment variables.');
      setLoading(false);
      return;
    }
  
    try {
      const { data: preferences, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();
  
      if (error) throw error;
  
      console.log('User preferences:', preferences);
  
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
  
      console.log('Fetched stocks:', allStocks);
  
      if (!Array.isArray(allStocks) || allStocks.length === 0) {
        throw new Error('No stocks found matching your criteria');
      }
  
      const filteredStocks = filterStocksByPreferences(allStocks, preferences);
      console.log('Filtered stocks:', filteredStocks);

      const shuffledStocks = filteredStocks.sort(() => 0.5 - Math.random());
      setStockSuggestions(shuffledStocks.slice(0, 6));
      setUserPreferences(preferences);
      console.log('Updated stock suggestions:', shuffledStocks.slice(0, 6));
    } catch (err) {
      setError('Error fetching stock suggestions: ' + err.message);
      console.error('Stock API error:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, FMP_API_KEY, setUserPreferences]);
  
  useEffect(() => {
    fetchStockSuggestions();
  }, [fetchStockSuggestions]);

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
  }, [userId, FMP_API_KEY, fetchStockSuggestions, setUserPreferences]);

  useEffect(() => {
    fetchStockSuggestions();
  }, [fetchStockSuggestions]);

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
                  <button
                    className={`save-stock-btn ${savedStocks.has(stock.symbol) ? 'saved' : ''} ${savingStocks.has(stock.symbol) ? 'saving' : ''}`}
                    onClick={() => handleSaveStock(stock)}
                    disabled={savedStocks.has(stock.symbol) || savingStocks.has(stock.symbol)}
                  >
                    {savedStocks.has(stock.symbol) ? (
                      <>
                        <span className="save-icon">✓</span>
                        Saved
                      </>
                    ) : savingStocks.has(stock.symbol) ? (
                      <>
                        <span className="save-icon rotating">↻</span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <span className="save-icon">+</span>
                        Save
                      </>
                    )}
                  </button>
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