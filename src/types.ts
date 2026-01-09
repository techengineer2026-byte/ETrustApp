// src/types.ts

export type JobStatus = "Interview" | "Rejected" | "Offer" | "Pending";

export type AppliedJob = {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    logoColor: string;
    logoInitial: string;
    status: JobStatus;
    appliedDate: string;
};

// Also define the type for the original JOBS_DATA items used in Dashboard
export type JobDataItem = {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    tags: string[];
    logoColor: string;
    logoInitial: string;
};