import App from '@/app/App';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
]);

export default router;
