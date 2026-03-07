import { useState } from 'react'
import { matchingService } from '@/services/matching.service'
import type { JobMatch } from '@/types/agents'

export function useRoleMatch() {
    const [matches, setMatches] = useState<JobMatch[]>([])
    const [loading, setLoading] = useState(false)

    const findMatches = async () => {
        setLoading(true)
        try {
            // In a real app, these would be fetched from Supabase or state
            const mockJobs = [
                { id: '1', role_title: 'Software Engineer', company_name: 'Tech Corp' },
                { id: '2', role_title: 'Product Manager', company_name: 'Innovation Inc' }
            ]
            const userProfile = { career_goal: 'Senior Developer' }
            const resumeContent = { skills: ['React', 'TypeScript', 'Node.js'] }

            const results = await matchingService.findMatches(userProfile, resumeContent, mockJobs)
            setMatches(results)
        } catch (error) {
            console.error('Role matching failed:', error)
        } finally {
            setLoading(false)
        }
    }

    return {
        matches,
        loading,
        findMatches
    }
}
