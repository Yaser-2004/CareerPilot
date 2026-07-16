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
    value?: string;
}

const ROUTER_PROMPT = `
You are an intent router for an Online MBA admission assistant.

Your job is to classify the user's latest message.

If the user is answering the current onboarding question,
normalize the answer into ONE of the allowed options.

Return ONLY valid JSON.

Possible intents:

flow
faq
programme
programme_data
greeting
restart
smalltalk
conversation_end
unknown

Rules:

1. If the user is answering the current onboarding question,
return

{
  "intent":"flow",
  "value":"<normalized option>"
}

2. value MUST be EXACTLY one of the allowed options.

3. Never invent a new option.

4. If the user asks a question instead of answering,
return faq.

5. Greetings:
hi
hello
hey

→ greeting

6. Smalltalk:

thanks
okay
cool
great
nice

→ smalltalk

7. IMPORTANT: conversation_end is ONLY allowed when canEndConversation is true.
If canEndConversation is false, NEVER return conversation_end.
Instead, if the user says bye/done/thanks, return smalltalk.

8. If the user clearly ends the conversation AND canEndConversation is true:

bye
that's all
no more questions
nothing else
i'm done
all good

→ conversation_end

9. If you cannot confidently map the user's answer to one of the allowed options,

return

{
   "intent":"unknown"
}

10. If the current step expects name,
extract only the actual value.

Examples:

"My name is Rahul"
→ Rahul

"Call me Aman"
→ Aman

11. When mapping to an allowed option:

- Match the COMPLETE meaning of the user's message, not individual words.
- Never match based on a single shared word.
- Prefer semantic meaning over spelling similarity.
- "Bachelor in Technology", "Bachelor of Technology", "Engineering", "BTech", "B.E.", "BE", "Bachelor of Engineering" all mean "B.Tech".
- "Bachelor of Arts" means "BA".
- "Bachelor of Business Administration" means "BBA".
- "Bachelor of Commerce" means "B.Com".
- "Bachelor of Computer Applications" means "BCA".
- If you are not highly confident, return intent="unknown".
`;

// const UNKNOWN_WORDS = [
//     "fake",
//     "scam",
//     "fraud",
//     "cheat",
//     "fake university",
//     "spam",
//     "worst",
//     "useless",
//     "idiot",
//     "stupid",
//     "shut up",
//     "hmm",
//     "xyz",
//     "123",
//     "cake",
//     "pizza",
//     "abc",
//     "nothing",
//     "asdf",
//     "test",
//     "hahaha",
// ];

// const FAQ_WORDS = [
//     "vacancy",
//     "hiring",
//     "resume",
//     "cv",
//     "internship",
//     "placement",
//     "work from home",
//     "location",
//     "address",
//     "office",
//     "fee",
//     "fees",
//     "cost",
//     "price",
//     "eligibility",
//     "package",
//     "admission",
//     "admissions",
//     "duration",
//     "semester",
//     "exam",
//     "university",
//     "college",
//     "approval",
//     "ugc",
//     "aicte",
//     "naac",
//     "emi",
//     "loan",
//     "scholarship",
//     "attendance",
//     "online mba",
//     "hostel",
//     "ranking",
//     "job",
//     "curriculum",
//     "syllabus",
//     "assignment",
//     "project",
//     "elective",
//     "recognition",
//     "accreditation",
// ];

// Steps after which conversation can be ended
const ENDABLE_PHASES: FlowStep[] = ["fees", "completed"];

export async function detectIntent(
    message: string,
    currentStep: FlowStep,
    profile: StudentProfile,
    recommendations: Programme[]
): Promise<RouterResponse> {

    if (currentStep === "completed") {

        const result = await groqJSON(`
You are classifying messages after the admission flow has ended.

Possible intents:

faq
smalltalk
conversation_end

Rules:

- Questions about Online MBA → faq
- Greetings / thanks / okay → smalltalk
- "bye"
- "no"
- "no thanks"
- "nothing"
- "nothing else"
- "that's all"
- "i'm done"
- "no more questions"
- "all good"
- "goodbye"

→ conversation_end

Return ONLY JSON.
User:
"${message}"
`);

        return result;
    }

    const text = message.trim();

    const canEndConversation = ENDABLE_PHASES.includes(currentStep);

    const node = MBA_FLOW[currentStep];

    // if (UNKNOWN_WORDS.some(word => text.toLowerCase().includes(word))) {
    //     return {
    //         intent: "unknown",
    //     };
    // }

    // if (FAQ_WORDS.some(word => text.toLowerCase().includes(word)) || text.includes("?")) {
    //     const lowerText = text.toLowerCase();
    //     const hasUniversityContext = lowerText.includes("lpu") || lowerText.includes("manipal") || lowerText.includes("amity") || lowerText.includes("uttaranchal") || /\buu\b/.test(lowerText);

    //     if (profile.chosenProgrammeId || hasUniversityContext) {
    //         return {
    //             intent: "programme_data",
    //         };
    //     }
    //     return {
    //         intent: "faq",
    //     };
    // }

    // if (/\b(hi|hello|hey)\b/i.test(text)) {
    //     return {
    //         intent: "greeting",
    //     };
    // }

    if (currentStep === "phone") {
        if (validatePhone(text) === null) {
            return {
                intent: "flow",
                value: text.replace(/\D/g, ""),
            };
        }
    }

    if (currentStep === "email") {
        if (validateEmail(text) === null) {
            return {
                intent: "flow",
                value: text.trim().toLowerCase(),
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
                value: matched.id,
            };
        }

        // Only route as FAQ if it actually looks like a question
        if (text.includes("?")) {
            return {
                intent: "faq",
            };
        }

        // Otherwise fall through to AI router for proper classification
        // (e.g. "ok bye" → smalltalk, not a farewell FAQ response)
    }

    if (node.inputType === "chips") {

        let options = node.options ?? [];

        if (currentStep === "specialization") {
            options =
                QUALIFICATION_SPECIALIZATIONS[
                profile.qualification ?? ""
                ] ?? [];

            // Deterministic check for "no specialization" type phrases
            const noSpecializationWords = [
                "no specialization",
                "no specialisation",
                "none",
                "na",
                "n/a",
                "not applicable",
                "dont have",
                "don't have",
                "don't know",
                "dont know",
                "no specific",
                "not sure",
                "no preference",
                "general",
                "no particular",
            ];

            const normalized = text.toLowerCase().trim();

            if (
                noSpecializationWords.some(word =>
                    normalized.includes(word)
                )
            ) {
                return {
                    intent: "flow",
                    value: "None",
                };
            }
        }

        // Step 1: Try exact text match (deterministic, no AI call)
        const matched = matchOption(text, options);

        if (matched) {
            return {
                intent: "flow",
                value: matched.value,
            };
        }

        // Step 2: Use 70B AI model to resolve free-text to an option
        const resolved = await resolveOption(text, options);

        if (resolved) {
            return {
                intent: "flow",
                value: resolved.value,
            };
        }
    }

    let allowedOptions: string[] = [];

    if (currentStep === "specialization") {
        allowedOptions =
            (
                QUALIFICATION_SPECIALIZATIONS[
                profile.qualification ?? ""
                ] ?? []
            ).map(o => o.value);
    }
    else {
        allowedOptions =
            (node.options ?? []).map(o => o.value);
    }

    const currentQuestion =
        node.messages?.join("\n") ??
        node.message ??
        "";

    const result = await groqJSON(`
        ${ROUTER_PROMPT}

        Current Step:
        ${currentStep}

        canEndConversation:
        ${canEndConversation}

        Current Question:
        ${currentQuestion}

        Allowed Options:
        ${allowedOptions.length ? allowedOptions.join("\n") : "Free Text"}

        Current Student Profile:
        ${JSON.stringify(profile, null, 2)}

        User Message:
        "${message}"

        Rules:

        - If the user is answering the onboarding question,
        normalize it into ONE allowed option.

        - value MUST exactly equal one allowed option.

        - Never invent a new option.

        - Use the student's profile whenever it helps interpret the answer.

        - If canEndConversation is false, NEVER return conversation_end intent. Return smalltalk instead.

        Return ONLY JSON.
    `);

    if (result.intent === "flow") {
        if (currentStep === "name" || currentStep === "welcome") {
            if (validateName(result.value!) !== null) {
                return {
                    intent: "unknown",
                }
            }
        }

        return {
            intent: "flow",
            value: result.value,
        };
    }

    return {
        intent: (result as RouterResponse).intent,
    };
}