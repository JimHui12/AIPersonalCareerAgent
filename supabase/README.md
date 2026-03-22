# Supabase (NextRole)

## Migrations

SQL lives in `migrations/`. The first file defines:

- `public.profiles` (linked to `auth.users`, auto-insert trigger)
- `public.resumes`, `public.jobs`, `public.interview_sessions` with **RLS** aligned to `auth.uid()`

### Apply with Supabase CLI

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

### Apply manually

1. Open **SQL Editor** in the [Supabase Dashboard](https://supabase.com/dashboard).
2. Paste the contents of `migrations/20250322120000_initial_schema.sql`.
3. Run. Fix any errors (e.g. if a trigger name already exists from an earlier experiment).

## After schema changes

Regenerate typed definitions for the client when you add the codegen workflow:

```bash
supabase gen types typescript --linked > src/types/database.generated.ts
```

Then map or import generated types in services.
