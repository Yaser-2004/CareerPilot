export function formatReply(reply: string) {
    return reply
        // Blank line after sentence before a question
        .replace(/\.\s+(?=[A-Z].*\?)/g, ".\n\n")

        // Blank line before "By the way"
        .replace(/\. (By the way)/g, ".\n\n$1")

        // Blank line before "To help"
        .replace(/\. (To help)/g, ".\n\n$1")

        // Blank line before "Now"
        .replace(/\. (Now)/g, ".\n\n$1")
}