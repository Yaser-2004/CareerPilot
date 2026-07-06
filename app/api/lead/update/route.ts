import { NextRequest, NextResponse } from "next/server";

import { updateLead } from "@/app/services/lead.service";

export async function POST(req: NextRequest) {
    try {
        const { crmLeadId, updates } = await req.json();

        await updateLead(crmLeadId, updates);

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}