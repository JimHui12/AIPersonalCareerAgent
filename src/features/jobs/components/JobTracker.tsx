import { useState } from 'react'
import type { Job, JobStatus, JobColumn } from '@/types/jobs'
import { Button } from '@/components/ui/Button'

const MOCK_JOBS: Job[] = [
    {
        id: '1',
        userId: 'user-123',
        companyName: 'Google',
        roleTitle: 'Frontend Engineer',
        status: 'applied',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        location: 'Mountain View, CA'
    },
    {
        id: '2',
        userId: 'user-123',
        companyName: 'Amazon',
        roleTitle: 'Software Development Engineer',
        status: 'interviewing',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        location: 'Seattle, WA'
    }
]

const COLUMNS: { id: JobStatus; title: string }[] = [
    { id: 'saved', title: 'Saved' },
    { id: 'applied', title: 'Applied' },
    { id: 'interviewing', title: 'Interviewing' },
    { id: 'offer', title: 'Offer' },
    { id: 'rejected', title: 'Rejected' }
]

export default function JobTracker() {
    const [jobs] = useState<Job[]>(MOCK_JOBS)

    const columns: JobColumn[] = COLUMNS.map(col => ({
        ...col,
        jobs: jobs.filter(j => j.status === col.id)
    }))

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Job Tracker</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and track your job applications</p>
                </div>
                <Button size="sm">Add Job</Button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 min-h-[500px]">
                {columns.map(column => (
                    <div key={column.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                {column.title}
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                                    {column.jobs.length}
                                </span>
                            </h3>
                        </div>

                        <div className="flex-1 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 p-2 space-y-3">
                            {column.jobs.map(job => (
                                <div
                                    key={job.id}
                                    className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 truncate">
                                            {job.roleTitle}
                                        </h4>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{job.companyName}</p>
                                    <div className="flex items-center gap-2">
                                        {job.location && (
                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase font-medium">
                                                {job.location}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {column.jobs.length === 0 && (
                                <div className="h-24 flex items-center justify-center text-xs text-gray-400">
                                    No jobs yet
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
