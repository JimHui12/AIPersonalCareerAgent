import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import App from '../App'
import Auth from '../features/auth/components/Auth'
import Dashboard from '../features/dashboard/components/Dashboard'
import { ResumeBuilder } from '../features/resume'
import JobTracker from '../features/jobs/components/JobTracker'
import { InterviewPrep } from '../features/interview/components/InterviewPrep'
import { AuthGuard, GuestGuard } from './AuthGuard'

import Settings from '../features/settings/components/Settings'

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
        element: <JobTracker />
    },
    {
        path: 'interview',
        element: <InterviewPrep />
    },
    {
        path: 'settings',
        element: <Settings />
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
