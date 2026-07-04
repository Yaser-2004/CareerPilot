export type UserType =
    | "student"
    | "working_professional"
    | "career_switcher";

export interface StudentProfile {
    // Discovery
    userType?: UserType;

    qualification?: string;

    specialization?: string;

    preferredSpecialization?: string;

    chosenProgramme?: string;

    experience?: string;

    goal?: string;

    budget?: string;

    // Lead Information
    name?: string;

    phone?: string;

    email?: string;

    crmLeadId?: string;

    videoCounsellingSlot?: {
        date: string;
        time: string;
    };

    preferredCallbackTime?: string;

    admissionExpertRequested?: boolean;
}