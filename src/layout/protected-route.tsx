// src/components/layout/protected-route.tsx
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
}

export const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!requireAuth && isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
