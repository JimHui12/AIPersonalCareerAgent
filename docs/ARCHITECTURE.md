# NextRole — AI Personal Career Agent: Architecture

> A central hub for job seekers powered by AI. Resume optimization, job tracking, and mock interviews — all in one place.

---

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), TypeScript, Tailwind CSS |
| **UI Components** | shadcn/ui, Magic UI |
| **Backend / Auth / DB** | Supabase |
| **HTTP Client** | Axios (`src/https/`) |
| **AI Integration** | OpenAI (or equivalent LLM) — _placeholder, not yet wired_ |

> [!IMPORTANT]
> **Supabase Auth Setup**: Disable **Email Confirmation** in your Supabase Dashboard (`Authentication > Providers > Email`) to avoid rate-limit errors during development.
> **API Keys**: An OpenAI API key will be required for AI-powered features.
> **Cron Jobs**: Automated job scraping will require Supabase Edge Functions or a dedicated backend.

---

## Project Structure

```
src/
├── App.tsx                        # Root component, session provider
├── main.tsx                       # Entry point
├── index.css / App.css            # Global styles
├── assets/
├── components/
│   └── ui/
│       ├── Navbar.tsx             # ✅ Global top bar (brand: "NextRole")
│       ├── Sidebar.tsx            # ✅ Auth-gated nav links
│       ├── Button.tsx             # ✅ shadcn/ui-based button (exports buttonVariants)
│       └── Input.tsx              # ✅ shadcn/ui-based input
├── features/
│   ├── auth/
│   │   ├── components/Auth.tsx    # ✅ Email/Password login & signup
│   │   └── context/auth.context  # ✅ AuthContext / useAuth hook
│   ├── dashboard/
│   │   └── components/Dashboard  # ✅ Basic scaffold
│   └── ai-orchestration/         # 🔄 Partially implemented (see below)
│       ├── agents/base.agent.ts   # ✅ 3 concrete agents in one file
│       ├── components/AgentOrchestrator.tsx
│       └── components/RoleMatcher.tsx
├── layouts/
│   └── RootLayout.tsx             # ✅ 2-column layout, conditional Sidebar
├── router/
│   ├── index.tsx                  # ✅ Route definitions
│   └── AuthGuard.tsx              # ✅ AuthGuard + GuestGuard
├── services/                      # ✅ All services live here
│   ├── auth.service.ts            # Supabase auth abstraction
│   ├── profile.service.ts         # profiles table CRUD (RLS)
│   ├── orchestrator.service.ts    # AI Mission state machine
│   └── matching.service.ts        # Role/skill matching logic
├── https/
│   ├── api.ts                     # GET / POST / DELETE helpers
│   └── axiosRequestsInterceptor.ts # Axios instance (optional `VITE_API_BASE_URL`)
├── lib/                           # shadcn/ui utilities, queryClient (TanStack Query)
├── hooks/                         # (empty — future shared hooks)
├── stores/                        # (empty — optional; see Phase 4–5 in Implementation Roadmap)
├── types/                         # ✅ All shared types live here
│   ├── agents.ts                  # AgentRole, AgentTask, AgentResult, OrchestratorState, JobMatch
│   ├── auth.ts                    # AuthContextType
│   ├── profile.ts                 # Profile, ProfileRow
│   ├── layout.ts                  # RootLayoutProps, NavbarProps
│   ├── resume.ts                  # Resume, ResumeContent, Experience, Education, ResumeAnalysis
│   └── components.ts              # ButtonProps (barrel re-export from Button.tsx)
└── utils/                         # Shared utility functions
```

---

## App Layout

```
+---------------------------------------------------+
| Navbar (always visible — brand, user actions)     |
+-----------+---------------------------------------+
|           |                                       |
| Sidebar   |   Main Feature Content Area           |
|  (auth'd) |   (Dashboard, Resume, Jobs, Prep)     |
|           |                                       |
+-----------+---------------------------------------+
```

- **`RootLayout`** renders a 2-column layout; Sidebar rendered only when `session` exists.
- Authenticated views: `max-w-5xl` container with card styling.
- Unauthenticated views: `max-w-md` centered card (login page).

## State Management

**Current**: Auth session is handled by `AuthContext` + `useAuth`. **TanStack Query** (`QueryClientProvider` in `main.tsx`) backs server-backed data starting with **`profiles`** on the Settings page (`useProfile`).

**Decision**: No global client store yet. Use **TanStack Query** for Supabase-backed entities (profiles, resumes, jobs, …). Optional **Zustand** only if truly client-only shared UI state is needed across many routes.

> [!NOTE]
> Auth stays in `AuthContext` unless you later consolidate session via Query patterns.

---

## Routing

Defined in `src/router/index.tsx` using `react-router-dom`.

| Route | Guard | Component | Status |
| :--- | :--- | :--- | :--- |
| `/` | — | Redirects → `/dashboard` | ✅ |
| `/auth` | `GuestGuard` | `Auth.tsx` | ✅ (after login → saved `from` route or `/dashboard`) |
| `/dashboard` | `AuthGuard` | `Dashboard.tsx` | ✅ |
| `/resume` | `AuthGuard` | `ResumeBuilder.tsx` | ✅ |
| `/jobs` | `AuthGuard` | `JobTracker.tsx` | ✅ (mock data; wire to DB in Phase 4) |
| `/interview` | `AuthGuard` | `InterviewPrep.tsx` | ✅ (mock chat; wire to LLM + DB later) |
| `/settings` | `AuthGuard` | `Settings.tsx` | ✅ |
| `*` | — | Redirects → `/dashboard` | ✅ |

### Guards (`src/router/AuthGuard.tsx`)

- **`AuthGuard`** — Unauthenticated users are redirected to `/auth`, preserving the intended destination in `location.state.from`.
- **`GuestGuard`** — Authenticated users are redirected to the route saved in `location.state.from` (when arriving from `AuthGuard`), otherwise `/dashboard` (prevents visiting `/auth` when logged in).
- Both guards render a loading state while the session check is in-flight.

---

## AI Orchestration Layer (`src/features/ai-orchestration/`)

### Current State

| Item | Status | Notes |
| :--- | :--- | :--- |
| `types/agents.ts` | ✅ | `AgentRole`, `AgentTask`, `AgentResult`, `AgentInterface`, `OrchestratorState`, `JobMatch` |
| `agents/base.agent.ts` | ✅ | `BaseAgent` abstract class + 3 concrete agents (`CareerArchitectAgent`, `SkillsDeveloperAgent`, `InterviewAuditorAgent`) |
| `src/services/orchestrator.service.ts` | ✅ | `OrchestratorService` — `Thought → Plan → Execute → Review` state machine |
| `src/services/matching.service.ts` | ✅ | `MatchingService` — role/skill matching logic |
| `components/AgentOrchestrator.tsx` | ✅ | UI component for triggering and displaying a career mission |
| `components/RoleMatcher.tsx` | ✅ | UI component for displaying job match results |
| `hooks/` | ✅ | `useOrchestrator`, `useRoleMatch` hooks created |
| LLM API integration | ❌ | `BaseAgent.execute()` is a simulation stub — real OpenAI calls not yet wired |

### Agent Roles

| Agent Class | Role | Responsibility |
| :--- | :--- | :--- |
| `CareerArchitectAgent` | `ARCHITECT` | Career strategy planning |
| `SkillsDeveloperAgent` | `DEVELOPER` | Skills gap analysis |
| `InterviewAuditorAgent` | `AUDITOR` | Quality and readiness review |

### Orchestration Flow

```
runCareerMission(description)
  → ARCHITECT: Career Strategy Planning
  → DEVELOPER: Skills Gap Analysis  (based on ARCHITECT output)
  → AUDITOR:   Quality Assurance Review (based on DEVELOPER output)
  → returns history: AgentResult[]
```

### Guardrails

- Agent input/output contracts are strictly typed — agents remain individually swappable.
- AI-generated content must be validated before rendering in the UI.
- No direct filesystem access from browser-side agents.
- LLM calls must be cost-efficient (batch where possible).

---

## Database Schema (Supabase — planned)

### `profiles`

| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | uuid (PK) | References `auth.users` |
| `first_name` | text | |
| `last_name` | text | |
| `career_goal` | text | e.g. "Senior Frontend Engineer" |
| `created_at` | timestamp | |

### `resumes`

| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | uuid (PK) | |
| `user_id` | uuid | References `profiles` |
| `title` | text | e.g. "Base", "Google Tailored" |
| `content` | jsonb / text | Resume payload |
| `is_base_resume` | boolean | |
| `created_at` | timestamp | |

### `jobs`

| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | uuid (PK) | |
| `user_id` | uuid | References `profiles` |
| `company_name` | text | |
| `role_title` | text | |
| `job_description` | text | Fed into AI for Interview Prep & Resume Tailoring |
| `status` | enum | `saved`, `applied`, `interviewing`, `rejected`, `offer` |
| `linked_resume_id` | uuid (nullable) | References `resumes` |
| `created_at` | timestamp | |

### `interview_sessions`

| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | uuid (PK) | |
| `user_id` | uuid | References `profiles` |
| `job_id` | uuid | References `jobs` — interview context |
| `chat_history` | jsonb | Q&A array |
| `ai_feedback` | text | Final score/feedback |
| `created_at` | timestamp | |

---

## Implementation Roadmap

High-level order: **auth & shell → feature UI → LLM integration → persisted data → polish & scale**. Checkboxes track concrete deliverables.

### Phase 1 — Authentication & layout ✅
- [x] Supabase client and email/password auth
- [x] Global `Navbar` and conditional `Sidebar`
- [x] `RootLayout` two-column layout
- [x] TypeScript/Vite path aliases (`@/`) and shadcn-style UI primitives
- [x] `AuthGuard` / `GuestGuard` with post-login return to `location.state.from`
- [x] Shared types under `src/types/`, services under `src/services/`
- [x] Lazy-loaded routes + `Suspense` fallbacks (`src/router/`)

### Phase 2 — Page scaffolding ✅
- [x] Routes: `/resume`, `/jobs`, `/interview`, `/settings`
- [x] Resume builder & analyzer UI (`features/resume/`) — upload flow uses mock parsing until Phase 4
- [x] Job tracker UI (`features/jobs/`) — mock Kanban/list data
- [x] Interview prep UI (`features/interview/`) — mock chat
- [x] Settings page

### Phase 3 — AI orchestration (LLM) 🔄
**Done (client-side simulation):**
- [x] `BaseAgent` + three concrete agents; `OrchestratorService`; `MatchingService`
- [x] `AgentOrchestrator`, `RoleMatcher`, `useOrchestrator`, `useRoleMatch`

**Remaining:**
- [ ] **Secrets**: Do **not** ship production API keys in the browser — add a **Supabase Edge Function** (or small backend) that holds the OpenAI (or Azure OpenAI) key and validates the user’s JWT before calling the model.
- [ ] **Contract**: Define request/response DTOs for the Edge Function; map results into existing `AgentResult` / `AgentTask` types.
- [ ] **Implement** `BaseAgent.execute()` (or a parallel `LlmClient`) to call that endpoint instead of returning simulated strings.
- [ ] **Resilience**: Timeouts, user-visible errors, optional retry/backoff for transient LLM failures.
- [ ] **Cost & safety**: Rate limiting per user (Edge layer), logging/metrics, and validation/sanitization of model output before rendering (see guardrails above).

### Phase 4 — Data layer (Supabase) 🔄
**Project & schema**
- [x] Versioned SQL under `supabase/migrations/` (initial migration: enums, tables, RLS, `handle_new_user` trigger) — see `supabase/README.md`
- [ ] Run migration against your project (`supabase db push` or SQL Editor)
- [x] Tables: `profiles`, `resumes`, `jobs`, `interview_sessions` (columns in **Database Schema** section above)
- [x] **RLS** on all tables; policies use `(select auth.uid())` for caching; indexes on `user_id` / `job_id` where needed
- [x] `profiles` row on sign-up (`on_auth_user_created` trigger) + **upsert** from app if row missing

**Client integration**
- [x] **`@tanstack/react-query`** + `QueryClientProvider`; `useProfile` + `profileService` for Settings
- [ ] Regenerate **`supabase` TypeScript types** after migrations; use generated types in services
- [ ] **Resume**: Storage bucket + policies for uploads; persist parsed `content` jsonb; replace `useResume` mock with real queries
- [ ] **Jobs**: CRUD + status transitions; replace mock `JobTracker` data
- [ ] **Interview sessions**: Save `chat_history` / `ai_feedback` per job
- [ ] **Orchestration inputs**: Read resume + job context from DB when running missions (replace hard-coded demo content)

**Optional / later**
- [ ] **Automated job monitoring** (scraping or APIs) via **Edge Functions** + cron — high effort; compliance and ToS sensitive

### Phase 5 — UX, performance, reliability 🔜
- [ ] Consistent loading/empty/error states across feature pages
- [ ] Error boundary at layout or route level; friendly fallback UI
- [ ] **Responsive** sidebar/nav (drawer or collapse on small viewports)
- [ ] Further **code-splitting** or prefetch for heavy routes if bundle grows
- [ ] Accessibility pass (focus order, labels, contrast) on auth + main flows

### Phase 6 — Quality & operations 🔜
- [ ] **Vitest** (or chosen runner) + `npm test` in CI
- [ ] Critical-path tests: auth guard behavior, one service with mocked Supabase
- [ ] **Production deploy** (e.g. static host + env vars): `VITE_*` documented; Supabase prod project
- [ ] Optional E2E (Playwright) for login + one protected route

---

## Verification Checklist

- [ ] `npm run lint` passes with zero errors
- [ ] `npm run build` completes without TypeScript errors
- [ ] **Auth**: Sign Up and Sign In work end-to-end
- [ ] **`AuthGuard`**: All protected routes redirect unauthenticated users to `/auth`
- [ ] **`GuestGuard`**: Authenticated users visiting `/auth` are redirected to `/dashboard` or to the route stored in `location.state.from` when present
- [ ] **Session preservation**: After login, user is returned to the originally requested route
- [ ] **Navigation**: Sidebar appears only when logged in and links to all feature pages
- [ ] **Responsive**: Sidebar/Navbar layout works on desktop and mobile
- [ ] **AI safety**: AI-generated content validated before rendering
