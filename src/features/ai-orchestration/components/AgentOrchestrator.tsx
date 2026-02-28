import { useState } from 'react'
import { orchestratorService } from '@/services/orchestrator.service'
import { Button } from '@/components/ui/Button'
import type { AgentResult } from '@/types/agents'

export function AgentOrchestrator() {
    const [results, setResults] = useState<AgentResult[]>([])
    const [loading, setLoading] = useState(false)
    const [mission, setMission] = useState('')

    const handleRunMission = async () => {
        if (!mission) return
        setLoading(true)
        const agentResults = await orchestratorService.runCareerMission(mission)
        setResults(agentResults)
        setLoading(false)
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">AI Mission Control</h3>
                <p className="text-sm text-gray-500">Orchestrate Architect, Developer, and Auditor agents</p>
            </div>

            <div className="p-6 space-y-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={mission}
                        onChange={(e) => setMission(e.target.value)}
                        placeholder="e.g. Pivot from Frontend to AI Engineer"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={handleRunMission} disabled={loading || !mission}>
                        {loading ? 'Orchestrating...' : 'Launch Mission'}
                    </Button>
                </div>

                {results.length > 0 && (
                    <div className="space-y-3 mt-6">
                        {results.map((result, index) => (
                            <div key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${result.taskId === 'ARCHITECT' ? 'bg-purple-100 text-purple-700' :
                                        result.taskId === 'DEVELOPER' ? 'bg-green-100 text-green-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                        {result.taskId} Agent
                                    </span>
                                    <span className="text-[10px] text-gray-400">{new Date(result.metadata?.timestamp as string).toLocaleTimeString()}</span>
                                </div>
                                <p className="text-sm text-gray-700 italic">"{result.content}"</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
