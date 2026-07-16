import { StudentProfile } from "./profile";
import { Programme } from "./programme";
import { FlowStep } from "./conversation";
import { FeeBreakdown } from "../services/fees.service";

export type MessageRole = "assistant" | "user";

export interface ChatSuggestion {
    id: string;

    label: string;

    value: string;
}

export interface ScheduleDay {
    date: string;
    slots: string[];
}

export interface ChatMessage {
    id: string;

    role: MessageRole;

    content: string;

    timestamp: number;

    suggestions?: ChatSuggestion[];

    type?:
    | "text"
    | "fees"
    | "recommendations"
    | "next_actions"
    | "schedule_date"
    | "schedule_time"
    | "callback_slots"
    | "ask_another_question";

    scheduleSlots?: ScheduleDay[];
}

export interface ConversationState {
    messages: ChatMessage[];

    profile: StudentProfile;

    phase: FlowStep;

    recommendations: Programme[];

    currentSuggestions: ChatSuggestion[];

    feeBreakdown: FeeBreakdown | null;

    applyUrl: string | null;

    hasShownRecommendations: boolean;

    isTyping: boolean;

    isCompleted: boolean;

    summary: string;

    chatMode: "flow" | "faq" | "completed";

    isInputLocked: boolean;

    selectedCounsellingDate?: {
        date: string;
        iso: string;
    };

    isInfoSheetOpen: boolean;
    infoSheetSection: "profile" | "recommendations" | "fees";
}