import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginProtector = ({ children }) => {
  const userType = localStorage.getItem('userType');

  if (userType === 'customer') {
    return <Navigate to="/" replace />;
  } else if (userType === 'admin') {
    return <Navigate to="/admin" replace />;
  } else if (userType === 'flight-operator') {
    return <Navigate to="/flight-admin" replace />;
  }

  return children;
};

export default LoginProtector;
