import { programmes } from "@/constants/programmes";

export function getProgrammeData(question: string, chosenProgrammeId?: string) {
    const q = question.toLowerCase();

    let targetId = chosenProgrammeId;

    if (!targetId) {
        if (q.includes("lpu")) targetId = "mba_lpu";
        else if (q.includes("manipal")) targetId = "mba_manipal";
        else if (q.includes("amity")) targetId = "mba_amity";
        else if (q.includes("uttaranchal") || /\buu\b/.test(q)) targetId = "mba_uttaranchal";
    }

    if (!targetId) return null;

    const programme = programmes.find(p => p.id === targetId);
    if (!programme) return null;

    const data: Record<string, any> = {
        programmeName: programme.programmeName,
        university: programme.university,
    };

    let matched = false;

    if (q.includes("fee") || q.includes("cost") || q.includes("price")) {
        data.fees = programme.fees;
        matched = true;
    }

    if (q.includes("emi") || q.includes("loan")) {
        data.emiPerMonth = programme.fees.emiPerMonth;
        data.emiAvailable = programme.fees.emiAvailable;
        data.paymentOptions = programme.fees.paymentOptions;
        matched = true;
    }

    if (q.includes("specialization") || q.includes("elective")) {
        data.specializations = programme.specializations;
        matched = true;
    }

    if (q.includes("eligibility") || q.includes("qualification")) {
        data.eligibility = programme.eligibility;
        matched = true;
    }

    if (q.includes("duration") || q.includes("semester")) {
        data.duration = programme.duration;
        data.curriculum = programme.curriculum;
        matched = true;
    }

    if (q.includes("placement") || q.includes("job") || q.includes("internship") || q.includes("package") || q.includes("recruiter")) {
        data.placementSupport = programme.placementSupport;
        data.careerOutcomes = programme.careerOutcomes;
        data.placements = programme.placements;
        matched = true;
    }

    if (q.includes("admission") || q.includes("admissions") || q.includes("apply")) {
        data.eligibility = programme.eligibility;
        data.mode = programme.mode;
        data.admissionProcess = programme.admissionProcess;
        data.requiredDocuments = programme.requiredDocuments;
        matched = true;
    }

    if (q.includes("scholarship")) {
        data.hasScholarships = programme.fees.hasScholarships;
        data.scholarshipEligibility = programme.fees.scholarshipEligibility;
        matched = true;
    }

    if (q.includes("document") || q.includes("documents")) {
        data.requiredDocuments = programme.requiredDocuments;
        matched = true;
    }

    if (q.includes("curriculum") || q.includes("syllabus") || q.includes("subject")) {
        data.curriculum = programme.curriculum;
        data.specializations = programme.specializations;
        matched = true;
    }

    if (q.includes("approval") || q.includes("ugc") || q.includes("naac") || q.includes("recognition") || q.includes("accreditation")) {
        data.approvals = programme.approvals;
        data.naacGrade = programme.naacGrade;
        matched = true;
    }

    if (!matched) {
        return {
            programmeName: programme.programmeName,
            university: programme.university,
            duration: programme.duration,
            fees: programme.fees.total,
            naacGrade: programme.naacGrade,
            approvals: programme.approvals,
        };
    }

    return data;
}
