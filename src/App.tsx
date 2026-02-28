import { Outlet } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { AuthProvider, useAuth } from './features/auth/context/auth.context'

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
