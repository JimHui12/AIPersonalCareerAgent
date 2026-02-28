---
trigger: always_on
---

# React Coding Standards
**Applies to:** `src/**/*.tsx`, `src/**/*.ts`
**Activation:** Always On

- Use **TypeScript** for all components; strictly avoid `any`.
- Prefer **Functional Components** with hooks over Class components.
- Use **Tailwind CSS** for all styling; do not create separate `.css` files.
- All data fetching must use **TanStack Query** hooks.
- Before finishing any task, run `npm run lint` and fix all errors.
