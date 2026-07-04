// chatHelpers.ts

import { MBA_FLOW } from "@/app/data/mbaFlow";
import { QUALIFICATION_SPECIALIZATIONS } from "@/app/data/qualificationSpecializations";
import { StudentProfile } from "@/app/types/profile";
import { FlowStep } from "@/app/types/conversation";

export function getSuggestionsForStep(
    step: FlowStep,
    profile: StudentProfile
) {
    if (step === "specialization") {
        return (
            QUALIFICATION_SPECIALIZATIONS[
            profile.qualification ?? ""
            ] ?? []
        );
    }

    return MBA_FLOW[step]?.options ?? [];
}