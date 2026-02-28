import { authService } from '../../../services/auth.service'
import { Button } from '../../../components/ui/Button'
import { useAuth } from '../../auth/context/auth.context'
import { RoleMatcher } from '../../ai-orchestration/components/RoleMatcher'
import { AgentOrchestrator } from '../../ai-orchestration/components/AgentOrchestrator'

export default function Dashboard() {
    const { session } = useAuth()

    if (!session) return null;

    const handleLogout = async () => {
        await authService.signOut()
    }

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Career Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome back, {session.user.email}</p>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                    Log Out
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AgentOrchestrator />
                <RoleMatcher />
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h2 className="text-sm font-semibold uppercase text-gray-500 mb-4 tracking-wider">Quick Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <p className="text-2xl font-bold text-gray-900">0</p>
                        <p className="text-xs text-gray-500">Active Jobs</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <p className="text-2xl font-bold text-gray-900">1</p>
                        <p className="text-xs text-gray-500">Resumes Saved</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <p className="text-2xl font-bold text-gray-900">0</p>
                        <p className="text-xs text-gray-500">Mock Interviews</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
