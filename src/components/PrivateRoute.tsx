import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useUserStore((state) => state.token);
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
