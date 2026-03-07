import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'

/**
 * AuthGuard: Only allows authenticated users to access the children routes.
 * Redirects to /auth if not authenticated.
 */
export function AuthGuard() {
    const { session, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <div className="p-8 text-center text-gray-400">Loading Session...</div>
    }

    if (!session) {
        // Redirect them to the /auth page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/auth" state={{ from: location }} replace />
    }

    return <Outlet />
}

/**
 * GuestGuard: Only allows unauthenticated users to access the children routes (like /auth).
 * Redirects to /dashboard if already authenticated.
 */
export function GuestGuard() {
    const { session, loading } = useAuth()

    if (loading) {
        return <div className="p-8 text-center text-gray-400">Loading Session...</div>
    }

    if (session) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}
