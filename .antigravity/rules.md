# Project Coding Rules

**Applies to:** `src/**/*.tsx`, `src/**/*.ts`

## TypeScript

- Use **TypeScript** for all components and services; strictly avoid `any`.
- All `type` and `interface` declarations must live exclusively in a `types/` folder within the relevant feature (e.g. `src/types/`). Never define types or interfaces inline inside service, component, or hook files.

## React

- Prefer **Functional Components** with hooks over Class components.
- Use **Tailwind CSS** for all styling; do not create separate `.css` files.

## Data Fetching

- All data fetching must use **TanStack Query** hooks.

## Documentation

- Always update `docs/ARCHITECTURE.md` when project structure, folder organization, or core features are updated.
- Maintain the "Project Structure" tree and "Roadmap" status in `ARCHITECTURE.md` to reflect the current state of the repository.

## Code Quality

- Before finishing any task, run `npm run lint` and fix all errors.
