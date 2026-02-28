export type AgentRole = 'ARCHITECT' | 'DEVELOPER' | 'AUDITOR';

export interface AgentTask {
    id: string;
    role: AgentRole;
    prompt: string;
    description: string;
}

export interface AgentResult {
    taskId: string;
    content: string;
    metadata?: Record<string, unknown>;
}

export interface AgentInterface {
    role: AgentRole;
    execute: (task: AgentTask) => Promise<AgentResult>;
}

export interface OrchestratorState {
    currentTaskId: string | null;
    history: AgentResult[];
    status: 'idle' | 'thinking' | 'executing' | 'reviewing' | 'completed' | 'error';
}

export interface JobMatch {
    jobId: string;
    score: number;
    matchReason: string;
    gapAnalysis: string[];
}
