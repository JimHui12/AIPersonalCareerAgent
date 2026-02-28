import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import App from '../App'
import Auth from '../features/auth/components/Auth'
import Dashboard from '../features/dashboard/components/Dashboard'
import { ResumeBuilder } from '../features/resume'
import { AuthGuard, GuestGuard } from './AuthGuard'

/**
 * Public routes accessible only to guests (unauthenticated users).
 * Example: Login, Register, Forgot Password.
 */
const publicRoutes: RouteObject[] = [
    {
        path: 'auth',
        element: <Auth />
    }
]

/**
 * Protected routes accessible only to authenticated users.
 * All new pages requiring login should be added here.
 */
const protectedRoutes: RouteObject[] = [
    {
        path: 'dashboard',
        element: <Dashboard />
    },
    {
        path: 'resume',
        element: <ResumeBuilder />
    },
    {
        path: 'jobs',
        element: <div className="p-8 text-center text-gray-500">Job Tracker (Coming Soon)</div>
    },
    {
        path: 'interview',
        element: <div className="p-8 text-center text-gray-500">AI Interview Prep (Coming Soon)</div>
    }
]

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />
            },
            {
                element: <GuestGuard />,
                children: publicRoutes
            },
            {
                element: <AuthGuard />,
                children: protectedRoutes
            },
            {
                // Fallback for any other route
                path: '*',
                element: <Navigate to="/dashboard" replace />
            }
        ]
    }
])
