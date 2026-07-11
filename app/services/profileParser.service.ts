import { FlowStep } from "@/app/types/conversation";
import { StudentProfile } from "@/app/types/profile";

export function parseProfileUpdate(
    step: FlowStep,
    message: string
): Partial<StudentProfile> {
    const text = message.trim();

    switch (step) {
        case "welcome":
            return {
                name: text,
            };

        case "qualification":
            return parseQualification(text);

        case "specialization":
            if (
                [
                    "none",
                    "no specialization",
                    "no specialisation",
                    "n/a",
                    "na"
                ].includes(text.toLowerCase())
            ) {
                return {
                    specialization: "None"
                };
            }
            return {
                specialization: text,
            };

        case "experience":
            return parseExperience(text);

        case "phone":
            return {
                phone: text.replace(/\D/g, ""),
            };

        case "goal":
            return parseGoal(text);

        case "budget":
            return parseBudget(text);

        case "email":
            return {
                email: text.toLowerCase(),
            };

        default:
            return {};
    }
}

function parseQualification(
    text: string
): Partial<StudentProfile> {
    const lower = text.toLowerCase();

    if (lower.includes("b.tech") || lower.includes("btech"))
        return { qualification: "B.Tech" };

    if (lower.includes("bca"))
        return { qualification: "BCA" };

    if (lower.includes("bba"))
        return { qualification: "BBA" };

    if (lower.includes("b.com"))
        return { qualification: "B.Com" };

    if (lower.includes("ba"))
        return { qualification: "BA" };

    if (lower.includes("b.sc"))
        return { qualification: "B.Sc" };

    if (lower.includes("diploma"))
        return { qualification: "Diploma" };

    return {
        qualification: text,
    };
}

function parseExperience(
    text: string
): Partial<StudentProfile> {
    const lower = text.toLowerCase();

    if (
        lower.includes("no") ||
        lower.includes("fresher")
    ) {
        return {
            experience: "No Experience",
        };
    }

    const match = lower.match(/\d+/);

    if (!match) {
        return {
            experience: text,
        };
    }

    const years = Number(match[0]);

    if (years < 1)
        return {
            experience: "Less than 1 Year",
        };

    if (years <= 3)
        return {
            experience: "1–3 Years",
        };

    if (years <= 5)
        return {
            experience: "3–5 Years",
        };

    return {
        experience: "5+ Years",
    };
}

function parseGoal(
    text: string
): Partial<StudentProfile> {
    const lower = text.toLowerCase();

    if (
        lower.includes("salary") ||
        lower.includes("package")
    )
        return {
            goal: "Higher Salary",
        };

    if (
        lower.includes("promotion")
    )
        return {
            goal: "Promotion",
        };

    if (
        lower.includes("career")
    )
        return {
            goal: "Career Change",
        };

    if (
        lower.includes("business")
    )
        return {
            goal: "Business",
        };

    if (
        lower.includes("leader")
    )
        return {
            goal: "Leadership Role",
        };

    if (
        lower.includes("degree")
    )
        return {
            goal: "Degree",
        };

    return {
        goal: text,
    };
}

function parseBudget(
    text: string
): Partial<StudentProfile> {
    const lower = text.toLowerCase();

    // Handle chip values first
    if (lower.includes("below"))
        return {
            budget: "Below ₹1L",
        };

    if (lower.includes("1-1.5") || lower.includes("1–1.5"))
        return {
            budget: "₹1-1.5L",
        };

    if (lower.includes("1.5-2") || lower.includes("1.5–2"))
        return {
            budget: "₹1.5-2L",
        };

    if (lower.includes("above"))
        return {
            budget: "Above ₹2L",
        };

    if (lower.includes("emi"))
        return {
            budget: "Need EMI",
        };

    // Fallback for free-text inputs
    const number = lower.match(/\d+(\.\d+)?/);

    if (!number)
        return {
            budget: text,
        };

    const value = Number(number[0]);

    if (value < 1)
        return {
            budget: "Below ₹1L",
        };

    if (value <= 1.5)
        return {
            budget: "₹1-1.5L",
        };

    if (value <= 2)
        return {
            budget: "₹1.5-2L",
        };

    return {
        budget: "Above ₹2L",
    };
}