import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { profileService } from '@/services/profile.service'

export function useProfile() {
    const { session } = useAuth()
    const userId = session?.user?.id
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['profile', userId],
        queryFn: async () => {
            const { data, error } = await profileService.fetchByUserId(userId!)
            if (error) throw error
            return data
        },
        enabled: Boolean(userId),
    })

    const saveMutation = useMutation({
        mutationFn: async (vars: { firstName: string; lastName: string; careerGoal: string }) => {
            if (!userId) throw new Error('Not signed in')
            const { error } = await profileService.upsert({
                userId,
                firstName: vars.firstName,
                lastName: vars.lastName,
                careerGoal: vars.careerGoal,
            })
            if (error) throw error
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['profile', userId] })
        },
    })

    return {
        profile: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
        saveProfile: saveMutation.mutateAsync,
        isSaving: saveMutation.isPending,
        saveError: saveMutation.error,
    }
}
