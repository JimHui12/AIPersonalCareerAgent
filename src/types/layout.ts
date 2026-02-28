import type { ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'

export interface RootLayoutProps {
    children: ReactNode
    session?: Session | null
}

export interface NavbarProps {
    session: Session | null
}
