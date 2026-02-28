import { authService } from '../../services/auth.service'
import { Button } from './Button'
import type { NavbarProps } from '@/types/layout'

export function Navbar({ session }: NavbarProps) {
    const handleLogout = async () => {
        await authService.signOut()
    }

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 px-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                {/* App Origin / Logo */}
                <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-gray-900">
                    <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H8.25a.75.75 0 010-1.5h5.69l-1.72-1.72a.75.75 0 011.06-1.06l3 3z" />
                        </svg>
                    </div>
                    NextRole
                </div>

                {/* Current State Label */}
                <div className="hidden sm:flex items-center h-6 px-2.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                    {session ? 'Dashboard' : 'Sign In'}
                </div>
            </div>

            <div className="flex items-center gap-3">
                {session ? (
                    <>
                        <div className="hidden sm:block text-sm text-gray-500">
                            {session.user.email}
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <div className="text-sm font-medium text-gray-500 hidden sm:block">
                        Your AI Career Assistant
                    </div>
                )}
            </div>
        </nav>
    )
}
