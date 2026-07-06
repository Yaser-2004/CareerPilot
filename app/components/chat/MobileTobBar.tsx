"use client";

import { JOURNEY_STEPS } from "@/constants/data";
import { useOpenInfoSheet, usePhase } from "@/app/stores/chat.selectors";

function getActiveJourneyId(phase: string) {
    if (phase === "completed") return "applications";
    if (phase === "fees" || phase === "programme") return "fees";
    if (phase === "recommendations") return "recommendations";
    return "profile";
}

export function MobileTopBar() {
    const phase = usePhase();

    const activeId = getActiveJourneyId(phase);
    const activeIndex = JOURNEY_STEPS.findIndex(
        (step) => step.id === activeId
    );
    const openInfoSheet = useOpenInfoSheet();

    return (
        <div className="border-b border-[#E8E2D8] bg-[#FAF8F5] py-3 md:hidden">
            <div className="flex w-full items-center">
                {JOURNEY_STEPS.map((step, index) => {
                    const active = step.id === activeId;
                    const done = index < activeIndex;

                    return (
                        <div
                            key={step.id}
                            onClick={() => openInfoSheet(step.id as "profile" | "recommendations" | "fees")}
                            className="relative flex flex-1 justify-center"
                        >
                            {/* connector */}
                            {index !== JOURNEY_STEPS.length - 1 && (
                                <div className="absolute left-1/2 top-1/2 h-px w-full -translate-y-1/2 bg-[#DDD8CF]">
                                    <div
                                        className={`h-full ${done ? "w-full bg-[#2E8B57]" : "w-0"
                                            }`}
                                    />
                                </div>
                            )}

                            {/* step */}
                            <div className="relative z-10 flex items-center bg-[#FAF8F5] px-1">
                                <div
                                    className={`mr-1 h-[5px] w-[5px] rounded-full ${active
                                        ? "bg-[#E2374D]"
                                        : done
                                            ? "bg-[#2E8B57]"
                                            : "bg-[#D6D3D1]"
                                        }`}
                                />

                                <span
                                    className={`text-[8px] font-medium uppercase tracking-[0.18em] ${active
                                        ? "text-[#E2374D]"
                                        : done
                                            ? "text-[#374151]"
                                            : "text-[#B5B5B5]"
                                        }`}
                                >
                                    {step.label == "Recommendations" ? "Shortlist" : step.label == "Applications" ? "Enroll" : step.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}