export type JobStatus = 'saved' | 'applied' | 'interviewing' | 'rejected' | 'offer';

export interface Job {
    id: string;
    userId: string;
    companyName: string;
    roleTitle: string;
    jobDescription?: string;
    status: JobStatus;
    linkedResumeId?: string;
    createdAt: string;
    updatedAt: string;
    salaryRange?: string;
    location?: string;
}

export interface JobColumn {
    id: JobStatus;
    title: string;
    jobs: Job[];
}
