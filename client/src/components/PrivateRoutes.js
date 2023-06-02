import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../utils/auth';

const PrivateRoute = ({ children }) => {
  return AuthService.loggedIn() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
