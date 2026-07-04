"use client";

import { useChatStore } from "@/app/stores/chat.store";
import ProgrammeCard from "./ProgrammeCard";
import { useFeeBreakdown, useRecommendations, useAdmissionExpert } from "@/app/stores/chat.selectors";
import { div } from "framer-motion/client";
import { useEffect } from "react";

export function JourneyPanel() {
    const profile = useChatStore(
        (state) => state.conversation.profile
    ) || {};

    // Map your profile values to handle "Pending..." or custom tag logic
    const fields = [
        { label: "NAME", value: profile.name },
        { label: "GOAL", value: profile.goal, isBadge: true },
        { label: "QUALIFICATION", value: profile.qualification, isBadge: true },
        { label: "SPECIALIZATION", value: profile.specialization, isBadge: true },
        { label: "BUDGET", value: profile.budget },
        { label: "WHATSAPP", value: profile.phone },
        { label: "EMAIL", value: profile.email },
    ];

    // Determine verification status based on whether fields are filled
    const isVerified = Object.values(profile).filter(Boolean).length > 0;
    const recommendations = useRecommendations();
    const fee = useFeeBreakdown();
    const expert = useAdmissionExpert();

    //scroll to fees div when fees is there
    useEffect(() => {
        if (fee) {
            document.getElementById("fees")?.scrollIntoView({ behavior: "smooth" });
        }
        if (!fee && recommendations?.length > 0) {
            document.getElementById("shortlist")?.scrollIntoView({ behavior: "smooth" });
        }
    }, [fee, recommendations]);

    return (

        <aside className="hidden h-screen w-1/3 shrink-0 overflow-y-auto border-l border-gray-200 bg-[#FAFBFC] px-8 py-10 xl:block">
            {/* Header section matching new screenshot */}
            <div className="flex items-center justify-between">
                <h2 className="text-[26px] font-bold tracking-tight text-[#002B49]">
                    Your Profile
                </h2>
                <span className="rounded-md bg-[#E6F9F4] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#10B981]">
                    SYNCING
                </span>
            </div>

            <div className="mt-4 space-y-6">
                {/* 1. ABOUT YOU CARD */}
                <div className="rounded-xl border-2 border-dashed border-purple-700 bg-purple-50 p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-3">
                        <span className="text-[12px] font-bold tracking-wider text-[#94A3B8]">
                            ABOUT YOU
                        </span>
                        <span className="rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-[11px] font-semibold text-[#E2374D]">
                            Verified
                        </span>
                    </div>

                    <div className="divide-y divide-slate-200/80">
                        {fields.map((field, i) => (
                            <div key={i} className="flex items-center justify-between py-3 text-[11px]">
                                <span className="font-semibold text-gray-500">{field.label}</span>
                                {field.value ? (
                                    field.isBadge ? (
                                        <span className="rounded-md bg-[#FEE2E2] px-2.5 py-0.5 text-[14px] font-semibold text-[#E2374D]">
                                            {field.value}
                                        </span>
                                    ) : (
                                        <span className="font-semibold text-[#0F172A] text-[14px]">{field.value}</span>
                                    )
                                ) : (
                                    <span className="text-[#94A3B8] font-medium text-[12px]">Pending...</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. SHORTLIST CARD */}
                <div className="space-y-2" id="shortlist">
                    <div className="flex items-center justify-between px-1">
                        <span className="text-[12px] font-bold tracking-wider text-[#94A3B8]">
                            SHORTLIST
                        </span>
                        {recommendations?.length > 0 ? <span className="rounded-full bg-[#E6F9F4] px-2.5 py-0.5 text-[11px] font-semibold text-[#10B981]">
                            {recommendations?.length} Programmes
                        </span> : <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-semibold text-[#64748B]">
                            Pending
                        </span>}
                    </div>
                    <div className="rounded-xl border-2 border-dashed border-green-600 bg-green-50 p-6 text-cente flex flex-col gap-3">
                        {recommendations?.length === 0 && <p className="text-center text-[12px] leading-relaxed text-[#64748B]">
                            Your matched programmes will appear here once we know your budget.
                        </p>}

                        {/* Show the matched programs */}
                        {recommendations?.map((programme, i) => (
                            <div key={i} className="w-full py-3 px-4 bg-white rounded-xl border border-gray-300 relative">
                                <div className="flex items-center justify-between">
                                    <p className="text-[14px] font-bold text-[#E2374D]">{programme.university}</p>
                                    <div className="bg-[#10B981] text-white px-2 py-1 rounded-full text-[10px] font-medium" >
                                        {programme.naacGrade}
                                    </div>
                                </div>
                                <p className="text-[11px] mt-1 font-medium text-[#0F172A]">{programme.mode} MBA | {programme.duration}</p>
                                {/* commas for price like 1,46,000 */}
                                <p className="text-[13px] mt-1 font-medium text-[#0F172A]">₹{programme.fees.total.toLocaleString('en-IN')}</p>

                                {/* Add a small green dot at the top right corner
                                <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#10B981]" /> */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. FEES & ENROLMENT CARD */}
                <div className="space-y-2" id="fees">
                    <div className="flex items-center justify-between px-1">
                        <span className="text-[12px] font-bold tracking-wider text-[#94A3B8]">
                            FEES · ENROLMENT
                        </span>
                        {fee ? <span className="rounded-full bg-[#E6F9F4] px-2.5 py-0.5 text-[11px] font-semibold text-[#10B981]">
                            Fetched
                        </span> : <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-semibold text-[#64748B]">
                            Pending
                        </span>}
                    </div>
                    <div className="rounded-xl border-2 border-dashed border-blue-600 bg-blue-50 p-6 text-center">
                        {!fee && <p className="text-[12px] leading-relaxed text-[#64748B]">
                            Fee breakdown and your registration card unlock once you've picked a programme.
                        </p>}

                        {fee && <div className="bg-white p-6 rounded-xl border border-gray-300 flex flex-col w-full items-center justify-center gap-3">
                            <div className="space-y-3 text-sm w-full">
                                <div className="flex justify-between text-base font-semibold">
                                    <span>Total Fee</span>

                                    <span>
                                        ₹{fee.totalFee.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Per Semester</span>

                                    <span>
                                        ₹{fee.semesterFee?.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 text-sm text-green-800 py-2 text-center w-full rounded-lg border border-green-200 bg-green-50">
                                Exclusive Scholarship of Up to <span className="font-semibold">20%</span>
                            </div>

                            <div className="w-full h-[1px] bg-black/10"></div>

                            {fee.emiAvailable && (
                                <div className="w-full mt-2 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                                    EMI Available

                                    {fee.emiPerMonth && (
                                        <div className="mt-1 font-semibold">
                                            ₹
                                            {fee.emiPerMonth.toLocaleString(
                                                "en-IN"
                                            )}
                                            /month
                                        </div>
                                    )}
                                </div>
                            )}

                            <button
                                onClick={expert}
                                className="hover:cursor-pointer hover:scale-[1.02] w-full mt-6 block rounded-xl bg-[#E2374D] py-3 text-center font-semibold text-white transition hover:opacity-90"
                            >
                                Connect with Admission Expert
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </aside>
    );
}