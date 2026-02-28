import { useState, useCallback } from 'react';
import type { Resume, ResumeContent } from '@/types/resume';

const MOCK_RESUME_CONTENT: ResumeContent = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    summary: 'Experienced software engineer with a passion for building scalable web applications.',
    experience: [
        {
            id: '1',
            company: 'Tech Solutions Inc.',
            position: 'Senior Software Engineer',
            startDate: '2020-01-01',
            endDate: 'Present',
            description: 'Lead the development of a microservices-based platform using React and Node.js.'
        }
    ],
    education: [
        {
            id: '1',
            institution: 'University of Technology',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            graduationDate: '2019-05-20'
        }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker']
};

export function useResume() {
    const [resume, setResume] = useState<Resume | null>({
        id: '1',
        userId: 'user-123',
        title: 'Main Resume',
        content: MOCK_RESUME_CONTENT,
        isBaseResume: true,
        createdAt: new Date().toISOString()
    });
    const [loading, setLoading] = useState(false);

    const updateResume = useCallback((content: Partial<ResumeContent>) => {
        setResume(prev => {
            if (!prev) return null;
            return {
                ...prev,
                content: { ...prev.content, ...content }
            };
        });
    }, []);

    const uploadResume = useCallback(async (file: File) => {
        setLoading(true);
        // Simulation of file processing
        console.log('Uploading file:', file.name);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
    }, []);

    return {
        resume,
        loading,
        updateResume,
        uploadResume
    };
}
