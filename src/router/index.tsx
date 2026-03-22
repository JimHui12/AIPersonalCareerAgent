import { lazy, Suspense, type ReactElement, type ReactNode } from 'react'
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import App from '../App'
import { AuthGuard, GuestGuard } from './AuthGuard'
import { RouteFallback } from './routeFallback'

const Auth = lazy(() => import('../features/auth/components/Auth'))
const Dashboard = lazy(() => import('../features/dashboard/components/Dashboard'))
const ResumeBuilder = lazy(() =>
    import('../features/resume/components/ResumeBuilder').then((m) => ({ default: m.ResumeBuilder }))
)
const JobTracker = lazy(() => import('../features/jobs/components/JobTracker'))
const InterviewPrep = lazy(() =>
    import('../features/interview/components/InterviewPrep').then((m) => ({ default: m.InterviewPrep }))
)
const Settings = lazy(() => import('../features/settings/components/Settings'))

function suspensePage(page: ReactNode): ReactElement {
    return <Suspense fallback={<RouteFallback />}>{page}</Suspense>
}

/**
 * Public routes accessible only to guests (unauthenticated users).
 * Example: Login, Register, Forgot Password.
 */
const publicRoutes: RouteObject[] = [
    {
        path: 'auth',
        element: suspensePage(<Auth />)
    }
]

/**
 * Protected routes accessible only to authenticated users.
 * All new pages requiring login should be added here.
 */
const protectedRoutes: RouteObject[] = [
    {
        path: 'dashboard',
        element: suspensePage(<Dashboard />)
    },
    {
        path: 'resume',
        element: suspensePage(<ResumeBuilder />)
    },
    {
        path: 'jobs',
        element: suspensePage(<JobTracker />)
    },
    {
        path: 'interview',
        element: suspensePage(<InterviewPrep />)
    },
    {
        path: 'settings',
        element: suspensePage(<Settings />)
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
