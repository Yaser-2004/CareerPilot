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

    const available =
        recommendations.length > 0
            ? recommendations
            : programmes;


    const comparisonData = available.map((p) => ({
        university: p.university,
        programmeName: p.programmeName,

        fees: {
            total: p.fees.total,
            feesRange: p.fees.feesRange,
            emiPerMonth: p.fees.emiPerMonth,
            emiAvailable: p.fees.emiAvailable,
            paymentOptions: p.fees.paymentOptions,
            scholarships: p.fees.hasScholarships,
        },

        duration: p.duration,

        naacGrade: p.naacGrade,

        approvals: p.approvals,

        specializations: p.specializations,

        placementSupport: p.placementSupport,

        careerOutcomes: p.careerOutcomes,

        placements: p.placements?.typicalRecruiters,
    }));


    let contextAddition = `

Programme Comparison Data:

${JSON.stringify(comparisonData, null, 2)}

`;


    if (programmeData) {

        contextAddition += `

Selected Programme (Give priority to this):

${JSON.stringify(programmeData, null, 2)}

IMPORTANT:
The student has selected this programme.
Answer from this programme first.
Use comparison data only when the question requires comparison.

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