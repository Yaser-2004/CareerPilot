export interface Fees {
    admissionFee: number;

    total: number;

    feesRange: string;

    perSemester?: number;

    emiPerMonth?: number;

    currency: "INR";

    paymentOptions?: string[];

    emiAvailable?: boolean;

    hasScholarships?: boolean;

    scholarshipEligibility?: string;

    inclusions?: string[];

    paymentModes?: string[];
}

export interface Eligibility {
    minimumQualification: string[];

    minimumPercentage?: number;

    preferredMarks?: string;

    entranceRequired?: boolean;

    experienceRequired: boolean;
}

export interface Curriculum {
    durationSemesters: number;

    coreSubjects: string[];
}

export interface Placements {
    services: string[];

    typicalRecruiters: string[];
}

export interface AdmissionProcess {
    steps: string[];

    cycles: string;
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

    approvals?: string[];

    // Fees
    fees: Fees;

    // Eligibility
    eligibility: Eligibility;

    // Academics
    curriculum?: Curriculum;

    specializations: string[];

    // Recommendation Engine
    recommendedGoals: string[];

    recommendedUserTypes: string[];

    // Career
    careerOutcomes: string[];

    placementSupport: boolean;

    placements?: Placements;

    // Documents & Process
    requiredDocuments?: string[];

    admissionProcess?: AdmissionProcess;

    // Links
    programmeUrl: string;

    match?: number;
}