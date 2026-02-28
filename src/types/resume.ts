export interface ResumeContent {
    fullName: string;
    email: string;
    phone: string;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationDate: string;
}

export interface Resume {
    id: string;
    userId: string;
    title: string;
    content: ResumeContent;
    isBaseResume: boolean;
    createdAt: string;
    lastAnalyzed?: string;
}

export interface ResumeAnalysis {
    score: number;
    suggestions: string[];
    strengths: string[];
    weaknesses: string[];
}
