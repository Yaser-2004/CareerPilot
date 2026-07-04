import { ChatSuggestion } from "@/app/types/chat";

export const QUALIFICATION_SPECIALIZATIONS: Record<
    string,
    ChatSuggestion[]
> = {
    "B.Tech": [
        {
            id: "cse",
            label: "Computer Science",
            value: "Computer Science",
        },
        {
            id: "it",
            label: "IT",
            value: "IT",
        },
        {
            id: "ece",
            label: "ECE",
            value: "ECE",
        },
        {
            id: "eee",
            label: "EEE/EE",
            value: "EEE/EE",
        },
        {
            id: "mechanical",
            label: "Mechanical",
            value: "Mechanical",
        },
        {
            id: "civil",
            label: "Civil",
            value: "Civil",
        },
        {
            id: "aids",
            label: "AI & Data Science",
            value: "AI & Data Science",
        },
        {
            id: "other",
            label: "Other",
            value: "Other",
        },
    ],

    "BCA": [ //data science, ai, cyber security, cloud computing, software development, web development, other
        {
            id: "ds",
            label: "Data Science",
            value: "Data Science",
        },
        {
            id: "ai",
            label: "AI",
            value: "AI",
        },
        {
            id: "cs",
            label: "Cyber Security",
            value: "Cyber Security",
        },
        {
            id: "cc",
            label: "Cloud Computing",
            value: "Cloud Computing",
        },
        {
            id: "sd",
            label: "Software Development",
            value: "Software Development",
        },
        {
            id: "wd",
            label: "Web Development",
            value: "Web Development",
        },
        {
            id: "other",
            label: "Other",
            value: "Other",
        },
    ],

    "B.Com": [ //accounting, finance, banking, taxation, computer applications, e-commerce
        {
            id: "accounting",
            label: "Accounting",
            value: "Accounting",
        },
        {
            id: "finance",
            label: "Finance",
            value: "Finance",
        },
        {
            id: "banking",
            label: "Banking",
            value: "Banking",
        },
        {
            id: "taxation",
            label: "Taxation",
            value: "Taxation",
        },
        {
            id: "ca",
            label: "Computer Applications",
            value: "Computer Applications",
        },
        {
            id: "ec",
            label: "E-Commerce",
            value: "E-Commerce",
        },
        {
            id: "other",
            label: "Other",
            value: "Other",
        },
    ],
    "BBA": [ //marketing, finance, human resources, operations, international business, entrepreneurship, other
        {
            id: "marketing",
            label: "Marketing",
            value: "Marketing",
        },
        {
            id: "finance",
            label: "Finance",
            value: "Finance",
        },
        {
            id: "hr",
            label: "Human Resources",
            value: "Human Resources",
        },
        {
            id: "ba", //business analytics
            label: "Business Analytics",
            value: "Business Analytics",
        },
        {
            id: "dm",
            label: "Digital Marketing",
            value: "Digital Marketing",
        },
        {
            id: "ib",
            label: "International Business",
            value: "International Business",
        },
        {
            id: "other",
            label: "Other",
            value: "Other",
        },
    ],
    "BA": [ //english, economics, psychology, political science, sociology, history, other
        {
            id: "english",
            label: "English",
            value: "English",
        },
        {
            id: "economics",
            label: "Economics",
            value: "Economics",
        },
        {
            id: "psychology",
            label: "Psychology",
            value: "Psychology",
        },
        {
            id: "political_science",
            label: "Political Science",
            value: "Political Science",
        },
        {
            id: "sociology",
            label: "Sociology",
            value: "Sociology",
        },
        {
            id: "history",
            label: "History",
            value: "History",
        },
        {
            id: "geography",
            label: "Geography",
            value: "Geography",
        },
        {
            id: "other",
            label: "Other",
            value: "Other",
        },
    ],
    "B.Sc": [
        {
            id: "computer_science",
            label: "Computer Science",
            value: "Computer Science",
        },
        {
            id: "information_technology",
            label: "Information Technology",
            value: "Information Technology",
        },
        {
            id: "physics",
            label: "Physics",
            value: "Physics",
        },
        {
            id: "chemistry",
            label: "Chemistry",
            value: "Chemistry",
        },
        {
            id: "mathematics",
            label: "Mathematics",
            value: "Mathematics",
        },
        {
            id: "biology",
            label: "Biology",
            value: "Biology",
        },
        {
            id: "biotechnology",
            label: "Biotechnology",
            value: "Biotechnology",
        },
        {
            id: "other",
            label: "Other",
            value: "Other",
        },
    ],
    "Diploma": [
        {
            id: "Computer",
            label: "Computer",
            value: "Computer",
        },
        {
            id: "Mechanical",
            label: "Mechanical",
            value: "Mechanical",
        },
        {
            id: "Civil",
            label: "Civil",
            value: "Civil",
        },
        {
            id: "Electronics",
            label: "Electronics",
            value: "Electronics",
        },
        {
            id: "Electrical",
            label: "Electrical",
            value: "Electrical",
        },
        {
            id: "Automobile",
            label: "Automobile",
            value: "Automobile",
        },
        {
            id: "Hotel Management",
            label: "Hotel Management",
            value: "Hotel Management",
        },
        {
            id: "other",
            label: "Other",
            value: "Other",
        },
    ],
    "Other": [
        {
            id: "bed",
            label: "B.Ed",
            value: "B.Ed",
        },
        {
            id: "bpharm",
            label: "B.Pharm",
            value: "B.Pharm",
        },
        {
            id: "bhm",
            label: "BHM",
            value: "BHM",
        },
        {
            id: "llb",
            label: "LLB",
            value: "LLB"
        },
        {
            id: "mbbs",
            label: "MBBS",
            value: "MBBS"
        },
        {
            id: "barch",
            label: "B.Arch",
            value: "B.Arch"
        },
        {
            id: "other",
            label: "Other",
            value: "Other"
        },
    ]
};