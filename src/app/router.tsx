// src/app/router.tsx
import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from '@/layout/protected-route';
import Dashboard from '@/pages/Dashboard/Dashboard';
import DashboardLayout from '@/layout/dashboard-layout';
import Users from '@/pages/Users/Users';
import Courses from '@/pages/Course/Courses';
import Modules from '@/pages/Modules/Modules';
import LoginPage from '@/pages/Login/LoginPage';
import ProfileForm from '@/pages/Profile/ProfileForm';
const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
        ],
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

            {
                path: 'courses',
                element: <Courses />,
            },
            {
                path: 'courses/:courseId/modules',
                element: <Modules />,
            },
            {
                path: 'profile',
                element: <ProfileForm />,
            },

            {
                path: '*',
                element: <h1>404</h1>,
            },
        ],
    },
]);

export default router;
