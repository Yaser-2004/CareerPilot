import { handleFlowStep } from "./flow.service";
import { recommendProgrammes } from "./recommendation.service";
import { saveLead, updateChosenProgramme } from "./lead.service";
import { selectProgramme } from "./programme.service";
import { getFeeBreakdown } from "./fees.service";

import { ChatSuggestion, ConversationState } from "@/app/types/chat";
import { FlowStep } from "@/app/types/conversation";

import { FeeBreakdown } from "./fees.service";
import { Programme } from "../types/programme";
import { RouterResponse } from "./router.service";
import { StudentProfile } from "../types/profile";

interface HandleChatResult {
    replies: string[];

    profileUpdates: Record<string, any>;

    nextStep: FlowStep;

    phase: FlowStep;

    suggestions: ChatSuggestion[];

    recommendations: Programme[];

    feeBreakdown: FeeBreakdown | null;

    applyUrl: string | null;

    completed: boolean;

    lockInput?: boolean;
}

function looksLikeFaq(message: string) {
    const text = message.toLowerCase();

    return (
        text.includes("?") ||
        text.includes("fee") ||
        text.includes("fees") ||
        text.includes("placement") ||
        text.includes("salary") ||
        text.includes("duration") ||
        text.includes("ugc") ||
        text.includes("naac") ||
        text.includes("university") ||
        text.includes("college") ||
        text.includes("admission") ||
        text.includes("emi")
    );
}

export async function handleChat(
    message: string,
    conversation: ConversationState,
    normalizedValue?: string
): Promise<HandleChatResult> {

    const userAnswer = normalizedValue ?? message;

    // ---------- Programme Selected ----------
    if (conversation.phase === "recommendations") {

        const selected = selectProgramme(
            userAnswer,
            conversation.recommendations
        );

        if (selected) {
            // const profileUpdates = {
            //     chosenProgramme: selected.programme.university,
            // };

            const profileUpdates: Partial<StudentProfile> = {
                chosenProgramme: selected.programme.university,
                chosenProgrammeId: selected.programme.id,
            };

            const updatedProfile = {
                ...conversation.profile,
                ...profileUpdates,
            };

            let leadId = conversation.profile.crmLeadId;

            leadId = await saveLead(updatedProfile);

            if (leadId) {
                profileUpdates.crmLeadId = leadId;
            }

            const feeBreakdown = getFeeBreakdown(
                selected.programme
            );

            return {
                replies: [
                    "Excellent choice! Here's the complete fee structure for your selected programme.",
                ],

                profileUpdates,

                nextStep: "fees",

                phase: "fees",

                suggestions: [],

                recommendations: conversation.recommendations,

                feeBreakdown,

                applyUrl: selected.applyUrl,

                completed: false,
            };
        }
    }

    const currentStep =
        (conversation.phase as FlowStep) ||
        "welcome";

    // ---------- FLOW ----------
    const flow = await handleFlowStep({
        currentStep,

        message: userAnswer,

        profile: conversation.profile,
    });

    const updatedProfile = {
        ...conversation.profile,
        ...flow.profileUpdates,
    };

    let recommendations = conversation.recommendations;

    let feeBreakdown = conversation.feeBreakdown ?? null;

    let applyUrl: string | null = conversation.applyUrl ?? null;

    // ---------- Recommendation Step ----------
    if (flow.nextStep === "recommendations") {
        recommendations =
            await recommendProgrammes(updatedProfile);
    }

    // ---------- Save Lead ----------
    const completed =
        flow.nextStep === "recommendations";

    // if (completed) {
    //     const crmLeadId = await saveLead(updatedProfile);

    //     flow.profileUpdates.crmLeadId = crmLeadId;
    // }

    return {
        replies: flow.replies,

        profileUpdates: flow.profileUpdates,

        nextStep: flow.nextStep,

        phase: flow.nextStep,

        suggestions: flow.suggestions ?? [],

        recommendations,

        feeBreakdown,

        applyUrl,

        completed,
    };
}