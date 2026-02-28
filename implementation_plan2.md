# Consolidated Implementation Plan: AI Personal Career Agent

This document outlines the technical plan for building the **AI Personal Career Agent**, a platform designed to help users manage their career journey through AI-powered tools.

## Product Vision
The AI Personal Career Agent acts as a central hub for job seekers, providing resume optimization, job tracking, and interview preparation.

## Technology Stack
- **Frontend**: React (Vite), Tailwind CSS, TypeScript.
- **UI Components**: shadcn/ui, Magic UI (for premium aesthetics).
- **Backend/Database/Auth**: Supabase.
- **AI Integration**: OpenAI (or equivalent LLM) for resume tailoring and mock interviews.

## User Review Required
> [!IMPORTANT]
> - **Supabase Auth Configuration**: To avoid "Email Rate Limit" errors during development, please ensure **Email Confirmation** is toggled **OFF** in your Supabase Dashboard (Authentication > Providers > Email).
> - **API Keys**: You will need to provide an OpenAI API key (or similar) in the future for the AI-powered features.
> - **Cron Jobs**: Automated job board scraping/automated applications will require a dedicated backend or Supabase Edge Functions.

---

## Proposed Changes

### 1. Application Architecture & Layout
The app uses a consistent layout with a top Navbar and a conditional Sidebar for authenticated pages.

#### [MODIFY] [RootLayout.tsx](file:///d:/projects/first-app/src/layouts/RootLayout.tsx)
- Implement a 2-column layout (Sidebar + Main Content).
- Sidebar is only visible when the user has an active session.

#### [NEW] [Sidebar.tsx](file:///d:/projects/first-app/src/components/ui/Sidebar.tsx)
- Navigation links for Dashboard, Resume, Jobs, and Interview Prep.

### 2. Core MVP Pages
| Page | Path | Description |
| :--- | :--- | :--- |
| **Auth** | `/auth` | Landing page and Email/Password login/signup. |
| **Dashboard** | `/dashboard` | User summary, active tasks, and quick actions. |
| **Resume Builder** | `/resume` | Upload, edit, and AI-tailoring of resumes. |
| **Job Tracker** | `/jobs` | Kanban/List view of job applications and job descriptions. |
| **Interview Prep** | `/interview` | AI-conducted mock interviews based on resumes and jobs. |
| **Settings** | `/settings` | User preferences and API key configuration. |

### 3. Database Schema (Supabase)
To support the MVP, the following tables are proposed:

#### `profiles`
- Connects to `auth.users`, stores user-specific career goals.
#### `resumes`
- Stores base resumes and AI-generated tailored versions.
#### `jobs`
- Tracks roles, companies, status (Applied, Interviewing, etc.), and job descriptions.
#### `interview_sessions`
- Stores chat history and AI feedback from mock interviews.

---

## Execution Plan

### Phase 1: Authentication & Layout (Complete/In Progress)
- [x] Switch to Email/Password authentication in [Auth.tsx](file:///d:/projects/first-app/src/features/auth/components/Auth.tsx).
- [x] Fix Dashboard routing and session handling.
- [ ] Finalize `Sidebar.tsx` and integrate into `RootLayout.tsx`.

### Phase 2: Page Scaffolding
- [ ] Create placeholder components for Resume, Jobs, and Interview features.
- [ ] Set up routing in [src/router/index.tsx](file:///d:/projects/first-app/src/router/index.tsx) for new pages.

### Phase 3: Data Layer & AI Integration
- [ ] Initialize Supabase tables.
- [ ] Implement Resume upload and basic Job tracking.
- [ ] Connect AI service for Resume Analysis.

---

## Verification Plan

### Automated Tests
- Run `npm run lint` and `npm run build` to verify TypeScript and build integrity.

### Manual Verification
1. **Auth Flow**: Ensure Sign Up and Sign In work without requiring email confirmation (once configured in Supabase).
2. **Navigation**: Verify that the Sidebar correctly links to all 4 feature pages and only appears when logged in.
3. **Responsive Design**: Verify the Sidebar/Navbar layout looks good on both desktop and mobile viewports.
