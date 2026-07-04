import { ChatSuggestion } from "@/app/types/chat";
import { groqJSON } from "@/lib/groqRequest";

interface ResolveResponse {
    matched: boolean;
    value?: string;
}

export async function resolveOption(
    userInput: string,
    options: ChatSuggestion[]
): Promise<ChatSuggestion | null> {

    const result = await groqJSON(`
You are matching a user's answer to ONE of the available options.

User answer:
"${userInput}"

Available options:

${options
            .map((o) => `- ${o.value}`)
            .join("\n")}

Rules:

- Return matched=true ONLY if the user's answer clearly refers to one of the available options.
- If the answer is unrelated, nonsense, random text, or ambiguous, return matched=false.
- Do NOT guess.
- Do NOT use spelling similarity alone.
- If confidence is below 95%, return matched=false.
- Examples:

User: "Computer"
→ Computer Science

User: "CSE"
→ Computer Science

User: "cs"
→ Computer Science

User: "book"
→ matched=false

User: "hello"
→ matched=false

User: "asdf"
→ matched=false

User: "pizza"
→ matched=false
`);

    const response =
        result as ResolveResponse;

    if (!response.matched)
        return null;

    return (
        options.find(
            (o) => o.value === response.value
        ) ?? null
    );
}