// src/app/router.tsx
import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { LoginForm } from '@/components/ui/login-form';

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
        path: '/',
        element: (
            <ProtectedRoute>
                <h1>Dashboard</h1>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <h1>Dashboard</h1>,
            },
            {
                path: 'dashboard',
                element: <h1>Dashboard</h1>,
            },
            {
                path: 'profile',
                element: <h1>Profile</h1>,
            },
        ],
    },
]);

export default router;
