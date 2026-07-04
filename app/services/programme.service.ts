import { Programme } from "@/app/types/programme";

export interface ProgrammeSelectionResult {
    programme: Programme;
    applyUrl: string;
}

export function selectProgramme(
    programmeId: string,
    programmes: Programme[]
): ProgrammeSelectionResult | null {
    const programme = programmes.find(
        (p) => p.id === programmeId
    );

    if (!programme) {
        return null;
    }

    return {
        programme,

        applyUrl:
            programme.programmeUrl ??
            `/programmes/${programme.id}`,
    };
}