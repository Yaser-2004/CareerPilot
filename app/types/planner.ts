import { StudentProfile } from "./profile";
import { Programme } from "./programme";

export type ConversationPhase =
    | "welcome"
    | "recommendations"
    | "lead_capture"
    | "fees"
    | "completed";

export type PlannerAction =
    | "ASK_FIELD"
    | "SHOW_RECOMMENDATIONS"
    | "CAPTURE_LEAD"
    | "ANSWER_FAQ"
    | "COMPARE_PROGRAMMES"
    | "COMPLETE";

export interface PlannerField {
    key: keyof StudentProfile;

    label: string;

    required: boolean;
}

export interface PlannerDecision {
    action: PlannerAction;

    phase: ConversationPhase;

    field?: keyof StudentProfile;

    recommendations?: Programme[];
}

export interface PlannerContext {
    profile: StudentProfile;

    programmes: Programme[];

    hasShownRecommendations: boolean;
}