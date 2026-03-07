import { useRoleMatch } from '../hooks/useRoleMatch'
import { Button } from '@/components/ui/Button'

export function RoleMatcher() {
    const { matches, loading, findMatches } = useRoleMatch()

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">AI Role Matcher</h3>
                    <p className="text-sm text-gray-500">Matching your profile against current opportunities</p>
                </div>
                <Button
                    onClick={findMatches}
                    disabled={loading}
                    size="sm"
                >
                    {loading ? 'Analyzing...' : 'Refresh Matches'}
                </Button>
            </div>

            <div className="p-6">
                {matches.length > 0 ? (
                    <div className="space-y-4">
                        {matches.map(match => (
                            <div key={match.jobId} className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-blue-900">Match Score: {match.score}%</span>
                                    <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600"
                                            style={{ width: `${match.score}%` }}
                                        />
                                    </div>
                                </div>
                                <p className="text-sm text-blue-800 font-semibold mb-1">{match.matchReason}</p>
                                <div className="mt-2">
                                    <span className="text-xs font-bold uppercase text-blue-700">Skills Gaps:</span>
                                    <ul className="mt-1 flex flex-wrap gap-2">
                                        {match.gapAnalysis.map((gap: string) => (
                                            <li key={gap} className="px-2 py-1 bg-white border border-blue-200 rounded text-[10px] text-blue-600 font-medium">
                                                {gap}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="mx-auto w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                            <span className="text-gray-400 font-bold">AI</span>
                        </div>
                        <p className="text-sm text-gray-600">Click the button above to start roles matching.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
