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
    | "greeting"
    | "restart"
    | "smalltalk"
    | "unknown";

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

const BUZZ_WORDS = [
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
    "vacancy",
    "hiring",
    "salary",
    "resume",
    "cv",
    "internship",
    "placement",
    "work from home",
    "hmm",
    "xyz",
    "123",
    "location",
    "address",
    "Office",
    "cake",
    "pizza",
    "hello",
    "abc",
    "xyz",
    "123",
    "nothing",
    "asdf",
    "test",
    "hahaha",
]

export async function detectIntent(
    message: string,
    currentStep: FlowStep,
    profile: StudentProfile,
    recommendations: Programme[]
): Promise<RouterResponse> {

    const text = message.trim();

    const node = MBA_FLOW[currentStep];

    if (BUZZ_WORDS.some(word => text.toLowerCase().includes(word))) {
        return {
            intent: "unknown",
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
            options =
                QUALIFICATION_SPECIALIZATIONS[
                profile.qualification ?? ""
                ] ?? [];
        }

        // Exact match
        const matched = matchOption(text, options);

        if (matched) {
            return {
                intent: "flow",
                normalizedValue: matched.value,
            };
        }
    }

    const lower = text.toLowerCase();

    const faqKeywords = [
        "fee",
        "fees",
        "cost",
        "price",
        "eligibility",
        "placement",
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
        "internship",
        "curriculum",
        "syllabus",
        "assignment",
        "project",
        "elective",
        "specialization",
        "recognition",
        "accreditation",
    ];

    if (faqKeywords.some(word => lower.includes(word))) {
        return {
            intent: "faq",
        };
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