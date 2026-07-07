import { ChatSuggestion } from "./chat";
import { StudentProfile } from "./profile";
import { Programme } from "./programme";

export type FlowStep =
    | "welcome"
    | "name"
    | "qualification"
    | "specialization"
    | "experience"
    | "phone"
    | "goal"
    | "budget"
    | "email"
    | "recommendations"
    | "programme"
    | "fees"
    | "completed"
    | "schedule_date"
    | "schedule_time"
    | "callback_time";

export type InputType =
    | "text"
    | "email"
    | "phone"
    | "chips";

export interface FlowOption {
    id: string;
    label: string;
    value: string;
}

export interface FlowNode {
    step: FlowStep;

    message?: string;
    messages?: string[];

    inputType: InputType;

    profileField?: keyof StudentProfile;

    icon?: "whatsapp" | "mail";

    placeholder?: string;

    helperText?: string;

    options?: FlowOption[];

    next:
    | FlowStep
    | ((profile: StudentProfile) => FlowStep);
}

export interface FlowResult {
    replies: string[];

    nextStep: FlowStep;

    profileUpdates: Partial<StudentProfile>;

    suggestions?: ChatSuggestion[];

    recommendations?: Programme[];

    completed: boolean;
}