import { Programme } from "@/app/types/programme";

export interface FeeBreakdown {
    admissionFee: number;

    semesterFee?: number;

    totalFee: number;

    emiAvailable: boolean;

    emiPerMonth?: number;

    applyUrl: string;
}

export function getFeeBreakdown(
    programme: Programme
): FeeBreakdown {
    const totalFee = programme.fees.total;

    const semesterFee =
        programme.fees.perSemester ??
        Math.round(totalFee / 4);

    return {
        admissionFee: programme.fees.admissionFee,

        semesterFee: programme.fees.perSemester,

        totalFee,

        emiAvailable: true,

        emiPerMonth: programme.fees.emiPerMonth,

        applyUrl: programme.programmeUrl,
    };
}