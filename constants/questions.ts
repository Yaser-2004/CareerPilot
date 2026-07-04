import { ChatQuestion } from "@/app/types/chat";

export const questions: ChatQuestion[] = [
    {
        id: "userType",

        field: "userType",

        question:
            "Hey 👋 Glad you're here! To help me recommend the right MBA, are you currently...",


        options: [
            {
                id: "student",
                label: "Still Studying",
                value: "student",
            },
            {
                id: "working",
                label: "Working Professional",
                value: "working_professional",
            },
            {
                id: "career",
                label: "Career Switch",
                value: "career_switcher",
            },
        ],
    },

    {
        id: "qualification",

        field: "qualification",

        question: "What's your highest qualification?",

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
                id: "bba",
                label: "BBA",
                value: "BBA",
            },
            {
                id: "bcom",
                label: "B.Com",
                value: "B.Com",
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
                id: "other",
                label: "Other",
                value: "Other",
            },
        ],
    },

    {
        id: "experience",

        field: "experience",

        question: "How many years of work experience do you have?",

        options: [
            {
                id: "fresher",
                label: "Fresher",
                value: "Fresher",
            },
            {
                id: "0-2",
                label: "0-2 Years",
                value: "0-2 Years",
            },
            {
                id: "2-5",
                label: "2-5 Years",
                value: "2-5 Years",
            },
            {
                id: "5plus",
                label: "5+ Years",
                value: "5+ Years",
            },
        ],
    },

    {
        id: "goal",

        field: "goal",

        question: "What's your primary goal after pursuing an MBA?",

        options: [
            {
                id: "growth",
                label: "Career Growth",
                value: "Career Growth",
            },
            {
                id: "salary",
                label: "Higher Salary",
                value: "Higher Salary",
            },
            {
                id: "leadership",
                label: "Leadership",
                value: "Leadership",
            },
            {
                id: "switch",
                label: "Career Switch",
                value: "Career Switch",
            },
            {
                id: "business",
                label: "Start Business",
                value: "Start Business",
            },
            {
                id: "upskill",
                label: "Upskill",
                value: "Upskill",
            },
        ],
    },

    {
        id: "budget",

        field: "budget",

        question: "What's your expected budget for an MBA?",

        options: [
            {
                id: "1",
                label: "Under ₹1L",
                value: "Under ₹1L",
            },
            {
                id: "2",
                label: "₹1L - ₹1.5L",
                value: "₹1L - ₹1.5L",
            },
            {
                id: "3",
                label: "₹1.5L - ₹2L",
                value: "₹1.5L - ₹2L",
            },
            {
                id: "4",
                label: "Flexible",
                value: "Flexible",
            },
        ],
    },

    {
        id: "specialization",

        field: "preferredSpecialization",

        question: "Which MBA specialization interests you the most?",

        options: [
            {
                id: "ds",
                label: "Data Science",
                value: "Data Science",
            },
            {
                id: "ba",
                label: "Business Analytics",
                value: "Business Analytics",
            },
            {
                id: "ops",
                label: "Operations",
                value: "Operations Management",
            },
            {
                id: "it",
                label: "Information Technology",
                value: "Information Technology",
            },
            {
                id: "notsure",
                label: "Not Sure Yet",
                value: "Not Sure",
            },
        ],
    },
];