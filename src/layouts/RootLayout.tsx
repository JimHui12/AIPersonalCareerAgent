import { Navbar } from '../components/ui/Navbar'
import { Sidebar } from '../components/ui/Sidebar'
import type { RootLayoutProps } from '@/types/layout'

export function RootLayout({ children, session }: RootLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 bg-opacity-50">
            <Navbar session={session ?? null} />

            {/* Conditionally render Sidebar only when user is authenticated */}
            {session && <Sidebar />}

            {/* Main Content Area - shifts right if Sidebar is present */}
            <main className={`pt-16 transition-all duration-200 ${session ? 'md:ml-64' : ''}`}>
                <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
                    {session ? (
                        // Authenticated views: full width dashboard style
                        <div className="w-full max-w-5xl bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            {children}
                        </div>
                    ) : (
                        // Unauthenticated views (Login): centered small box
                        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            {children}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
