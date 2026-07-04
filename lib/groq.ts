import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing.");
}

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const CHAT_MODEL =
    "llama-3.3-70b-versatile";

// Later you can switch to
// "openai/gpt-oss-120b"