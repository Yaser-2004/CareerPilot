import { groq, CHAT_MODEL } from "@/lib/groq";
import { FlowStep } from "@/app/types/conversation";

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
) {
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