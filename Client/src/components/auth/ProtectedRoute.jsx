import React, { useEffect, useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { isTokenValid } from '../../utils/authUtils';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const token = auth.token || localStorage.getItem('token');
  const role = auth.role || localStorage.getItem('role');
  const isValid = isTokenValid(token);

  useEffect(() => {
    const validateAndRedirect = () => {
      const currentToken = localStorage.getItem('token');
      if (!isTokenValid(currentToken)) {
        console.warn('Shield: Token manipulation detected.');
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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
