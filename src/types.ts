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

export type NotificationType = "interview" | "job_alert" | "application" | "system";
export type NotificationItem = {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    read: boolean;
};
// navigation/types.ts
export type RootStackParamList = {
  SettingsScreen: undefined;
  AccountStatusScreen: undefined;
  // add other screens here
};

export const INITIAL_NOTIFICATIONS_DATA: NotificationItem[] = [
];