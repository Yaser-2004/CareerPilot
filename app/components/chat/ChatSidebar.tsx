"use client"

import Link from "next/link";
import { motion } from "framer-motion";
import { JOURNEY_STEPS } from "@/constants/data";
import { GraduationCap } from "lucide-react";
import { usePhase } from "@/app/stores/chat.selectors";

function getActiveJourneyId(phase: string) {
    if (phase === "completed") return "applications";
    if (phase === "fees" || phase === "programme") return "fees";
    if (phase === "recommendations") return "recommendations";
    return "profile";
}

export function getJourneyProgress(phase: string) {
    const activeId = getActiveJourneyId(phase);
    const currentStep = JOURNEY_STEPS.findIndex(
        (step) => step.id === activeId
    ) + 1;

    return {
        activeId,
        cStep: currentStep,
        tSteps: JOURNEY_STEPS.length,
    };
}

export function ChatSidebar() {
    const phase = usePhase();
    const activeId = getActiveJourneyId(phase);

    // Find current active index to handle conditional styling for the timeline line and steps
    const activeIndex = JOURNEY_STEPS.findIndex((x) => x.id === activeId);

    return (
        <aside className="hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-gray-200 bg-white px-8 py-8 lg:flex">
            <div>
                {/* Logo Section matching new screenshot */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E2374D] text-white">
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <span className="text-[20px] font-bold tracking-tight text-[#002B49]">
                        CareerPilot
                    </span>
                </Link>

                {/* Journey Timeline */}
                <div className="mt-12">
                    <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Your Admission Journey
                    </div>
                    <ol className="relative space-y-5">
                        {/* Custom background timeline track line */}
                        <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-[#EEF2F6]">
                            <motion.div
                                className="w-full bg-[#E2374D] origin-top"
                                initial={false}
                                animate={{ scaleY: activeIndex > 0 ? activeIndex / Math.max(1, JOURNEY_STEPS.length - 1) : 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                style={{ height: "100%" }}
                            />
                        </div>

                        {JOURNEY_STEPS.map((s, i) => {
                            const active = s.id === activeId;
                            const done = activeIndex > i;

                            // Color configuration based on status matching the screenshot
                            let titleColor = "text-[#475569]";
                            let subColor = "text-slate-400";

                            if (active) {
                                titleColor = "text-[#E2374D] font-semibold";
                                subColor = "text-slate-400";
                            } else if (done) {
                                titleColor = "text-[#1E293B] font-semibold";
                                subColor = "text-slate-400";
                            }

                            return (
                                <li key={s.id} className="relative">

                                    <button className="group flex w-full items-start gap-4 text-left transition-opacity hover:opacity-90">
                                        {/* Dynamic Indicator Dot Tracker matching image */}
                                        <div className="relative z-20 flex h-6 w-6 shrink-0 items-center justify-center transition-all">
                                            {active ? (
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50">
                                                    <div className="h-3 w-3 rounded-full bg-[#E2374D]" />
                                                </div>
                                            ) : done ? (
                                                <div className="h-3 w-3 rounded-full bg-[#E2374D]" />
                                            ) : (
                                                <div className="h-3 w-3 rounded-full bg-[#E2E8F0]" />
                                            )}
                                        </div>

                                        {/* Step Texts */}
                                        <div className="flex flex-col select-none pt-0.5">
                                            <span className={`text-[15px] leading-tight transition-colors ${titleColor}`}>
                                                {s.label}
                                            </span>
                                            <span className={`text-[13px] leading-normal mt-0.5 transition-colors ${subColor}`}>
                                                {s.sub || (active ? "Information gathering" : "")}
                                            </span>
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </aside>
    );
}