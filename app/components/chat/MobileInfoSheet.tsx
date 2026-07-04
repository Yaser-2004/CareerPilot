"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, GraduationCap } from "lucide-react";
import { JOURNEY_STEPS } from "@/constants/data";
import { useChatStore } from "@/app/stores/chat.store";
import {
    usePhase,
    useRecommendations,
    useFeeBreakdown,
} from "@/app/stores/chat.selectors";

function getActiveJourneyId(phase: string) {
    if (phase === "completed") return "applications";
    if (phase === "fees" || phase === "programme") return "fees";
    if (phase === "recommendations") return "recommendations";
    return "profile";
}

interface MobileInfoSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileInfoSheet({ isOpen, onClose }: MobileInfoSheetProps) {
    const phase = usePhase();
    const activeId = getActiveJourneyId(phase);
    const activeIndex = JOURNEY_STEPS.findIndex((x) => x.id === activeId);

    const profile =
        useChatStore((state) => state.conversation.profile) || {};
    const recommendations = useRecommendations();
    const fee = useFeeBreakdown();

    const fields = [
        { label: "NAME", value: profile.name },
        { label: "GOAL", value: profile.goal, isBadge: true },
        { label: "QUALIFICATION", value: profile.qualification, isBadge: true },
        { label: "SPECIALIZATION", value: profile.specialization, isBadge: true },
        { label: "BUDGET", value: profile.budget },
        { label: "WHATSAPP", value: profile.phone },
        { label: "EMAIL", value: profile.email },
    ];

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/40 md:hidden"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 28,
                            stiffness: 300,
                        }}
                        className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92vh] flex-col rounded-t-3xl bg-[#FAF8F5] shadow-2xl md:hidden"
                    >
                        {/* ── Header ── */}
                        <div className="flex items-center justify-between border-b border-gray-200/60 px-6 py-4">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E2374D] text-white">
                                    <GraduationCap className="h-5 w-5" />
                                </div>
                                <span className="text-[17px] font-bold tracking-tight text-[#002B49]">
                                    CareerPilot
                                </span>
                            </div>

                            <button
                                onClick={onClose}
                                className="flex items-center gap-1.5 text-[13px] font-semibold text-[#E2374D] active:opacity-70"
                            >
                                Close
                                <X size={18} />
                            </button>
                        </div>

                        {/* ── Scrollable Content ── */}
                        <div className="flex-1 overflow-y-auto px-6 pb-10 pt-6">
                            <h2 className="text-[22px] font-bold tracking-tight text-[#002B49]">
                                Your Profile
                            </h2>

                            {/* ─── Journey Timeline ─── */}
                            <div className="mt-6 rounded-xl border-2 border-red-500 border-dashed bg-white  p-5">
                                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                                    Journey
                                </span>

                                <ol className="relative mt-4 space-y-4">
                                    {/* Track line */}
                                    <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-[#EEF2F6]">
                                        <motion.div
                                            className="w-full bg-[#E2374D] origin-top"
                                            initial={false}
                                            animate={{
                                                scaleY:
                                                    activeIndex > 0
                                                        ? activeIndex /
                                                        Math.max(
                                                            1,
                                                            JOURNEY_STEPS.length - 1
                                                        )
                                                        : 0,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: "easeInOut",
                                            }}
                                            style={{ height: "100%" }}
                                        />
                                    </div>

                                    {JOURNEY_STEPS.map((s, i) => {
                                        const active = s.id === activeId;
                                        const done = activeIndex > i;

                                        let titleColor = "text-[#475569]";
                                        let subColor = "text-slate-400";

                                        if (active) {
                                            titleColor =
                                                "text-[#E2374D] font-semibold";
                                            subColor = "text-slate-400";
                                        } else if (done) {
                                            titleColor =
                                                "text-[#1E293B] font-semibold";
                                            subColor = "text-slate-400";
                                        }

                                        return (
                                            <li
                                                key={s.id}
                                                className="relative flex items-start gap-4"
                                            >
                                                {/* Dot */}
                                                <div className="relative z-20 flex h-6 w-6 shrink-0 items-center justify-center">
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

                                                {/* Text + Step Number */}
                                                <div className="flex flex-1 items-start justify-between pt-0.5">
                                                    <div className="flex flex-col">
                                                        <span
                                                            className={`text-[14px] leading-tight ${titleColor}`}
                                                        >
                                                            {s.label}
                                                        </span>
                                                        <span
                                                            className={`mt-0.5 text-[12px] leading-normal ${subColor}`}
                                                        >
                                                            {s.sub}
                                                        </span>
                                                    </div>
                                                    <span className="text-[11px] font-medium text-slate-300">
                                                        0{i + 1}
                                                    </span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>

                            {/* ─── About You ─── */}
                            <div className="mt-5 border-2 border-blue-600 border-dashed rounded-xl bg-blue-50 p-5">
                                <div className="flex items-center justify-between pb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                                        About You
                                    </span>
                                    <span className="rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-[10px] font-semibold text-[#E2374D]">
                                        {Object.values(profile).filter(Boolean).length > 0
                                            ? "Complete"
                                            : "Pending"}
                                    </span>
                                </div>

                                <div className="divide-y divide-slate-100">
                                    {fields.map((field, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between py-2.5 text-[11px]"
                                        >
                                            <span className="font-semibold text-gray-500">
                                                {field.label}
                                            </span>
                                            {field.value ? (
                                                field.isBadge ? (
                                                    <span className="rounded-md bg-[#FEE2E2] px-2 py-0.5 text-[13px] font-semibold text-[#E2374D]">
                                                        {field.value}
                                                    </span>
                                                ) : (
                                                    <span className="text-[13px] font-semibold text-[#0F172A]">
                                                        {field.value}
                                                    </span>
                                                )
                                            ) : (
                                                <span className="text-[11px] font-medium text-[#94A3B8]">
                                                    – pending –
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ─── Shortlist ─── */}
                            <div className="mt-5  rounded-xl border-2 border-green-600 border-dashed bg-green-50 p-5">
                                <div className="flex items-center justify-between pb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                                        Shortlist
                                    </span>
                                    {recommendations?.length > 0 ? (
                                        <span className="rounded-full bg-[#E6F9F4] px-2.5 py-0.5 text-[10px] font-semibold text-[#10B981]">
                                            Complete
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[10px] font-semibold text-[#64748B]">
                                            Pending
                                        </span>
                                    )}
                                </div>

                                {recommendations?.length === 0 && (
                                    <p className="text-center text-[12px] leading-relaxed text-[#64748B]">
                                        Your matched programmes will appear here
                                        once we know your budget.
                                    </p>
                                )}

                                <div className="flex flex-col gap-3">
                                    {recommendations?.map((programme, i) => (
                                        <div
                                            key={i}
                                            className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3"
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className="text-[13px] font-bold text-[#E2374D]">
                                                    {programme.university}
                                                </p>
                                                <div className="rounded-full bg-[#10B981] px-2 py-0.5 text-[9px] font-semibold text-white">
                                                    {programme.naacGrade}
                                                </div>
                                            </div>
                                            <p className="mt-1 text-[11px] font-medium text-[#0F172A]">
                                                {programme.mode} MBA |{" "}
                                                {programme.duration}
                                            </p>
                                            <p className="mt-0.5 text-[12px] font-semibold text-[#0F172A]">
                                                ₹
                                                {programme.fees.total.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ─── Fees & Enrolment ─── */}
                            <div className="mt-5  rounded-xl border-2 border-purple-600 border-dashed bg-purple-50 p-5">
                                <div className="flex items-center justify-between pb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                                        Fees · Enrolment
                                    </span>
                                    {fee ? (
                                        <span className="rounded-full bg-[#E6F9F4] px-2.5 py-0.5 text-[10px] font-semibold text-[#10B981]">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[10px] font-semibold text-[#64748B]">
                                            Pending
                                        </span>
                                    )}
                                </div>

                                {!fee && (
                                    <p className="text-center text-[12px] leading-relaxed text-[#64748B]">
                                        Fee breakdown unlocks once you've picked
                                        a programme.
                                    </p>
                                )}

                                {fee && (
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between text-base font-bold">
                                            <span>Total</span>
                                            <span className="text-[#E2374D]">
                                                ₹
                                                {fee.totalFee.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[11px] font-semibold uppercase text-gray-500">
                                                Per Semester
                                            </span>
                                            <span className="font-semibold text-[#0F172A]">
                                                ₹
                                                {fee.semesterFee?.toLocaleString(
                                                    "en-IN"
                                                )}
                                                /semester
                                            </span>
                                        </div>
                                        <div className="mt-4 text-sm text-green-800 py-2 text-center w-full rounded-lg border border-green-200 bg-green-50">
                                            Exclusive Scholarship of Up to <span className="font-semibold">20%</span>
                                        </div>
                                        <div className="mt-4 w-full h-[1px] bg-black/10"></div>


                                        {fee.emiAvailable && (
                                            <div className="mt-2 rounded-lg bg-green-50 p-3 text-[12px] text-green-700">
                                                EMI Available
                                                {fee.emiPerMonth && (
                                                    <span className="ml-1 font-semibold">
                                                        · ₹
                                                        {fee.emiPerMonth.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                        /month
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        <a
                                            href={fee.applyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 block rounded-xl bg-[#E2374D] py-3 text-center text-[14px] font-semibold text-white transition hover:opacity-90"
                                        >
                                            Visit Programme →
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
