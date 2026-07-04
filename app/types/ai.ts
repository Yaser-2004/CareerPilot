import { StudentProfile } from "./profile";
import { PlannerAction } from "./planner";

export type AIIntent =
    | "flow"
    | "faq"
    | "compare"
    | "recommendation"
    | "lead_capture"
    | "small_talk"
    | "unknown";

export interface ExtractedProfile {
    profile: Partial<StudentProfile>;

    confidence: number;
}

export interface IntentDetectionResult {
    intent: AIIntent;

    confidence: number;
}

export interface AIContext {
    profile: StudentProfile;

    currentAction: PlannerAction;

    conversationHistory: {
        role: "user" | "assistant";
        content: string;
    }[];
}

export interface AIResponse {
    message: string;

    suggestions?: string[];

    extractedProfile?: Partial<StudentProfile>;
}