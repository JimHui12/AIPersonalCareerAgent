import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { Profile } from '@/types/profile'
import { useProfile } from '../hooks/useProfile'

function splitFullName(full: string): { firstName: string; lastName: string } {
    const parts = full.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return { firstName: '', lastName: '' }
    if (parts.length === 1) return { firstName: parts[0], lastName: '' }
    return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

function buildFullName(profile: Profile | null | undefined): string {
    if (!profile) return ''
    const first = profile.firstName ?? ''
    const last = profile.lastName ?? ''
    return [first, last].filter(Boolean).join(' ').trim()
}

function ProfileFormFields({
    profile,
    email,
    onSave,
    isSaving,
    isLoading,
    saveError,
}: {
    profile: Profile | null | undefined
    email: string | undefined
    onSave: (vars: { firstName: string; lastName: string; careerGoal: string }) => Promise<void>
    isSaving: boolean
    isLoading: boolean
    saveError: Error | null
}) {
    const [fullName, setFullName] = useState(() => buildFullName(profile))
    const [goal, setGoal] = useState(() => profile?.careerGoal ?? '')

    const handleDiscard = () => {
        setFullName(buildFullName(profile ?? null))
        setGoal(profile?.careerGoal ?? '')
    }

    const handleSave = async () => {
        const { firstName, lastName } = splitFullName(fullName)
        await onSave({
            firstName,
            lastName,
            careerGoal: goal.trim(),
        })
    }

    return (
        <>
            {saveError && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                    {saveError.message}
                </div>
            )}

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                    <p className="text-sm text-gray-500">Update your personal details and career goals.</p>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="settings-full-name">
                                Full name
                            </label>
                            <input
                                id="settings-full-name"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                disabled={isLoading}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="settings-email">
                                Email address
                            </label>
                            <input
                                id="settings-email"
                                type="email"
                                value={email ?? ''}
                                disabled
                                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700" htmlFor="settings-goal">
                            Primary career goal
                        </label>
                        <input
                            id="settings-goal"
                            type="text"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                            placeholder="e.g. Senior Frontend Engineer"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                    <p className="text-sm text-gray-500">Configure how you receive updates and alerts.</p>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-900">Email notifications</p>
                            <p className="text-xs text-gray-500">Receive job match alerts and interview reminders.</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input
                                type="checkbox"
                                name="toggle"
                                id="toggle"
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                defaultChecked
                            />
                            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={handleDiscard} disabled={isSaving || isLoading}>
                    Discard changes
                </Button>
                <Button type="button" onClick={() => void handleSave()} disabled={isSaving || isLoading}>
                    {isSaving ? 'Saving…' : 'Save settings'}
                </Button>
            </div>
        </>
    )
}

export default function Settings() {
    const { session } = useAuth()
    const { profile, isLoading, isError, error, saveProfile, isSaving, saveError } = useProfile()

    const loadErrorMessage =
        isError && error instanceof Error ? error.message : null

    const formKey = profile ? profile.id : isLoading ? 'loading' : 'empty'

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-2">Manage your account profile and application preferences.</p>
            </div>

            {isLoading && <p className="text-sm text-gray-500 mb-4">Loading profile…</p>}

            {loadErrorMessage && (
                <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    {loadErrorMessage}
                    {loadErrorMessage.includes('relation') || loadErrorMessage.includes('does not exist') ? (
                        <span className="block mt-1 text-amber-800">
                            Run the SQL migration in <code className="text-xs">supabase/migrations/</code> on your
                            Supabase project (see <code className="text-xs">supabase/README.md</code>).
                        </span>
                    ) : null}
                </div>
            )}

            <div className="space-y-8">
                <ProfileFormFields
                    key={formKey}
                    profile={profile ?? undefined}
                    email={session?.user?.email}
                    onSave={saveProfile}
                    isSaving={isSaving}
                    isLoading={isLoading}
                    saveError={saveError instanceof Error ? saveError : null}
                />
            </div>
        </div>
    )
}
