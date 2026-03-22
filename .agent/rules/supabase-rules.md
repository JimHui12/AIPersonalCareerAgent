---
trigger: always_on
---

# Supabase & Database Rules

## 🛡️ Security First (Row Level Security)
- **RLS is MANDATORY**: Every new table must have RLS enabled immediately with `ALTER TABLE name ENABLE ROW LEVEL SECURITY;`.
- **Default Deny**: All tables should start with a default "deny all" state. Explicitly create policies for `SELECT`, `INSERT`, `UPDATE`, and `DELETE`.
- **No Service Role on Client**: Never use the `service_role` key in React components. Only use the `anon` key for client-side interactions.
- **Authenticated Access**: Always restrict sensitive data to the `authenticated` role rather than `public` or `anon`.

## ⚡ Performance Best Practices
- **Index RLS Columns**: Any column used in a policy (e.g., `user_id` in `auth.uid() = user_id`) MUST be indexed to avoid full table scans.
- **Function Caching**: When using functions like `auth.uid()` in policies, wrap them in a subquery `(SELECT auth.uid())` to allow Postgres to cache the result.
- **Avoid Heavy Joins**: Keep RLS policies simple. If complex logic is needed, use a `security definer` function in a separate schema.

## 🛠️ Development Workflow
- **Migrations only**: Prefer schema changes as SQL migrations under `supabase/migrations/` once the Supabase CLI project exists (`supabase init`). Until then, document intended schema in `docs/ARCHITECTURE.md` and apply via Dashboard or first migration when CLI is set up. Avoid relying on undocumented one-off Dashboard edits as the source of truth.
- **Type safety**: After schema changes, regenerate types (`supabase gen types typescript`, or your project’s equivalent) so the frontend stays aligned.
- **Edge Functions**: Use the `Deno.serve` pattern for Edge Functions. Prefer `Hono` or `Express` for functions with multiple routes.

## 📝 Naming Conventions
- **Tables/Columns**: Use `snake_case` for all database entities (Postgres standard).
- **Policies**: Use descriptive names like `“Users can update own profiles”` or `“Admins can view all audit logs”`.
