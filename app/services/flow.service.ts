import { MBA_FLOW } from "@/app/data/mbaFlow";

import {
    FlowNode,
    FlowResult,
    FlowStep,
} from "@/app/types/conversation";

import { StudentProfile } from "@/app/types/profile";
import { parseProfileUpdate } from "./profileParser.service";
import {
    validateName,
    validateEmail,
    validatePhone,
} from "./validation.service";
import { QUALIFICATION_SPECIALIZATIONS } from "@/app/data/qualificationSpecializations";
import { ChatSuggestion } from "@/app/types/chat";

interface HandleStepParams {
    currentStep: FlowStep;
    message: string;
    profile: StudentProfile;
}

export function interpolate(
    text: string,
    profile: StudentProfile
) {
    return text.replace(
        /\{\{(.*?)\}\}/g,
        (_, key) =>
            String(
                profile[key as keyof StudentProfile] ?? ""
            )
    );
}

export async function handleFlowStep({
    currentStep,
    message,
    profile,
}: HandleStepParams): Promise<FlowResult> {
    const node = MBA_FLOW[currentStep];

    if (!node) {
        throw new Error(
            `Unknown flow step: ${currentStep}`
        );
    }

    // ---------- Validation ----------
    let validationError: string | null = null;

    switch (currentStep) {
        case "name":
            validationError = validateName(message);
            break;

        case "phone":
            validationError = validatePhone(message);
            break;

        case "email":
            validationError = validateEmail(message);
            break;
    }

    if (validationError) {
        return {
            replies: [validationError],

            nextStep: currentStep,

            profileUpdates: {},

            completed: false,

            recommendations: [],

            suggestions:
                node.inputType === "chips"
                    ? node.options ?? []
                    : [],
        };
    }

    // Save current answer
    const profileUpdates = parseProfileUpdate(currentStep, message);

    const updatedProfile = {
        ...profile,
        ...profileUpdates,
    };

    // Determine next step
    const nextStep =
        typeof node.next === "function"
            ? node.next(updatedProfile)
            : node.next;

    const nextNode = MBA_FLOW[nextStep];

    // Recommendation screen handled later
    if (!nextNode) {
        return {
            replies: [],

            nextStep,

            profileUpdates,

            completed: false,

            recommendations: [],

            suggestions: [],
        };
    }

    let suggestions: ChatSuggestion[] = [];

    if (nextStep === "specialization") {
        suggestions =
            QUALIFICATION_SPECIALIZATIONS[
            updatedProfile.qualification!
            ] ?? [];
    } else if (nextNode.inputType === "chips") {
        suggestions = nextNode.options ?? [];
    }

    const replies = (nextNode.messages ?? [nextNode.message!]).map(msg =>
        interpolate(msg, updatedProfile)
    );

    return {
        replies,

        nextStep,

        profileUpdates,

        completed: false,

        recommendations: [],

        suggestions,
    };
}