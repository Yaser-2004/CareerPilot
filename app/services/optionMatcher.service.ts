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

    // Exact match
    const exact = options.find(
        (option) =>
            normalize(option.value) === value ||
            normalize(option.label) === value
    );

    if (exact) return exact;

    // Partial match
    const partial = options.find((option) => {
        const optionValue = normalize(option.value);
        const optionLabel = normalize(option.label);

        return (
            optionValue.includes(value) ||
            value.includes(optionValue) ||
            optionLabel.includes(value) ||
            value.includes(optionLabel)
        );
    });

    return partial ?? null;
}