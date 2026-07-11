import { FlowStep } from "@/app/types/conversation";
import { groqJSON } from "@/lib/groqRequest";
import { MBA_FLOW } from "@/app/data/mbaFlow";
import {
    validateEmail,
    validateName,
    validatePhone,
} from "./validation.service";
import { matchOption } from "./optionMatcher.service";
import { resolveOption } from "./optionResolver.service";
import { QUALIFICATION_SPECIALIZATIONS } from "@/app/data/qualificationSpecializations";
import { Conversation } from "openai/resources/conversations.js";
import { StudentProfile } from "../types/profile";
import { Programme } from "../types/programme";

export type Intent =
    | "flow"
    | "faq"
    | "programme"
    | "programme_data"
    | "greeting"
    | "restart"
    | "smalltalk"
    | "unknown"
    | "conversation_end";

export interface RouterResponse {
    intent: Intent;
    normalizedValue?: string;
}

const ROUTER_PROMPT = `
You are an intent classifier.

Your job is ONLY to classify the user's latest message.

Possible intents:

flow
The user is answering the current onboarding question.

faq
The user is asking ANY question instead of answering the current onboarding question.

Examples:
"Which university is better?"
"What do you recommend?"
"Is LPU good?"
"What are the fees?"
"What is UGC?"

All of these are faq.

programme
The user selected one of the recommended programmes.

greeting
The user is greeting like Hi, Hello, Hey, etc.

restart
The user wants to start over.

smalltalk
Thanks, Okay, Cool, Nice, Bye, Great, etc.

unknown
Anything else.

Return ONLY JSON.

Example:

{
    "intent":"faq"
}
`;

const UNKNOWN_WORDS = [
    "fake",
    "scam",
    "fraud",
    "cheat",
    "fake university",
    "spam",
    "worst",
    "useless",
    "idiot",
    "stupid",
    "shut up",
    "hmm",
    "xyz",
    "123",
    "cake",
    "pizza",
    "abc",
    "nothing",
    "asdf",
    "test",
    "hahaha",
];

const FAQ_WORDS = [
    "vacancy",
    "hiring",
    "resume",
    "cv",
    "internship",
    "placement",
    "work from home",
    "location",
    "address",
    "office",
    "fee",
    "fees",
    "cost",
    "price",
    "eligibility",
    "package",
    "admission",
    "admissions",
    "duration",
    "semester",
    "exam",
    "university",
    "college",
    "approval",
    "ugc",
    "aicte",
    "naac",
    "emi",
    "loan",
    "scholarship",
    "attendance",
    "online mba",
    "hostel",
    "ranking",
    "job",
    "curriculum",
    "syllabus",
    "assignment",
    "project",
    "elective",
    "recognition",
    "accreditation",
];

export async function detectIntent(
    message: string,
    currentStep: FlowStep,
    profile: StudentProfile,
    recommendations: Programme[]
): Promise<RouterResponse> {

    const text = message.trim();

    const lower = text.toLowerCase();

    const END_WORDS = [
        "ok",
        "okay",
        "done",
        "that's all",
        "that is all",
        "no more questions",
        "nothing else",
        "no thanks",
        "thank you",
        "thanks",
        "bye",
        "goodbye",
    ];

    if (
        END_WORDS.some(word => lower.includes(word))
    ) {
        return {
            intent: "conversation_end",
        };
    }

    const node = MBA_FLOW[currentStep];

    if (UNKNOWN_WORDS.some(word => text.toLowerCase().includes(word))) {
        return {
            intent: "unknown",
        };
    }

    if (FAQ_WORDS.some(word => text.toLowerCase().includes(word)) || text.includes("?")) {
        const lowerText = text.toLowerCase();
        const hasUniversityContext = lowerText.includes("lpu") || lowerText.includes("manipal") || lowerText.includes("amity") || lowerText.includes("uttaranchal") || /\buu\b/.test(lowerText);

        if (profile.chosenProgrammeId || hasUniversityContext) {
            return {
                intent: "programme_data",
            };
        }
        return {
            intent: "faq",
        };
    }

    if (/\b(hi|hello|hey)\b/i.test(text)) {
        return {
            intent: "greeting",
        };
    }

    if (currentStep === "name" || currentStep === "welcome") {
        if (validateName(text) === null) {
            return {
                intent: "flow",
                normalizedValue: text.trim(),
            };
        }
    }

    if (currentStep === "phone") {
        if (validatePhone(text) === null) {
            return {
                intent: "flow",
                normalizedValue: text.replace(/\D/g, ""),
            };
        }
    }

    if (currentStep === "email") {
        if (validateEmail(text) === null) {
            return {
                intent: "flow",
                normalizedValue: text.trim().toLowerCase(),
            };
        }
    }

    if (currentStep === "recommendations") {
        const matched = recommendations.find(
            p =>
                p.id === text ||
                p.university.toLowerCase() === text.toLowerCase() ||
                p.programmeName.toLowerCase() === text.toLowerCase()
        );

        if (matched) {
            return {
                intent: "flow",
                normalizedValue: matched.id,
            };
        }

        return {
            intent: "faq",
        };
    }

    if (node.inputType === "chips") {

        let options = node.options ?? [];

        if (currentStep === "specialization") {

            const noSpecializationWords = [
                "no specialization",
                "no specialisation",
                "none",
                "na",
                "n/a",
                "not applicable",
                "dont have",
                "don't have",
                "no specific specialization",
            ];

            const normalized = text
                .toLowerCase()
                .trim();

            if (
                noSpecializationWords.some(word =>
                    normalized.includes(word)
                )
            ) {
                return {
                    intent: "flow",
                    normalizedValue: "None",
                };
            }


            options =
                QUALIFICATION_SPECIALIZATIONS[
                profile.qualification ?? ""
                ] ?? [];
        }


        const matched = matchOption(text, options);

        if (matched) {
            return {
                intent: "flow",
                normalizedValue: matched.value,
            };
        }
    }



    const result =
        await groqJSON(`
        ${ROUTER_PROMPT}

        Current Step:
        ${currentStep}

        User:
        "${message}"
    `);

    if (
        result.intent === "flow" &&
        node.inputType === "chips"
    ) {
        let options = node.options ?? [];

        if (currentStep === "specialization") {
            options =
                QUALIFICATION_SPECIALIZATIONS[
                profile.qualification ?? ""
                ] ?? [];
        }

        const resolved = await resolveOption(
            text,
            options
        );

        if (!resolved) {
            return {
                intent: "unknown",
            };
        }

        return {
            intent: "flow",
            normalizedValue: resolved.value,
        };
    }

    return {
        intent: (result as RouterResponse).intent,
    };
}