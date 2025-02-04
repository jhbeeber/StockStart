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
          return;
        }

        const sessionData = JSON.parse(session);
        const sessionUserId = sessionData.userId;

        if (sessionUserId !== parseInt(userId)) {
          setIsAuthorized(false);
          return;
        }

        const { data: user, error } = await supabase
          .from('users')
          .select('user_id')
          .eq('user_id', userId)
          .single();

        if (error || !user) {
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;