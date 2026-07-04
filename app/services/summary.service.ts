import { StudentProfile } from "@/app/types/profile";
import { FlowStep } from "@/app/types/conversation";
import { Programme } from "@/app/types/programme";

interface BuildSummaryParams {
    profile: StudentProfile;
    phase: FlowStep;
    selectedProgramme?: Programme | null;
}

export function buildSummary({
    profile,
    phase,
    selectedProgramme,
}: BuildSummaryParams) {
    return [
        profile.name && `Name: ${profile.name}`,
        profile.qualification &&
        `Qualification: ${profile.qualification}`,
        profile.specialization &&
        `Specialization: ${profile.specialization}`,
        profile.experience &&
        `Experience: ${profile.experience}`,
        profile.goal &&
        `Goal: ${profile.goal}`,
        profile.budget &&
        `Budget: ${profile.budget}`,
        selectedProgramme &&
        `Selected Programme: ${selectedProgramme.university}`,
        `Current Step: ${phase}`,
    ]
        .filter(Boolean)
        .join("\n");
}