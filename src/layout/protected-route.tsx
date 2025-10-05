// src/components/layout/protected-route.tsx
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
}

export const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth(); // assume your hook provides loading state
    const location = useLocation();

    // While auth status is being checked, optionally render a loader
    if (isLoading) {
        return <div>Loading...</div>; // or a spinner component
    }

    // Redirect if route requires auth and user is not authenticated
    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Redirect if route is public but user is already authenticated
    if (!requireAuth && isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Otherwise, render children
    return <>{children}</>;
};
