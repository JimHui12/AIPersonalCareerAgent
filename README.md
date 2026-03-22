# NextRole — AI Personal Career Agent

> **Your AI-powered career co-pilot.** Strategize, optimize, and land your next role with the power of coordinated AI agents.

---

## 🚀 Overview

**NextRole** is a comprehensive hub for job seekers, designed to automate the most tedious parts of the job search. From resume tailoring to interview preparation, NextRole uses a sophisticated **AI Orchestration Layer** to provide personalized, high-quality career guidance.

### Why NextRole?
Most tools offer static templates. NextRole offers a **Dynamic Mission Flow** where multiple specialized AI agents (Architect, Developer, Auditor) collaborate to ensure your profile is not just "good," but "hire-ready."

---

## ✨ Key Features

### 📄 AI Resume Builder & Analyzer
- **Smart Analysis**: Get an "Optimization Score" and actionable feedback on your current resume.
- **Auto-Tailoring**: Leverages matching algorithms to highlight the skills recruiters are looking for (in development).
- **Modern UI**: A clean, sidebar-driven editor for real-time updates.

### 🤖 AI Orchestration (The "Career Mission")
- **The Architect**: Plans your career strategy and identifies high-level goals.
- **The Developer**: Conducts skills gap analysis and creates a roadmap for your growth.
- **The Auditor**: Performs a final quality review and ensures you're ready for the spotlight.

### 🎯 Job Matcher & Tracker
- **Role Matching**: See exactly how well you fit a specific job description based on your current skills.
- **Kanban Pipeline**: Track your applications from "Saved" to "Offer" (Phase 2).

### 🎤 Mock Interview Prep (Coming Soon)
- **AI-Driven Q&A**: Practice with role-specific technical and behavioral questions.
- **Instant Feedback**: Get scored on your responses and learn how to improve.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui, Magic UI |
| **State / Data** | TanStack Query (planned), AuthContext |
| **Backend / Auth** | Supabase |
| **AI Layer** | OpenAI (Mission-driven orchestration) |

---

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JimHui12/AIPersonalCareerAgent.git
   cd AIPersonalCareerAgent
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the project root (required for auth):
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   Optional — custom API base URL for `src/https/` Axios calls:
   ```env
   VITE_API_BASE_URL=https://your-api.example.com
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 🗺️ Roadmap

See `docs/ARCHITECTURE.md` for the full phased plan. In short:

- [x] **Phase 1**: Authentication & core layout
- [x] **Phase 2**: Page scaffolding (resume, jobs, interview, settings)
- [ ] **Phase 3**: Wire real LLM calls into the orchestration layer
- [ ] **Phase 4**: Supabase data layer (profiles, resumes, jobs, interviews)
- [ ] **Phase 5**: Advanced interview / media features (as needed)

---


