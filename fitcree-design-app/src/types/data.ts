import { LucideIcon } from 'lucide-react';

export interface StatItem {
    label: string;
    value: number;
    icon: LucideIcon;
    color: string;
    bg: string;
}

export interface ProjectDetails {
    usagePurpose?: string[];
    industry?: string[];
    requestType?: 'proposal' | 'specified' | 'partner';
    background?: string;
    target?: string;
    taste?: string[];
    referenceUrls?: string[];
    referenceFiles?: string[];
    conditions?: string[];
    deliveryFormat?: {
        mode: 'consult' | 'specified';
        values: string[];
    };
    publicity?: 'ok' | 'partial' | 'ng';
    requirements?: string[];
    deadlineDate?: {
        type: 'date' | 'asap' | 'negotiable';
        value?: string;
    };
    persona?: string;
}

export interface User {
    id: string;
    name: string;
    company?: string;
    avatarUrl: string;
    mode: 'client' | 'creator';
    stats?: StatItem[];
    projects?: Project[];
    role?: string;
    skills?: string[];
    rating?: number;
    reviewCount?: number;
    location?: string;
    description?: string;
}

export interface Project {
    id: number;
    title: string;
    status: 'recruiting' | 'selection' | 'in_progress' | 'completed' | 'closed';
    statusLabel: string;
    categoryId: number;
    categoryLabel?: string;
    postedDate: string;
    deadline: string;
    startDate?: string;
    applicants?: number;
    newApplicants?: number;
    budgetRangeId: number;
    budgetRangeLabel?: string;
    partnerName?: string;
    progress?: number;
    hasUnreadMessage?: boolean;
    applicantUsers?: User[];
    assignedUsers?: User[];
    details?: ProjectDetails;
}

export type ProjectStatus = Project['status'];
