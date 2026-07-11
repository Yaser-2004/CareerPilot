import { programmes } from "@/constants/programmes";

export function getProgrammeData(
    question: string,
    chosenProgrammeId?: string
) {
    const q = question.toLowerCase();

    let selectedProgrammes = programmes;


    // If user selected a programme
    if (chosenProgrammeId) {
        const programme = programmes.find(
            p => p.id === chosenProgrammeId
        );

        if (programme) {
            selectedProgrammes = [programme];
        }
    }


    const extractData = (programme: any) => {

        const data: Record<string, any> = {
            programmeName: programme.programmeName,
            university: programme.university,
        };


        if (
            q.includes("fee") ||
            q.includes("cost") ||
            q.includes("price")
        ) {
            data.fees = programme.fees;
        }


        if (
            q.includes("emi") ||
            q.includes("loan")
        ) {
            data.emiPerMonth =
                programme.fees.emiPerMonth;

            data.paymentOptions =
                programme.fees.paymentOptions;
        }


        if (
            q.includes("specialization") ||
            q.includes("elective")
        ) {
            data.specializations =
                programme.specializations;
        }


        if (
            q.includes("placement") ||
            q.includes("job") ||
            q.includes("package")
        ) {
            data.placementSupport =
                programme.placementSupport;

            data.careerOutcomes =
                programme.careerOutcomes;
        }


        if (
            q.includes("eligibility") ||
            q.includes("qualification")
        ) {
            data.eligibility =
                programme.eligibility;
        }


        if (
            q.includes("duration") ||
            q.includes("semester")
        ) {
            data.duration =
                programme.duration;
        }


        if (
            q.includes("ugc") ||
            q.includes("naac") ||
            q.includes("approval") ||
            q.includes("recognition")
        ) {
            data.naacGrade =
                programme.naacGrade;

            data.approvals =
                programme.approvals;
        }


        // fallback important
        return data;
    };


    return selectedProgrammes.map(extractData);
}