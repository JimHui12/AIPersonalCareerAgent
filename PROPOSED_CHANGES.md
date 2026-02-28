# PROPOSED_CHANGES.md - AI Orchestration Layer

## 🏛️ Architecture Overview
The AI Orchestration Layer will be a modular system designed to coordinate multiple specialized AI agents. This mirrors the `Agent.md` roles to provide a cohesive development experience.

### Component Structure
The AI layer will live in `src/features/ai-orchestration/`:
- **Agents**: Stateless logic for specific AI personas.
- **Orchestrator**: Maintains state and coordinates between user intent and agents.
- **Matchers**: Algorithmic and AI-driven logic for role/skill matching.

### Interfaces & Folder Structure
```text
src/features/ai-orchestration/
├── agents/             # Persona-specific logic
│   ├── career.agent.ts # Architect persona
│   ├── skills.agent.ts # Developer persona
│   └── review.agent.ts # Auditor persona
├── services/
│   ├── orchestrator.service.ts
│   └── matching.service.ts
├── hooks/              # useOrchestrator, useRoleMatch
├── components/         # UI components for AI interaction
└── types/              # Domain models
```

### State Logic
- The orchestrator will use a state machine to track the "Thought -> Plan -> Execute -> Review" cycle.
- Persisted in Supabase for long-running career "missions".

## 🛠️ Implementation Directives
- Use `supabase-js` for vector searches (if enabled) or structured data matching.
- Agents must follow a strict input/output interface to remain swappable.
- Role matching will compare `profiles.career_goal` and `resumes.content` against `jobs.job_description`.

## ⚖️ Audit Points
- Ensure OpenAI/LLM API calls are cost-efficient.
- Strictly validate AI-generated content before rendering.
- No direct filesystem access for browser-side agents.
