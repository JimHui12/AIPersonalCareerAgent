/** App-facing profile (camelCase). */
export interface Profile {
    id: string
    firstName: string | null
    lastName: string | null
    careerGoal: string | null
    createdAt: string
}

/** Row shape from `public.profiles` (snake_case). */
export interface ProfileRow {
    id: string
    first_name: string | null
    last_name: string | null
    career_goal: string | null
    created_at: string
}
