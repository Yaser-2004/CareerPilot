"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, PanelRightOpen, StickyNote } from "lucide-react";
import { MobileInfoSheet } from "./MobileInfoSheet";
import ProgrammeCard from "./ProgrammeCard";
import FeeBreakdownCard from "./FeeBreakdownCard";

import { ChatMessage } from "@/app/types/chat";
import { FlowStep } from "@/app/types/conversation";
import { MBA_FLOW } from "@/app/data/mbaFlow";
import {
    validateName,
    validateEmail,
    validatePhone,
} from "@/app/services/validation.service";

import {
    useMessages,
    useIsTyping,
    useSendMessage,
    useCurrentStep,
    useRecommendations,
    useFeeBreakdown,
    useApplyUrl,
    useCurrentSuggestions,
    useTypeInitialMessage,
    useInputLocked,
    useSelectCounsellingDate,
    useConversation,
} from "@/app/stores/chat.selectors";
import { getJourneyProgress } from "./ChatSidebar";

import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ScheduleDatePicker from "./ScheduleDatePicker";
import ScheduleTimePicker from "./ScheduleTimePicker";
import CallbackTimePicker from "./CallbackTimePicker";
import NextActionsCard from "./NextActionCards";
import AskAnotherQuestionCard from "./AskAnotherQuestionCard";
import { MobileTopBar } from "./MobileTobBar";

export function ChatConversation() {
    const messages = useMessages();
    const isTyping = useIsTyping();
    const currentStep = useCurrentStep();
    const sendMessage = useSendMessage();
    const suggestions = useCurrentSuggestions();
    const recommendations = useRecommendations();
    const feeBreakdown = useFeeBreakdown();
    const applyUrl = useApplyUrl();
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
    const { cStep, tSteps } = getJourneyProgress(currentStep);
    const typeInitialMessage = useTypeInitialMessage();
    const isInputLocked = useInputLocked();
    const conversation = useConversation();
    const selectDate = useSelectCounsellingDate();
    const [showNextActions, setShowNextActions] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const node = MBA_FLOW[currentStep] ?? {
        options: [],
        inputType: "text",
    };

    const hasStarted = useRef(false);

    useEffect(() => {
        if (hasStarted.current) return;

        hasStarted.current = true;

        typeInitialMessage();
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isTyping, showNextActions]);

    useEffect(() => {
        if (feeBreakdown) {
            setTimeout(() => {
                setShowNextActions(true);
            }, 2000);
        }
    }, [feeBreakdown]);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        const value = input.trim();

        if (!value) return;

        let errorMessage: string | null = null;
        // console.log("------------>", currentStep);

        switch (node.profileField) {
            case "name":
                errorMessage = validateName(value);
                break;

            case "phone":
                errorMessage = validatePhone(value);
                break;

            case "email":
                errorMessage = validateEmail(value);
                break;
        }

        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setError("");
        setInput("");

        await sendMessage(value);
    }

    function renderMessageComponent(message: ChatMessage) {
        switch (message.type) {
            case "schedule_date":
                return <ScheduleDatePicker />;

            case "schedule_time":
                return <ScheduleTimePicker />;

            case "callback_slots":
                return <CallbackTimePicker />;

            case "ask_another_question":
                return <AskAnotherQuestionCard />;

            default:
                return null;
        }
    }

    const uiOnlyTypes = [
        "ask_another_question",
    ];

    return (
        <section className="flex w-full md:w-2/3 flex-col bg-[#FAFBFC] h-full min-h-0 overflow-hidden">
            {/* Top Navigation Bar matching the header of Screenshot 2026-06-29 155455.png */}
            <div className="flex items-end justify-between border-b border-gray-200 bg-white px-8 py-5">
                <div className="max-sm:w-full flex items-center gap-2 justify-between md:justify-start">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                        <span className="text-[13px] font-bold uppercase tracking-wider text-[#1E293B]">
                            ADMISSIONS ASSISTANT
                        </span>
                    </div>

                    {/* Mobile-only info toggle */}
                    <button
                        onClick={() => setIsMobileSheetOpen(true)}
                        className="ml-1 grid h-8 px-3 place-items-center rounded-lg bg-[#FEE2E2] text-[#E2374D] transition active:scale-95 md:hidden"
                        aria-label="View journey info"
                    >
                        {/* <PanelRightOpen size={16} /> */}
                        {/* I want to display the number of steps completed */}
                        <span className="flex items-center gap-1 text-[13px] font-medium uppercase tracking-wider text-red-500">
                            <StickyNote size={16} />{cStep}/{tSteps}
                        </span>
                    </button>
                </div>
                <div className="hidden text-[9px] font-semibold uppercase tracking-widest text-slate-400 md:block">
                    ASK ANYTHING · GET A DATA-BACKED SHORTLIST
                </div>
            </div>

            <MobileTopBar />

            {/* Chat Area Framework */}
            <div
                ref={scrollRef}
                className="flex-1 min-h-0 overflow-y-auto px-3 py-8 md:px-8 md:py-12"
            >
                <div className="mx-auto flex max-w-3xl flex-col gap-4">
                    <AnimatePresence initial={false}>
                        {messages.map((message, index) => (
                            <div key={message.id}>
                                {!message.type || !uiOnlyTypes.includes(message.type) ? (
                                    <MessageBubble message={message} />
                                ) : null}

                                {/* Recommendation Cards */}

                                {message.content.includes("shortlisted the best Online MBA programmes") &&
                                    recommendations.length > 0 && (
                                        <div className="mt-5 space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 space-x-4">
                                            {recommendations.map(
                                                (programme, i) => (
                                                    <ProgrammeCard
                                                        key={programme.id}
                                                        programme={programme}
                                                        match={94 - i * 3}
                                                        onSelect={(id) =>
                                                            sendMessage(id)
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}

                                {message.content.includes("fee structure for your selected programme") && feeBreakdown && (
                                    <>
                                        <FeeBreakdownCard fee={feeBreakdown} />

                                        {showNextActions && <NextActionsCard />}
                                    </>
                                )}

                                {renderMessageComponent(message)}
                            </div>
                        ))}

                        {/* {feeBreakdown && messages[messages.length - 1].content.includes("fee structure for your selected programme") &&
                            <FeeBreakdownCard fee={feeBreakdown} />
                        }

                        {feeBreakdown && showNextActions &&
                            <NextActionsCard />
                        } */}

                        {(isTyping &&
                            <TypingIndicator key="typing" />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Form Element Area */}
            <div className="bg-gradient-to-t from-[#FAFBFC] via-[#FAFBFC] to-transparent pb-6 pt-2">
                <div className="mx-auto max-w-3xl px-6 md:px-16">

                    {/* Suggestion Chips */}
                    {suggestions.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                            {suggestions.map((option) => (
                                <motion.button
                                    key={option.id}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                        sendMessage(option.value)
                                    }
                                    className="rounded-full border border-border bg-[#b7031bff] text-white px-4 py-2 text-sm transition hover:border-red-500 hover:bg-[#E2374D] hover:cursor-pointer"
                                >
                                    {option.label}
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {/* Chat Text Bar Container Input */}
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-md focus-within:border-slate-300 transition-all">
                            <input
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    if (error) setError("");
                                }}
                                disabled={isInputLocked}
                                placeholder={node.placeholder || "Type your response..."}
                                className="h-10 w-full bg-transparent outline-none px-2 text-[15px] text-[#0F172A] placeholder:text-slate-400 focus:outline-none"
                            />

                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping || isInputLocked}
                                className={`${isInputLocked && "cursor-not-allowed opacity-50"} grid h-10 w-11 place-items-center rounded-xl bg-[#E2374D] text-white transition-all hover:bg-[#C92F42] shadow-sm disabled:opacity-40 disabled:hover:bg-[#E2374D]`}
                            >
                                <Send size={16} className="fill-white/10" />
                            </button>
                        </div>
                        {error && (
                            <p className="mt-2 text-sm text-red-500">
                                {error}
                            </p>
                        )}
                    </form>

                    {/* Lower Hint Info matching Screenshot 2026-06-29 155455.png */}
                    <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400/90">
                        PRESS ENTER TO SEND · ASK ANYTHING ABOUT ONLINE MBA ADMISSIONS
                    </p>
                </div>
            </div>
            {/* Mobile Info Sheet */}
            <MobileInfoSheet
                isOpen={isMobileSheetOpen}
                onClose={() => setIsMobileSheetOpen(false)}
            />
        </section>
    );
}

function formatTime(timestamp: number) {
    const date = new Date(timestamp);

    let hours = date.getHours();
    const minutes = date
        .getMinutes()
        .toString()
        .padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
}

function MessageBubble({ message }: { message: ChatMessage }) {
    //time in am and pm
    const formattedTime =
        message.timestamp > 0
            ? formatTime(message.timestamp)
            : "";

    if (message.role === "user") {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-end gap-1.5"
            >
                {/* Custom shaped speech bubble cornering setup */}
                <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-[#E2374D] px-6 py-4 text-[15px] leading-relaxed text-white font-medium shadow-sm">
                    {message.content}
                </div>
                <span className="text-[11px] font-medium text-slate-400/90 mr-1">
                    {formattedTime}
                </span>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-4"
        >
            {/* Custom Circular Initials Badge Icon Column matching Screenshot 2026-06-29 155455.png */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-[12px] font-bold text-[#DB2777]">
                CP
            </div>

            <div className="flex flex-col gap-1.5 max-w-[80%]">
                <div className="rounded-2xl rounded-tl-sm border border-slate-200/80 bg-white px-6 py-4 shadow-sm">
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-[#334155]">
                        {message.content}
                    </p>

                    {message.role === "assistant" &&
                        message.content.includes("What's your WhatsApp number?") && (
                            <ContactInfoCard type="phone" />
                        )}

                    {message.role === "assistant" &&
                        message.content.includes("What's your email address?") && (
                            <ContactInfoCard type="email" />
                        )}
                </div>
                {formattedTime && (
                    <span className="text-[11px] font-medium text-slate-400/90 ml-1">
                        {formattedTime} • CareerPilot
                    </span>
                )}
            </div>
        </motion.div>
    );
}

function TypingIndicator() {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center self-start ml-8 -mt-4"
        >
            <div className="inline-flex items-center rounded-2xl bg-white px-5 py-3">
                <span className="text-[14px] font-medium text-slate-600">
                    CareerPilot is typing
                </span>
                <span className="flex items-center ml-1">
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            className="text-[20px] font-bold text-slate-600"
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                y: [0, -2, 0],
                            }}
                            transition={{
                                duration: 0.9,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2,
                            }}
                        >
                            .
                        </motion.span>
                    ))}
                </span>
            </div>
        </motion.div>
    );
}

function ContactInfoCard({
    type,
}: {
    type: "phone" | "email";
}) {
    const isPhone = type === "phone";

    return (
        <div className={`mt-3 rounded-xl border ${isPhone ? "border-green-200 bg-green-50" : "border-blue-200 bg-blue-50"} px-4 py-2`}>
            <div className="flex items-center gap-3">
                <div className={`rounded-full bg-white p-1 border ${isPhone ? "border-green-200" : "border-blue-200"}`}>
                    {isPhone ? (
                        <FaWhatsapp className="h-4 w-4 text-green-600" />
                    ) : (
                        <Mail className="h-4 w-4 text-blue-600" />
                    )}
                </div>

                <div>
                    <p className="mt-1 text-xs text-slate-600">
                        {isPhone
                            ? "We'll use this only for admission updates. We never spam."
                            : "We'll email your personalized shortlist and important admission information."}
                    </p>
                </div>
            </div>
        </div>
    );
}