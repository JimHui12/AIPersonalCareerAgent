---
trigger: always_on
---

# Project coding rules

**Applies to:** `src/**/*.tsx`, `src/**/*.ts`

## TypeScript

- Use **TypeScript** everywhere in `src/`; avoid `any` (use `unknown` or narrow types when needed).
- **Shared types** (domain models, API shapes, cross-feature contracts) live in **`src/types/`** (or a feature-local `types/` folder if you later split by feature).
- **File-local types** are fine for private props, small unions, or one-off component state—do not force trivial types into `src/types/` just to satisfy a rule.

## React

- Prefer **function components** and hooks over class components.
- Use **Tailwind** for component styling. Do **not** add new ad-hoc `.css` files per feature; rely on Tailwind and the existing global setup (`src/index.css`, Tailwind config).

## Data fetching & async data

- Use **TanStack Query** for Supabase-backed and other server/async data (queries, mutations, cache invalidation). `QueryClientProvider` is wired in `main.tsx`.
- Put **`queryFn` / mutation logic in services** (`src/services/`) or thin hooks (`useQuery`/`useMutation` in feature hooks); avoid calling Supabase or Axios directly from large presentational components.
- **Supabase Auth** (session, sign-in/out) stays in **`AuthContext`** / `auth.service`—do not duplicate session in Query unless there is a clear benefit.

## Documentation

- Update **`docs/ARCHITECTURE.md`** when structure, major features, or stack choices change.
- Keep the **Project structure** tree and **Roadmap** there in sync with the repo.

## Code quality

- Before finishing a task, run **`npm run lint`** and fix reported issues.
- When a **`test`** script exists, run tests for changes that affect behavior.
