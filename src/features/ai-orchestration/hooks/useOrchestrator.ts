import { useState } from 'react'
import { orchestratorService } from '@/services/orchestrator.service'
import type { AgentResult } from '@/types/agents'

export function useOrchestrator() {
    const [results, setResults] = useState<AgentResult[]>([])
    const [loading, setLoading] = useState(false)
    const [mission, setMission] = useState('')

    const runMission = async () => {
        if (!mission) return
        setLoading(true)
        try {
            const agentResults = await orchestratorService.runCareerMission(mission)
            setResults(agentResults)
        } catch (error) {
            console.error('Orchestration failed:', error)
        } finally {
            setLoading(false)
        }
    }

    return {
        results,
        loading,
        mission,
        setMission,
        runMission
    }
}
