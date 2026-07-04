import { FlowNode } from "@/app/types/conversation";

export const MBA_FLOW: Record<string, FlowNode> = {
    welcome: {
        step: "welcome",

        message: "Before we start, what should I call you?",

        inputType: "text",

        profileField: "name",

        next: "qualification",
    },

    qualification: {
        step: "qualification",

        message: `Nice to meet you, {{name}} 👋

Let's understand your profile first. I'll personalize your recommendations.
What's your highest qualification?`,

        inputType: "chips",

        profileField: "qualification",

        options: [
            {
                id: "btech",
                label: "B.Tech",
                value: "B.Tech",
            },
            {
                id: "bca",
                label: "BCA",
                value: "BCA",
            },
            {
                id: "bcom",
                label: "B.Com",
                value: "B.Com",
            },
            {
                id: "bba",
                label: "BBA",
                value: "BBA",
            },
            {
                id: "ba",
                label: "BA",
                value: "BA",
            },
            {
                id: "bsc",
                label: "B.Sc",
                value: "B.Sc",
            },
            {
                id: "diploma",
                label: "Diploma",
                value: "Diploma",
            },
            {
                id: "other",
                label: "Other",
                value: "Other",
            },
        ],

        next: () => "specialization",
    },

    specialization: {
        step: "specialization",

        message: `Which specialization did you complete?`,

        inputType: "chips",

        profileField: "specialization",

        options: [],

        next: "goal",
    },

    goal: {
        step: "goal",

        message: `Why are you planning an Online MBA?`,

        inputType: "chips",

        profileField: "goal",

        options: [
            {
                id: "salary",
                label: "Higher Salary",
                value: "Higher Salary",
            },
            {
                id: "promotion",
                label: "Promotion",
                value: "Promotion",
            },
            {
                id: "career",
                label: "Career Change",
                value: "Career Change",
            },
            {
                id: "business",
                label: "Business",
                value: "Business",
            },
            {
                id: "leadership",
                label: "Leadership Role",
                value: "Leadership Role",
            },
            {
                id: "degree",
                label: "Degree",
                value: "Degree",
            },
            {
                id: "unsure",
                label: "Not Sure",
                value: "Not Sure",
            },
        ],

        next: "phone",
    },

    phone: {
        step: "phone",

        message: `Great, {{name}}! I'll save your progress so you don't lose your recommendations.

What's your WhatsApp number?`,

        inputType: "phone",

        profileField: "phone",

        icon: "whatsapp",

        placeholder: "Enter your WhatsApp number",

        helperText: "Used only for admission updates. We never spam.",

        next: "experience",
    },

    experience: {
        step: "experience",

        message: `Do you have any work experience?`,

        inputType: "chips",

        profileField: "experience",

        options: [
            {
                id: "0",
                label: "No Experience",
                value: "No Experience",
            },
            {
                id: "1",
                label: "Less than 1 Year",
                value: "Less than 1 Year",
            },
            {
                id: "2",
                label: "1–3 Years",
                value: "1–3 Years",
            },
            {
                id: "3",
                label: "3–5 Years",
                value: "3–5 Years",
            },
            {
                id: "4",
                label: "5+ Years",
                value: "5+ Years",
            },
        ],

        next: "budget",
    },

    budget: {
        step: "budget",

        message: `What is your Estimated Budget?`,

        inputType: "chips",

        profileField: "budget",

        options: [
            {
                id: "1",
                label: "Below ₹1L",
                value: "Below ₹1L",
            },
            {
                id: "2",
                label: "₹1-1.5L",
                value: "₹1-1.5L",
            },
            {
                id: "3",
                label: "₹1.5-2L",
                value: "₹1.5-2L",
            },
            {
                id: "4",
                label: "Above ₹2L",
                value: "Above ₹2L",
            },
            {
                id: "5",
                label: "Need EMI",
                value: "Need EMI",
            },
        ],

        next: "email",
    },

    email: {
        step: "email",

        message: `One last detail before I prepare your recommendations.

What's your email address?`,

        inputType: "email",

        profileField: "email",

        icon: "mail",

        placeholder: "Enter your email address",

        helperText: "We'll send your shortlisted programmes and admission details.",

        next: "recommendations",
    },

    recommendations: {
        step: "recommendations",
        message:
            "Based on your profile, I've shortlisted the best Online MBA programmes for you.\nChoose the one you'd like to explore further.",

        inputType: "chips",

        // Filled dynamically from backend
        options: [],

        next: "programme",
    },

    programme: {
        step: "programme",
        message:
            "Excellent choice! Here's the complete fee structure for your selected programme.",

        inputType: "chips",

        // Will become:
        // View Fee Breakdown
        options: [],

        next: "fees",
    },

    fees: {
        step: "fees",
        message:
            "You're all set! Click below to visit the programme page and continue your admission process.",

        inputType: "chips",

        // Apply Now
        options: [],

        next: "completed",
    },

    completed: {
        step: "completed",
        message: "Your application is complete. Feel free to ask any other questions!",
        inputType: "text",
        options: [],
        next: "completed",
    }
};