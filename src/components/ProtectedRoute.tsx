import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../services/authService';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  // Tarkista onko käyttäjä kirjautunut
  if (!isAuthenticated()) {
    // Jos ei, ohjaa /login sivulle
    return <Navigate to="/login" replace />;
  }

  // Tue myös rooli-pohjaista suojausta (esim. vain admin)
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
