import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: users, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('user_email', email)
        .eq('user_password', password);
  
      if (userError) {
        console.error('Login error:', userError.message);
        setError('Invalid email or password');
        return;
      }
  
      if (users && users.length === 1) {
        console.log('Login successful');
        navigate('/'); // Temporary redirect to home page
      } else if (users && users.length === 0) {
        console.log('No matching user found');
        setError('Invalid email or password');
      }
  
    } catch (error) {
      console.error('Detailed error:', error);
      setError('Connection error - please try again');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Link to="/" className="logo">
          <span>Stock</span><span className="logo-accent">Start</span>
        </Link>
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-submit-btn">Sign In</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;