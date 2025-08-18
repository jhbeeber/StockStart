import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function ProtectedRoute({ userId, children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = localStorage.getItem('userSession');
        
        if (!session) {
          setIsAuthorized(false);
          setLoading(false);
          return;
        }

        const sessionData = JSON.parse(session);
        const sessionUserId = sessionData.userId;

        if (sessionUserId !== parseInt(userId)) {
          setIsAuthorized(false);
          setLoading(false);
          return;
        }

        const { data: user, error } = await supabase
          .from('users')
          .select('user_id')
          .eq('user_id', userId)
          .single();

        if (error || !user) {
          setIsAuthorized(false);
          setLoading(false);
        } else {
          setIsAuthorized(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        setIsAuthorized(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, [userId]);

  if (loading) {
    return (
      <>
        {children}
        <div className="protected-loading-overlay">
          <div className="protected-spinner"></div>
        </div>
      </>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;