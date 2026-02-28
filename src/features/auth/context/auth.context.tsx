import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { authService } from '../../../services/auth.service'
import type { AuthContextType } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch initial session
        authService.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        // Subscribe to auth state changes
        const subscription = authService.onAuthStateChange((_event: string, session: Session | null) => {
            setSession(session)
            setLoading(false)
        })

        return () => {
            subscription?.unsubscribe()
        }
    }, [])

    const signOut = async () => {
        await authService.signOut()
        setSession(null)
    }

    const value = {
        session,
        loading,
        signOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
