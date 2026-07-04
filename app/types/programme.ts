export interface Fees {
    admissionFee: number;

    total: number;

    perSemester?: number;

    emiPerMonth?: number;

    currency: "INR";
}

export interface Eligibility {
    minimumQualification: string[];

    minimumPercentage?: number;

    experienceRequired: boolean;
}

export interface Programme {
    // Basic Information
    id: string;

    programmeName: string;

    degree: string;

    university: string;

    mode: "Online" | "Offline" | "Hybrid";

    duration: string;

    naacGrade?: string;

    // Fees
    fees: Fees;

    // Eligibility
    eligibility: Eligibility;

    // Academics
    specializations: string[];

    // Recommendation Engine
    recommendedGoals: string[];

    recommendedUserTypes: string[];

    // Career
    careerOutcomes: string[];

    placementSupport: boolean;

    // Links
    programmeUrl: string;

    match?: number;
}