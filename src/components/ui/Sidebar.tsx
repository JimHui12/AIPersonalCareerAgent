import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../utils/cn'

const NAV_ITEMS = [
    { name: 'Dashboard', path: '/dashboard', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
    { name: 'Resume Builder', path: '/resume', icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' },
    { name: 'Job Tracker', path: '/jobs', icon: 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z' },
    { name: 'AI Interview Prep', path: '/interview', icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z' },
    { name: 'Settings', path: '/settings', icon: 'M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.81,11.69,4.81,12c0,0.31,0.02,0.65,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.5c-1.93,0-3.5-1.57-3.5-3.5 s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.93,15.5,12,15.5z' },
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
