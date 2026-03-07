export type InterviewRole = 'interviewer' | 'candidate';

export interface InterviewMessage {
    id: string;
    role: InterviewRole;
    content: string;
    timestamp: string;
}

export interface InterviewFeedback {
    score: number;
    positives: string[];
    improvements: string[];
    technicalNotes: string;
}

export interface InterviewSession {
    id: string;
    userId: string;
    jobId?: string;
    messages: InterviewMessage[];
    status: 'scheduled' | 'active' | 'completed';
    feedback?: InterviewFeedback;
    createdAt: string;
}
