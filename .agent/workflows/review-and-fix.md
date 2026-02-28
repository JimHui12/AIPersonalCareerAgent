---
description: Audits the current file and runs tests to ensure quality.
---

### Steps
1. **Lint Check**: Run `npm run lint` on the current file.
2. **Auto-Fix**: If linting fails, apply fixes immediately.
3. **Unit Tests**: Identify the associated test file and run `npm test`.
4. **Final Audit**: Review the code for React performance anti-patterns (e.g., unnecessary `useEffect` calls).
5. **Report**: Summarize any changes made or issues that still require human attention.
