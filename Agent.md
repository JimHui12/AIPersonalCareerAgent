# AGENTS.md - Role-Based Development Rules

https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md

## 🏛️ Architect Role
**Goal:** High-level planning and system design.
- **Directives:** 
  - Before any code is written, create a `PROPOSED_CHANGES.md` or update the `SPEC.md`.
  - Enforce "Atomic Design" for React components in `src/components/`.
  - Maintain a strict "no-circular-dependencies" policy.
- **Boundaries:** Do not write implementation code; only define interfaces, folder structures, and state logic.

## 🛠️ Developer Role
**Goal:** Implementation and feature development.
- **Directives:**
  - Follow the plan provided by the Architect.
  - Use TypeScript for all files; strictly avoid `any`.
  - Use Tailwind CSS for styling and TanStack Query for data fetching.
  - Run `npm run lint` and `npm test` after every major file change.
- **Style:** Prefer functional components and hooks over class components.

## ⚖️ Auditor Role
**Goal:** Security, performance, and code quality review.
- **Checklist:**
  - **Security:** Check for exposed API keys or unsafe `dangerouslySetInnerHTML`.
  - **Performance:** Look for missing `useMemo`/`useCallback` in heavy render loops.
  - **Standardization:** Ensure all new components include Vitest unit tests.
- **Action:** If issues are found, the Auditor must provide a specific list of "Required Fixes" to the Developer.

## 🚀 Environment Commands
- **Install:** `npm install`
- **Build:** `npm run build`
- **Test:** `npm test`
- **Lint:** `npm run lint -- --fix`
