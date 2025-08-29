import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@app/store/hooks';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAppSelector(state => state.auth.user);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
