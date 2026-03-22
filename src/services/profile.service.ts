import { supabase } from '@/lib/supabase'
import type { Profile, ProfileRow } from '@/types/profile'

function mapRow(row: ProfileRow): Profile {
    return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        careerGoal: row.career_goal,
        createdAt: row.created_at,
    }
}

export const profileService = {
    async fetchByUserId(userId: string): Promise<{ data: Profile | null; error: Error | null }> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle()

        if (error) {
            return { data: null, error: new Error(error.message) }
        }
        if (!data) {
            return { data: null, error: null }
        }
        return { data: mapRow(data as ProfileRow), error: null }
    },

    async upsert(input: {
        userId: string
        firstName?: string | null
        lastName?: string | null
        careerGoal?: string | null
    }): Promise<{ error: Error | null }> {
        const { error } = await supabase.from('profiles').upsert(
            {
                id: input.userId,
                first_name: input.firstName ?? null,
                last_name: input.lastName ?? null,
                career_goal: input.careerGoal ?? null,
            },
            { onConflict: 'id' }
        )
        if (error) {
            return { error: new Error(error.message) }
        }
        return { error: null }
    },
}
