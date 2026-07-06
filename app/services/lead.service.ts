import axios from "axios";

import { StudentProfile } from "@/app/types/profile";

const BASE_URL =
    "https://admin.learningshala.com/data/api/cms/student-leads";

export async function updateLead(
    crmLeadId: string,
    updates: Partial<StudentProfile>
) {
    try {
        console.log("====================================");
        console.log("Updating Lead");
        console.log("Lead ID:", crmLeadId);
        console.log("Payload:", updates);
        console.log("====================================");

        const { data } = await axios.put(
            `${BASE_URL}/${crmLeadId}`,
            updates,
            {
                headers: {
                    "X-API-Key": process.env.LEARNINGSHALA_API_KEY,
                    Authorization: `Bearer ${process.env.LEARNINGSHALA_BEARER_TOKEN}`,
                },
            }
        );

        console.log("Update Success");
        console.log(data);

        return data;
    } catch (error: any) {
        console.error("Update Lead Failed");

        console.error(
            "Status:",
            error.response?.status
        );

        console.error(
            "Response:",
            error.response?.data
        );

        console.error(error);

        throw error;
    }
}

export async function saveLead(
    profile: Partial<StudentProfile>
) {
    if (
        !profile.name ||
        !profile.phone ||
        !profile.email ||
        !profile.chosenProgramme
    ) {
        return;
    }

    try {
        console.log("====================================");
        console.log("Creating Lead");
        console.log(profile);
        console.log("====================================");

        const { data } = await axios.post(
            BASE_URL,
            profile,
            {
                headers: {
                    "X-API-Key": process.env.LEARNINGSHALA_API_KEY,
                },
            }
        );

        console.log("Lead Created Successfully");
        console.log(data);

        // Since your lead id is the id field
        const leadId = data.data.id;
        console.log("CRM Lead ID:", leadId);
        return String(leadId);

    } catch (error: any) {
        console.error("Create Lead Failed");

        console.error(
            "Status:",
            error.response?.status
        );

        console.error(
            "Response:",
            error.response?.data
        );

        console.error(error);

        throw error;
    }
}

export async function updateCounsellingSlot(
    crmLeadId: string,
    date: string,
    time: string
) {
    return updateLead(crmLeadId, {
        videoCounsellingSlot: {
            date,
            time,
        },
    });
}

export async function updateAdmissionExpertRequest(
    leadId: string,
    requested: boolean
) {
    return updateLead(leadId, {
        admissionExpertRequested: requested,
    });
}

export async function updateCallbackRequest(
    leadId: string,
    preferredTime: string
) {
    return updateLead(leadId, {
        preferredCallbackTime: preferredTime,
    });
}

export async function updateChosenProgramme(
    leadId: string,
    programme: string
) {
    return updateLead(leadId, {
        chosenProgramme: programme,
    });
}