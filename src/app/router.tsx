// src/app/router.tsx
import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from '@/layout/protected-route';
import { LoginForm } from '@/components/ui/login-form';
import Dashboard from '@/pages/Dashboard/Dashboard';
import DashboardLayout from '@/layout/dashboard-layout';
import Users from '@/pages/Users/Users';
const router = createBrowserRouter([
    {
        path: '/login',
        element: (
            <ProtectedRoute requireAuth={false}>
                <LoginForm />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: 'dashboard',
                element: <h1>Dashboard</h1>,
            },
            {
                path: 'users',
                element: <Users />,
            },
        ],
    },
]);

export default router;
