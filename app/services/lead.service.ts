import { StudentProfile } from "@/app/types/profile";

export async function saveLead(
    profile: Partial<StudentProfile>
) {
    if (
        !profile.name ||
        !profile.phone ||
        !profile.email
    ) {
        return;
    }

    try {
        // TODO:
        // Replace this with your DB/API call

        console.log("Saving Lead------->", profile);

        return crypto.randomUUID();

    } catch (error) {
        console.error(
            "Failed to save lead",
            error
        );
    }
}

export async function updateCounsellingSlot(
    crmLeadId: string,
    date: string,
    time: string
) {
    console.log(
        "Updating CRM",
        crmLeadId,
        date,
        time
    );

    // later:
    // PATCH /crm/leads/:crmLeadId
}

export async function updateAdmissionExpertRequest(
    leadId: string,
    requested: boolean
) {
    console.log({
        leadId,
        admissionExpertRequested: requested,
    });

    // PATCH CRM
}

export async function updateCallbackRequest(
    leadId: string,
    preferredTime: string
) {
    console.log("Callback Requested");

    console.log({
        leadId,
        preferredTime,
    });

    // Later
    // PATCH CRM
}

export async function updateChosenProgramme(
    leadId: string,
    programme: string
) {
    try {
        console.log(
            "Updating programme:",
            leadId,
            programme
        );

        // TODO:
        // PATCH /crm/leads/:leadId
        // {
        //    chosenProgramme: programme
        // }

    } catch (error) {
        console.error(error);
    }
}