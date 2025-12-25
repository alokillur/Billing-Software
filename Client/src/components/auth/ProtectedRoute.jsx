import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { isTokenValid } from '../../utils/authUtils';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  
  const token = localStorage.getItem('token');
  const isValid = isTokenValid(token);

  useEffect(() => {
    const validateAndRedirect = () => {
      const currentToken = localStorage.getItem('token');
      if (!isTokenValid(currentToken)) {
        console.warn('Shield: Token manipulation detected via event listener.');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login', { replace: true });
      }
    };

    window.addEventListener('storage', validateAndRedirect);
    
    window.addEventListener('focus', validateAndRedirect);
    
    document.addEventListener('visibilitychange', validateAndRedirect);

    return () => {
      window.removeEventListener('storage', validateAndRedirect);
      window.removeEventListener('focus', validateAndRedirect);
      document.removeEventListener('visibilitychange', validateAndRedirect);
    };
  }, [navigate]);

  if (!isValid) {
    if (token) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
