import { groq, CHAT_MODEL } from "./groq";
const EXTRACTION_MODEL = "llama-3.1-8b-instant";

export async function groqJSON(prompt: string) {
    const response =
        await groq.chat.completions.create({
            model: EXTRACTION_MODEL,

            temperature: 0,

            response_format: {
                type: "json_object",
            },

            messages: [
                {
                    role: "system",
                    content:
                        "Return ONLY valid JSON. Never use markdown. Never explain.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

    return JSON.parse(
        response.choices[0].message.content!
    );
}

export async function groqText(prompt: string) {
    const response =
        await groq.chat.completions.create({
            model: CHAT_MODEL,

            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

    return response.choices[0].message.content!;
}