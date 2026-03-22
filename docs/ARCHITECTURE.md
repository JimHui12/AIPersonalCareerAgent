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
│   ├── orchestrator.service.ts    # AI Mission state machine
│   └── matching.service.ts        # Role/skill matching logic
├── https/
│   ├── api.ts                     # GET / POST / DELETE helpers
│   └── axiosRequestsInterceptor.ts # Axios instance (optional `VITE_API_BASE_URL`)
├── lib/                           # shadcn/ui utilities
├── hooks/                         # (empty — future shared hooks)
├── stores/                        # (empty — deferred to Phase 3, see State Management)
├── types/                         # ✅ All shared types live here
│   ├── agents.ts                  # AgentRole, AgentTask, AgentResult, OrchestratorState, JobMatch
│   ├── auth.ts                    # AuthContextType
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

**Current**: Auth session is the only shared state, handled by `AuthContext` + `useAuth`. No global store is installed.

**Decision**: Zustand will be added in **Phase 3** when Supabase data is fetched and needs to be shared across pages. For now, local `useState` + context is sufficient.

> [!NOTE]
> TanStack Query will also be evaluated in Phase 3 as an alternative to a client-side store for server data (caching, re-fetching, loading/error states).

---

## Routing

Defined in `src/router/index.tsx` using `react-router-dom`.

| Route | Guard | Component | Status |
| :--- | :--- | :--- | :--- |
| `/` | — | Redirects → `/dashboard` | ✅ |
| `/auth` | `GuestGuard` | `Auth.tsx` | ✅ (after login → saved `from` route or `/dashboard`) |
| `/dashboard` | `AuthGuard` | `Dashboard.tsx` | ✅ |
| `/resume` | `AuthGuard` | `ResumeBuilder.tsx` | ✅ |
| `/jobs` | `AuthGuard` | Placeholder (`Coming Soon`) | 🔄 |
| `/interview` | `AuthGuard` | Placeholder (`Coming Soon`) | 🔄 |
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

### Phase 1 — Authentication & Layout ✅
- [x] Supabase client and Email/Password auth
- [x] Global `Navbar` and conditional `Sidebar`
- [x] `RootLayout` 2-column layout
- [x] TypeScript/Vite path aliases (`@/`) and `shadcn/ui` design system
- [x] `AuthGuard` / `GuestGuard` — route protection with session preservation
- [x] All `type`/`interface` declarations consolidated into `src/types/`
- [x] All service logic consolidated into `src/services/`

### Phase 2 — Page Scaffolding 🔄
- [x] Routes defined for `/resume`, `/jobs`, `/interview` (placeholders)
- [x] `Resume Builder & Analyzer` — full component (`features/resume/`)
- [x] `Job Tracker` — Kanban/list view (`features/jobs/`)
- [x] `AI Interview Prep` — mock interview chat (`features/interview/`)
- [x] `Settings` page (`/settings`)

### Phase 3 — AI Orchestration 🔄
- [x] `BaseAgent` + 3 concrete agents
- [x] `OrchestratorService` state machine
- [x] `MatchingService` for role/skill matching
- [x] `AgentOrchestrator.tsx` and `RoleMatcher.tsx` UI components
- [x] `hooks/useOrchestrator` and `hooks/useRoleMatch`
- [ ] Wire real OpenAI/LLM API calls into `BaseAgent.execute()`

### Phase 4 — Data Layer
- [ ] Initialize Supabase tables (`profiles`, `resumes`, `jobs`, `interview_sessions`)
- [ ] Resume upload and Job tracking CRUD
- [ ] Connect orchestration layer to real Supabase data
- [ ] Automated job board monitoring (Edge Functions)

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
