import { programmes } from "@/constants/programmes";

import { StudentProfile } from "@/app/types/profile";
import { Programme } from "@/app/types/programme";

interface ScoredProgramme extends Programme {
    match: number;
}

function budgetScore(
    budget: string | undefined,
    fee: number
) {
    if (!budget) return 10;

    if (budget === "Below ₹1L")
        return fee <= 100000 ? 20 : 10;

    if (budget === "₹1-1.5L")
        return fee <= 150000 ? 20 : 10;

    if (budget === "₹1.5-2L")
        return fee <= 200000 ? 20 : 10;

    if (budget === "Above ₹2L")
        return 20;

    if (budget === "Need EMI")
        return 15;

    return 0;
}

export async function recommendProgrammes(
    profile: Partial<StudentProfile>
): Promise<ScoredProgramme[]> {

    let eligibleProgrammes = programmes;

    switch (profile.budget) {
        case "Below ₹1L":
            eligibleProgrammes = programmes.filter(
                p => p.fees.total <= 100000
            );
            break;

        case "₹1-1.5L":
            eligibleProgrammes = programmes.filter(
                p => p.fees.total <= 150000
            );
            break;

        case "₹1.5-2L":
            eligibleProgrammes = programmes.filter(
                p => p.fees.total <= 200000
            );
            break;

        case "Above ₹2L":
        case "Need EMI":
        default:
            eligibleProgrammes = programmes;
    }

    const scored = eligibleProgrammes.map((programme) => {
        let score = 0;

        // Goal (40)
        if (
            profile.goal &&
            programme.recommendedGoals.some(
                (goal) =>
                    goal.toLowerCase() ===
                    profile.goal!.toLowerCase()
            )
        ) {
            score += 40;
        }

        // Specialization (30)
        if (
            profile.preferredSpecialization &&
            programme.specializations.some(
                (specialization) =>
                    specialization.toLowerCase() ===
                    profile.preferredSpecialization!.toLowerCase()
            )
        ) {
            score += 30;
        }

        // Budget (20)
        score += budgetScore(
            profile.budget,
            programme.fees.total
        );

        // Experience (5)
        if (
            profile.experience &&
            !programme.eligibility.experienceRequired
        ) {
            score += 5;
        }

        // NAAC bonus (5)
        if (programme.naacGrade === "A++") {
            score += 5;
        }

        return {
            ...programme,
            match: Math.min(score, 100),
        };
    });

    scored.sort((a, b) => b.match - a.match);

    return scored.slice(0, 3);
}