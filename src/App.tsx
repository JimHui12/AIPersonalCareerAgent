import { Outlet } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { AuthProvider } from './features/auth/context/AuthProvider'
import { useAuth } from './features/auth/hooks/useAuth'

function AppContent() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <RootLayout session={session}>
        <div className="flex w-full h-full items-center justify-center p-8 text-gray-400">
          Loading Application...
        </div>
      </RootLayout>
    )
  }

  return (
    <RootLayout session={session}>
      {/* Route-matched components (Dashboard, Resume, etc) inject here automatically */}
      <Outlet context={{ session }} />
    </RootLayout>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
