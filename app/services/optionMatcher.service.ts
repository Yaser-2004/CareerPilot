import { ChatSuggestion } from "@/app/types/chat";

function normalize(text: string) {
    return text
        .toLowerCase()
        .replace(/[.\-_/]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function matchOption(
    input: string,
    options: ChatSuggestion[]
): ChatSuggestion | null {

    const value = normalize(input);

    return (
        options.find(
            option =>
                normalize(option.value) === value ||
                normalize(option.label) === value
        ) ?? null
    );
}