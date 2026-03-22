import { useResume } from '../hooks/useResume.ts'
import { Button } from '@/components/ui/Button'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import { ResumeAnalyzer } from './ResumeAnalyzer.tsx'

export function ResumeBuilder() {
    const { resume, loading, uploadResume } = useResume()

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            uploadResume(file)
        }
    }

    if (!resume) {
        return (
            <div className="max-w-lg mx-auto p-8 space-y-6 text-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">No resume yet</h2>
                    <p className="text-sm text-gray-500 mt-2">Upload a PDF or Word document to get started.</p>
                </div>
                <div>
                    <input
                        type="file"
                        id="resume-upload-empty"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx"
                        disabled={loading}
                    />
                    <label
                        htmlFor="resume-upload-empty"
                        className={cn(buttonVariants(), loading && 'pointer-events-none opacity-50', 'cursor-pointer')}
                    >
                        {loading ? 'Uploading...' : 'Upload resume'}
                    </label>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{resume.title}</h2>
                    <p className="text-sm text-gray-500">Last updated: {new Date(resume.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-3">
                    <input
                        type="file"
                        id="resume-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx"
                    />
                    <label
                        htmlFor="resume-upload"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                    >
                        {loading ? 'Uploading...' : 'Upload New'}
                    </label>
                    <Button>Export PDF</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Area */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Full Name</label>
                                <p className="mt-1 text-sm text-gray-900 font-medium">{resume.content.fullName}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Email</label>
                                <p className="mt-1 text-sm text-gray-900 font-medium">{resume.content.email}</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Experience</h3>
                        <div className="space-y-4">
                            {resume.content.experience.map(exp => (
                                <div key={exp.id} className="border-l-2 border-blue-500 pl-4 py-1">
                                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                                    <p className="text-sm text-blue-600">{exp.company}</p>
                                    <p className="text-xs text-gray-400 mt-1">{exp.startDate} - {exp.endDate}</p>
                                    <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {resume.content.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Analyzer Component Side-by-Side */}
                <div className="space-y-6">
                    <ResumeAnalyzer />
                </div>
            </div>
        </div>
    )
}
