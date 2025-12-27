import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { isTokenValid } from '../../utils/authUtils';

const LoginRoute = ({ children }) => {
  const { auth } = useContext(AppContext);
  const token = auth.token || localStorage.getItem('token');

  if (token && isTokenValid(token)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default LoginRoute;
