import { groq, CHAT_MODEL } from "@/lib/groq";
import { FlowStep } from "@/app/types/conversation";
import { Programme } from "@/app/types/programme";
import { programmes } from "@/constants/programmes";

const SYSTEM_PROMPT = `
You are CareerPilot AI.

You are helping students choose an Online MBA.

The user is currently going through an admission flow.

Answer ONLY questions related to:

- Online MBA
- Universities
- Fees
- Eligibility
- UGC
- NAAC
- Placement
- EMI
- Admission
- Duration
- Specializations

Rules:

- Be concise.
- Maximum 120 words.
- Never invent information.
- End Naturally.

Examples:

User:
Is LPU UGC approved?

Assistant:
Yes. LPU Online is UGC Entitled and NAAC A++ accredited.

---

User:
Is EMI available?

Assistant:
Yes. Most partner universities provide EMI options depending on the programme.
`;

export async function streamFaqResponse(
    question: string,
    currentStep: FlowStep,
    currentQuestion: string,
    summary: string,
    recommendations: Programme[],
    programmeData?: Record<string, any>
) {
    let contextAddition = "";
    if (programmeData) {
        contextAddition = `
Target Programme Data:
${JSON.stringify(programmeData, null, 2)}

IMPORTANT RULE: Answer ONLY based on the 'Target Programme Data' provided above.
`;
    } else {
        const available = recommendations.length > 0 ? recommendations : programmes;
        const recommendedTiers = available.map((r: Programme) => `${r.university} (${r.programmeName})`).join(", ") || "None available yet.";
        contextAddition = `
Available Programmes:
${recommendedTiers}

IMPORTANT RULE: You MUST limit your suggestions and answers strictly to the available programmes listed above, current step, and profile context. If the user asks for a recommendation, only suggest from the 'Available Programmes'.
`;
    }

    return groq.chat.completions.create({
        model: CHAT_MODEL,

        stream: true,

        temperature: 0.4,

        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },
            {
                role: "system",
                content: `
Student Context:

${summary}
${contextAddition}
        `,
            },
            {
                role: "system",
                content: `
Current Question:
${currentQuestion}
        `,
            },
            {
                role: "user",
                content: question,
            },
        ],
    });
}