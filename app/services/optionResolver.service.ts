import { ChatSuggestion } from "@/app/types/chat";
import { groqJSON, groqJSON70 } from "@/lib/groqRequest";

interface ResolveResponse {
    matched: boolean;
    value?: string;
}

export async function resolveOption(
    userInput: string,
    options: ChatSuggestion[]
): Promise<ChatSuggestion | null> {

    const result = await groqJSON70(`
You are an option selection assistant.

Your task is to map the user's message to EXACTLY ONE of the available options.

Available options:

${options.map(o => `- ${o.value}`).join("\n")}

User input:
"${userInput}"

IMPORTANT:

The available options are categories (buckets), not exact phrases.

The user does NOT have to use the same wording.

Always understand the user's intent first, then choose the option that best represents it.

Guidelines:

- Return ONLY one of the available option values.
- Never invent a new value.
- Consider the full meaning of the sentence.
- Numbers are more important than matching words.
- If the user expresses a maximum ("below", "under", "up to", "maximum"), choose the highest bucket that does NOT exceed that limit.
- If the user expresses a minimum ("above", "more than", "greater than"), choose the bucket that starts from or exceeds that limit.
- If the user clearly refers to one category, return matched=true.
- Only return matched=false if the message is unrelated or impossible to classify.

Examples:

Available options:
- Below ₹1L
- ₹1-1.5L
- ₹1.5-2L
- Above ₹2L
- Need EMI

User: below 2L
Response:
{
  "matched": true,
  "value": "₹1.5-2L"
}

User: under 2 lakh
Response:
{
  "matched": true,
  "value": "₹1.5-2L"
}

User: maximum 2 lakh
Response:
{
  "matched": true,
  "value": "₹1.5-2L"
}

User: up to 2L
Response:
{
  "matched": true,
  "value": "₹1.5-2L"
}

User: around 1.8 lakh
Response:
{
  "matched": true,
  "value": "₹1.5-2L"
}

User: I need EMI
Response:
{
  "matched": true,
  "value": "Need EMI"
}

User: pizza
Response:
{
  "matched": false
}

Return ONLY valid JSON.

Example:

{
  "matched": true,
  "value": "₹1.5-2L"
}

or

{
  "matched": false
}
`);

    const response = result as ResolveResponse;

    if (!response.matched) {
        return null;
    }

    return (
        options.find(option => option.value === response.value) ?? null
    );
}