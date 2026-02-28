import { Button } from '@/components/ui/Button'

export function ResumeAnalyzer() {
    // Mock analysis data
    const analysis = {
        score: 72,
        suggestions: [
            'Quantify your achievements with numbers (e.g., "Increased sales by 20%").',
            'Add more keywords from AI Engineering job descriptions.',
            'Expand on your experience with Docker and Kubernetes.'
        ],
        strengths: ['Strong React background', 'TypeScript proficiency'],
        weaknesses: ['Lack of specialized AI tool experience']
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-20">
            <div className="p-4 border-b border-gray-100 bg-blue-50">
                <h3 className="text-md font-bold text-blue-900">AI Analysis</h3>
            </div>

            <div className="p-6 space-y-6">
                <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-gray-100"
                            />
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={251.2}
                                strokeDashoffset={251.2 * (1 - analysis.score / 100)}
                                className="text-blue-600"
                            />
                        </svg>
                        <span className="absolute text-2xl font-bold">{analysis.score}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-gray-700">Optimization Score</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Strengths</h4>
                        <div className="flex flex-wrap gap-2">
                            {analysis.strengths.map(s => (
                                <span key={s} className="px-2 py-1 bg-green-50 text-green-700 rounded text-[10px] font-bold border border-green-100">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Suggestions</h4>
                        <ul className="space-y-2">
                            {analysis.suggestions.map((s, i) => (
                                <li key={i} className="text-xs text-gray-600 flex gap-2">
                                    <span className="text-blue-500 font-bold">•</span>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Button variant="outline" className="w-full text-xs py-2">
                    Run Full Audit
                </Button>
            </div>
        </div>
    )
}
