import { supabase } from '../lib/supabase'

/**
 * Authentication Service
 * Abstracts the direct Supabase client calls for authentication.
 */
export const authService = {
    // Sign in with Email/Password
    signInWithEmail: async (email: string, password?: string) => {
        if (password) {
            return await supabase.auth.signInWithPassword({ email, password })
        }
        return await supabase.auth.signInWithOtp({ email })
    },

    // Sign up with Email/Password
    signUpWithEmail: async (email: string, password?: string) => {
        if (!password) throw new Error('Password is required for sign up')
        return await supabase.auth.signUp({ email, password })
    },

    // Sign out
    signOut: async () => {
        return await supabase.auth.signOut()
    },

    // Get current active session
    getSession: async () => {
        return await supabase.auth.getSession()
    },

    // Listen to Auth stage changes
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
        const { data } = supabase.auth.onAuthStateChange(callback)
        return data.subscription
    }
}
