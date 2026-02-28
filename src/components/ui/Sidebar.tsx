import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../utils/cn'

const NAV_ITEMS = [
    { name: 'Dashboard', path: '/dashboard', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
    { name: 'Resume Builder', path: '/resume', icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' },
    { name: 'Job Tracker', path: '/jobs', icon: 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z' },
    { name: 'AI Interview Prep', path: '/interview', icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z' },
]

export function Sidebar() {
    const location = useLocation()

    return (
        <aside className="fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow-sm hidden md:flex flex-col">
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {NAV_ITEMS.map((item) => {
                        const isActive = location.pathname.startsWith(item.path)
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={cn(
                                    'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
                                    isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                )}
                            >
                                <svg
                                    className={cn(
                                        'mr-3 flex-shrink-0 h-5 w-5',
                                        isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                                    )}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d={item.icon} />
                                </svg>
                                <span className="truncate">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Bottom Help Section */}
            <div className="p-4 border-t border-gray-200">
                <a href="#" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900">
                    <svg className="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.06 14.5a.75.75 0 01-.75-.75V15a.75.75 0 011.5 0v1.079a.75.75 0 01-.75.75zM12 6.75a3 3 0 00-3 3 .75.75 0 11-1.5 0 4.5 4.5 0 116.142 4.197c-.328.188-.415.42-.424.502v.068a.75.75 0 01-1.5 0v-.357c0-.6.376-1.077.925-1.39A3 3 0 0012 6.75z" clipRule="evenodd" />
                    </svg>
                    Help & Support
                </a>
            </div>
        </aside>
    )
}
