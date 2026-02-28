import type { AgentInterface, AgentRole, AgentTask, AgentResult, OrchestratorState } from '@/types/agents';
import { CareerArchitectAgent, SkillsDeveloperAgent, InterviewAuditorAgent } from '@/features/ai-orchestration/agents/base.agent';

export class OrchestratorService {
    private agents: Map<AgentRole, AgentInterface>;
    private state: OrchestratorState;

    constructor() {
        this.agents = new Map();
        this.agents.set('ARCHITECT', new CareerArchitectAgent());
        this.agents.set('DEVELOPER', new SkillsDeveloperAgent());
        this.agents.set('AUDITOR', new InterviewAuditorAgent());

        this.state = {
            currentTaskId: null,
            history: [],
            status: 'idle'
        };
    }

    async runCareerMission(missionDescription: string): Promise<AgentResult[]> {
        this.state.status = 'thinking';

        // 1. Architect defines the plan
        const architectTask: AgentTask = {
            id: crypto.randomUUID(),
            role: 'ARCHITECT',
            prompt: `Plan a career strategy for: ${missionDescription}`,
            description: 'Career Strategy Planning'
        };
        const plan = await this.executeTask(architectTask);

        // 2. Developer implements the skills gap analysis
        const developerTask: AgentTask = {
            id: crypto.randomUUID(),
            role: 'DEVELOPER',
            prompt: `Identify required skills and gaps based on the plan: ${plan.content}`,
            description: 'Skills Gap Analysis'
        };
        const analysis = await this.executeTask(developerTask);

        // 3. Auditor reviews the entire mission
        const auditorTask: AgentTask = {
            id: crypto.randomUUID(),
            role: 'AUDITOR',
            prompt: `Review the plan and analysis for security and quality: ${analysis.content}`,
            description: 'Quality Assurance Review'
        };
        await this.executeTask(auditorTask);

        this.state.status = 'completed';
        return this.state.history;
    }

    private async executeTask(task: AgentTask): Promise<AgentResult> {
        const agent = this.agents.get(task.role);
        if (!agent) throw new Error(`No agent found for role: ${task.role}`);

        this.state.currentTaskId = task.id;
        this.state.status = 'executing';

        const result = await agent.execute(task);
        this.state.history.push(result);

        return result;
    }

    getState(): OrchestratorState {
        return { ...this.state };
    }
}

export const orchestratorService = new OrchestratorService();
