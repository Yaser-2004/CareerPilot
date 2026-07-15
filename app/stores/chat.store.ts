"use client";

import { create } from "zustand";

import { ChatMessage, ChatSuggestion, ConversationState } from "@/app/types/chat";
import { MBA_FLOW } from "../data/mbaFlow";
import { Programme } from "../types/programme";
import { FeeBreakdown } from "../services/fees.service";
import { buildSummary } from "../services/summary.service";
import { getSuggestionsForStep } from "../api/chat/chatHelpers";
import { interpolate } from "../services/flow.service";
import axios from "axios";

const initialConversation: ConversationState = {
    messages: [],

    profile: {},

    phase: "welcome",

    recommendations: [],

    currentSuggestions: [],

    feeBreakdown: null,

    applyUrl: null,

    hasShownRecommendations: false,

    isTyping: false,

    isCompleted: false,

    summary: "",

    chatMode: "flow",

    isInputLocked: false,

    selectedCounsellingDate: undefined,

    isInfoSheetOpen: false,
    infoSheetSection: "profile",
};

interface ChatResult {
    profileUpdates: Record<string, any>;
    recommendations: ConversationState["recommendations"];
    phase: ConversationState["phase"];
    completed: boolean;
}

interface ChatStore {
    conversation: ConversationState;

    typeInitialMessage: () => Promise<void>;

    onAskAnotherQuestion: () => void;

    onScheduleVideoCounselling: () => Promise<void>;

    selectCounsellingDate: (
        day: {
            date: string;
            iso: string;
        }
    ) => Promise<void>;

    selectCounsellingTime: (
        time: string
    ) => Promise<void>;

    connectAdmissionExpert: () => Promise<void>;

    requestCallback: () => Promise<void>;

    selectCallbackTime: (
        slot: string
    ) => Promise<void>;

    setChatMode: (
        mode: "flow" | "faq"
    ) => void;

    setInputLocked: (
        locked: boolean
    ) => void;

    sendMessage: (
        message: string
    ) => Promise<void>;

    resetConversation: () => void;

    openInfoSheet: (section: "profile" | "recommendations" | "fees") => void;
    closeInfoSheet: () => void;
}

interface ChatApiResponse {
    replies: string[];

    profileUpdates: Record<string, any>;

    nextStep: ConversationState["phase"];

    phase: ConversationState["phase"];

    suggestions: ChatSuggestion[];

    recommendations: Programme[];

    feeBreakdown: FeeBreakdown | null;

    applyUrl: string | null;

    completed: boolean;

    summary: string;

    continueFlow?: boolean;

    faq?: boolean;

    chatMode?: "flow" | "faq";

    lockInput?: boolean;

    messageType?: ChatMessage["type"];
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getTypingDelay(char: string) {
    if (char === " ") return 4;

    if (char === ",") return 80;

    if (char === ".") return 100;

    if (char === "?") return 100;

    if (char === "!") return 100;

    if (char === "\n") return 100;

    return 12 + Math.random() * 18;
}

async function typeReply(
    reply: string,
    assistantId: string,
    set: any
) {
    let current = "";

    for (const char of reply) {
        current += char;

        set((state: ChatStore) => ({
            conversation: {
                ...state.conversation,
                messages: state.conversation.messages.map((msg) =>
                    msg.id === assistantId
                        ? {
                            ...msg,
                            content: current,
                        }
                        : msg
                ),
            },
        }));

        await sleep(getTypingDelay(char));
    }
}

function pushUserMessage(
    set: any,
    content: string
) {
    set((state: ChatStore) => ({
        conversation: {
            ...state.conversation,
            messages: [
                ...state.conversation.messages,
                {
                    id: crypto.randomUUID(),
                    role: "user",
                    content,
                    timestamp: Date.now(),
                    type: "text",
                },
            ],
        },
    }));
}

async function showCurrentFlowStep(
    assistantId: string,
    conversation: ConversationState,
    set: any
) {
    const node = MBA_FLOW[conversation.phase];

    const replies = node.messages
        ? node.messages
        : [node.message!];

    await typeReply("Let's get back to the process.", assistantId, set);
    await sleep(350);

    let lastId = assistantId;

    for (const reply of replies) {
        const id = crypto.randomUUID();
        lastId = id;

        set((state: ChatStore) => ({
            conversation: {
                ...state.conversation,
                messages: [
                    ...state.conversation.messages,
                    {
                        id,
                        role: "assistant",
                        content: "",
                        timestamp: Date.now(),
                    },
                ],
            },
        }));

        await typeReply(
            interpolate(reply, conversation.profile),
            id,
            set
        );

        await sleep(350);
    }

    set((state: ChatStore) => ({
        conversation: {
            ...state.conversation,
            messages: state.conversation.messages.map((msg) =>
                msg.id === lastId
                    ? {
                        ...msg,
                        suggestions: getSuggestionsForStep(
                            conversation.phase,
                            conversation.profile
                        ),
                    }
                    : msg
            ),
        },
    }));
}

export const useChatStore = create<ChatStore>(
    (set, get) => ({
        conversation: initialConversation,

        async typeInitialMessage() {
            const state = get();

            // Already initialized
            if (state.conversation.messages.length > 0) return;

            const firstId = crypto.randomUUID();
            const secondId = crypto.randomUUID();

            const firstMessage: ChatMessage = {
                id: firstId,
                role: "assistant",
                content: "",
                timestamp: Date.now(),
            };

            set((state) => ({
                conversation: {
                    ...state.conversation,
                    messages: [firstMessage],
                    isTyping: true,
                },
            }));

            await sleep(600);

            await typeReply(
                `👋 Hi! Welcome to your Online MBA Admission Assistant.

I'll help you discover the best MBA programs based on your education, career goals, and budget.

It takes less than 2 minutes to get your personalized recommendations. 🚀
`,
                firstId,
                set
            );

            await sleep(900);

            const secondMessage: ChatMessage = {
                id: secondId,
                role: "assistant",
                content: "",
                timestamp: Date.now(),
            };

            set((state) => ({
                conversation: {
                    ...state.conversation,
                    messages: [
                        ...state.conversation.messages,
                        secondMessage,
                    ],
                },
            }));

            await sleep(300);

            await typeReply(
                `Let's get started! 😊
What name should I use for your personalized recommendations?`,
                secondId,
                set
            );

            set((state) => ({
                conversation: {
                    ...state.conversation,
                    isTyping: false,
                },
            }));
        },

        async sendMessage(message: string) {
            const userMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "user",
                content: message,
                timestamp: Date.now(),
            };

            const assistantId =
                crypto.randomUUID();

            const assistantMessage: ChatMessage =
            {
                id: assistantId,
                role: "assistant",
                content: "",
                timestamp: Date.now(),
            };

            set((state) => ({
                conversation: {
                    ...state.conversation,

                    messages: [
                        ...state.conversation
                            .messages,

                        userMessage,

                        assistantMessage,
                    ],

                    isTyping: true,
                },
            }));

            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message,
                        conversation: get().conversation,
                    }),
                });

                const contentType =
                    response.headers.get("content-type") ?? "";

                if (contentType.includes("text/event-stream")) {
                    const reader = response.body!.getReader();

                    const decoder = new TextDecoder();

                    let buffer = "";

                    let event = "";

                    while (true) {

                        const { value, done } =
                            await reader.read();

                        if (done) break;

                        buffer += decoder.decode(value);

                        const chunks =
                            buffer.split("\n\n");

                        buffer = chunks.pop() || "";

                        for (const chunk of chunks) {

                            const lines = chunk
                                .split("\n")
                                .filter(Boolean);

                            let data = "";

                            for (const line of lines) {

                                if (line.startsWith("event:")) {
                                    event = line
                                        .replace("event:", "")
                                        .trim();
                                }

                                if (line.startsWith("data:")) {
                                    data += line.replace(
                                        "data:",
                                        ""
                                    );
                                }
                            }

                            if (event === "token") {

                                const token =
                                    JSON.parse(data);

                                set((state) => ({
                                    conversation: {
                                        ...state.conversation,

                                        messages:
                                            state.conversation.messages.map(
                                                (msg) =>
                                                    msg.id ===
                                                        assistantId
                                                        ? {
                                                            ...msg,
                                                            content:
                                                                msg.content +
                                                                token,
                                                        }
                                                        : msg
                                            ),
                                    },
                                }));
                            }

                            if (event === "done") {
                                const result: ChatApiResponse = JSON.parse(data);

                                if (result.faq) {
                                    set((state) => ({
                                        conversation: {
                                            ...state.conversation,
                                            isTyping: false,
                                        },
                                    }));

                                    if (result.continueFlow) {
                                        await sleep(500);

                                        const id = crypto.randomUUID();

                                        set((state) => ({
                                            conversation: {
                                                ...state.conversation,
                                                messages: [
                                                    ...state.conversation.messages,
                                                    {
                                                        id,
                                                        role: "assistant",
                                                        content: "",
                                                        timestamp: Date.now(),
                                                    },
                                                ],
                                                isTyping: true,
                                            },
                                        }));

                                        await showCurrentFlowStep(
                                            id,
                                            get().conversation,
                                            set
                                        );

                                        set((state) => ({
                                            conversation: {
                                                ...state.conversation,
                                                isTyping: false,
                                            },
                                        }));
                                    }
                                } else {
                                    set((state) => {
                                        const updatedProfile = {
                                            ...state.conversation.profile,
                                            ...result.profileUpdates,
                                        };

                                        return {
                                            conversation: {
                                                ...state.conversation,

                                                messages: state.conversation.messages.map((msg) =>
                                                    msg.id === assistantId
                                                        ? {
                                                            ...msg,
                                                            suggestions: result.suggestions,
                                                        }
                                                        : msg
                                                ),

                                                profile: updatedProfile,

                                                summary: buildSummary({
                                                    profile: updatedProfile,
                                                    phase: result.phase,
                                                }),

                                                recommendations: result.recommendations,

                                                currentSuggestions: result.suggestions,

                                                feeBreakdown: result.feeBreakdown,

                                                applyUrl: result.applyUrl,

                                                chatMode:
                                                    result.chatMode ??
                                                    state.conversation.chatMode,

                                                isInputLocked:
                                                    result.lockInput ??
                                                    state.conversation.isInputLocked,

                                                phase: result.phase,

                                                isCompleted: result.completed,

                                                isTyping: false,
                                            },
                                        };
                                    });
                                }
                            }
                        }
                    }
                } else {
                    const data =
                        (await response.json()) as ChatApiResponse;

                    await sleep(700);

                    const replies = data.replies;

                    for (let i = 0; i < replies.length; i++) {
                        if (i > 0) {
                            const newAssistantId = crypto.randomUUID();

                            set((state) => ({
                                conversation: {
                                    ...state.conversation,
                                    messages: [
                                        ...state.conversation.messages,
                                        {
                                            id: newAssistantId,
                                            role: "assistant",
                                            content: "",
                                            timestamp: Date.now(),
                                        },
                                    ],
                                },
                            }));

                            await sleep(300);

                            await typeReply(replies[i], newAssistantId, set);
                        } else {
                            await typeReply(replies[i], assistantId, set);
                        }
                    }

                    set((state) => {
                        const updatedProfile = {
                            ...state.conversation.profile,
                            ...data.profileUpdates,
                        };

                        return {
                            conversation: {
                                ...state.conversation,

                                messages: state.conversation.messages.map((msg) =>
                                    msg.id === assistantId
                                        ? {
                                            ...msg,
                                            suggestions: data.suggestions,
                                        }
                                        : msg
                                ),

                                profile: updatedProfile,

                                summary: buildSummary({
                                    profile: updatedProfile,
                                    phase: data.phase,
                                }),

                                phase: data.phase,

                                recommendations: data.recommendations,

                                currentSuggestions: data.suggestions,

                                feeBreakdown: data.feeBreakdown,

                                applyUrl: data.applyUrl,

                                chatMode:
                                    data.chatMode ??
                                    state.conversation.chatMode,

                                isInputLocked:
                                    data.lockInput ??
                                    state.conversation.isInputLocked,

                                isCompleted: data.completed,

                                isTyping: false,
                            },
                        };
                    });
                }
            } catch (error) {
                console.error(error);

                set((state) => ({
                    conversation: {
                        ...state.conversation,

                        isTyping: false,

                        messages: state.conversation.messages.map(
                            (message) =>
                                message.id ===
                                    assistantId
                                    ? {
                                        ...message,
                                        content:
                                            "Sorry, something went wrong. Please try again.",
                                    }
                                    : message
                        ),
                    },
                }));
            }
        },

        setChatMode(mode) {
            set((state) => ({
                conversation: {
                    ...state.conversation,
                    chatMode: mode,
                },
            }));
        },

        setInputLocked(locked) {
            set((state) => ({
                conversation: {
                    ...state.conversation,
                    isInputLocked: locked,
                },
            }));
        },

        onAskAnotherQuestion: async () => {

            pushUserMessage(
                set,
                "Ask another question"
            );

            const assistantId = crypto.randomUUID();

            set((state) => ({
                conversation: {
                    ...state.conversation,

                    chatMode: "faq",
                    isInputLocked: false,
                    isCompleted: false,

                    messages: [
                        ...state.conversation.messages,
                        {
                            id: assistantId,
                            role: "assistant",
                            content: "",
                            timestamp: Date.now(),
                            type: "text",
                        },
                    ],
                },
            }));

            await typeReply(
                `You're all set! 😊

Feel free to ask me anything about Online MBA programmes, admissions, fees, eligibility, placements, scholarships, or universities. I'm here to help.`,
                assistantId,
                set
            );
        },

        async onScheduleVideoCounselling() {
            pushUserMessage(
                set,
                "Schedule Video Counselling"
            );

            const assistant1 = crypto.randomUUID();
            const assistant2 = crypto.randomUUID();

            set((state) => ({
                conversation: {
                    ...state.conversation,
                    phase: "schedule_date",
                    messages: [
                        ...state.conversation.messages,
                        {
                            id: assistant1,
                            role: "assistant",
                            content: "",
                            timestamp: Date.now(),
                        },
                    ],
                },
            }));

            await typeReply(
                `Great choice! 🎓

Please choose your preferred date and time to book your free counselling session.`,
                assistant1,
                set
            );

            await sleep(300);

            set((state) => ({
                conversation: {
                    ...state.conversation,
                    messages: [
                        ...state.conversation.messages,
                        {
                            id: assistant2,
                            role: "assistant",
                            content: "Choose a preferred date",
                            timestamp: Date.now(),
                            type: "schedule_date",
                        },
                    ],
                },
            }));
        },

        async selectCounsellingDate(day) {

            const userId = crypto.randomUUID();
            const assistantId = crypto.randomUUID();

            set((state) => ({
                conversation: {
                    ...state.conversation,

                    phase: "schedule_time",

                    selectedCounsellingDate: day,

                    messages: [
                        ...state.conversation.messages,

                        {
                            id: userId,
                            role: "user",
                            content: day.date,
                            timestamp: Date.now(),
                            type: "text",
                        },

                        {
                            id: assistantId,
                            role: "assistant",
                            content: "Choose a preferred time",
                            timestamp: Date.now(),
                            type: "schedule_time",
                        },
                    ],
                },
            }));
        },

        async selectCounsellingTime(time) {

            const userId = crypto.randomUUID();
            const assistantId = crypto.randomUUID();
            const assistantId2 = crypto.randomUUID();

            const selectedDate =
                get().conversation.selectedCounsellingDate!;

            await axios.post("/api/lead/update", {
                crmLeadId: get().conversation.profile.crmLeadId,
                updates: {
                    videoCounsellingSlot: {
                        date: selectedDate.iso,
                        time,
                    },
                },
            });

            set((state) => ({
                conversation: {
                    ...state.conversation,

                    profile: {
                        ...state.conversation.profile,

                        videoCounsellingSlot: {
                            date: selectedDate.date,
                            time,
                        },
                    },

                    messages: [
                        ...state.conversation.messages,

                        {
                            id: userId,
                            role: "user",
                            content: time,
                            timestamp: Date.now(),
                            type: "text",
                        },

                        {
                            id: assistantId,
                            role: "assistant",
                            content: "",
                            timestamp: Date.now(),
                            type: "text",
                        },
                    ],
                },
            }));

            await typeReply(
                `🎉 Your free video counselling session has been booked successfully!

Our admission counsellor will connect with you at your selected date and time.

You'll also receive a confirmation on your WhatsApp shortly.`,
                assistantId,
                set
            );

            set((state) => ({
                conversation: {
                    ...state.conversation,
                    messages: [
                        ...state.conversation.messages,
                        {
                            id: crypto.randomUUID(),
                            role: "assistant",
                            content: "",
                            timestamp: Date.now(),
                            type: "ask_another_question",
                        },
                    ],
                    phase: "completed",
                    isCompleted: true,
                    isInputLocked: true,
                },
            }));
        },

        async connectAdmissionExpert() {

            const userId = crypto.randomUUID();
            const assistantId = crypto.randomUUID();

            const leadId =
                get().conversation.profile.crmLeadId;

            if (leadId) {
                await axios.post("/api/lead/update", {
                    crmLeadId: leadId,
                    updates: {
                        admissionExpertRequested: true,
                    },
                });
            }

            set((state) => ({
                conversation: {
                    ...state.conversation,

                    profile: {
                        ...state.conversation.profile,
                        admissionExpertRequested: true,
                    },

                    messages: [
                        ...state.conversation.messages,

                        {
                            id: userId,
                            role: "user",
                            content:
                                "Connect me with an Admission Expert",
                            timestamp: Date.now(),
                            type: "text",
                        },

                        {
                            id: assistantId,
                            role: "assistant",
                            content: "",
                            timestamp: Date.now(),
                            type: "text",
                        },
                    ],
                },
            }));

            await typeReply(
                `You're all set! 🎉

Your request has been successfully shared with one of our admission counsellors.

An expert will connect with you shortly to provide personalized guidance on your selected programme, answer your questions, and assist you with the admission process.

Please keep your phone nearby. We look forward to speaking with you!`,
                assistantId,
                set
            );

            set((state) => ({
                conversation: {
                    ...state.conversation,
                    messages: [
                        ...state.conversation.messages,
                        {
                            id: crypto.randomUUID(),
                            role: "assistant",
                            content: "",
                            timestamp: Date.now(),
                            type: "ask_another_question",
                        },
                    ],
                    phase: "completed",
                    isCompleted: true,
                    isInputLocked: true,
                },
            }));
        },

        async requestCallback() {

            pushUserMessage(
                set,
                "Request Callback"
            );

            const introId = crypto.randomUUID();
            const pickerId = crypto.randomUUID();

            set((state) => ({
                conversation: {
                    ...state.conversation,

                    phase: "callback_time",

                    messages: [
                        ...state.conversation.messages,

                        {
                            id: introId,
                            role: "assistant",
                            content: "",
                            timestamp: Date.now(),
                            type: "text",
                        },

                        {
                            id: pickerId,
                            role: "assistant",
                            content: "Choose callback time",
                            timestamp: Date.now(),
                            type: "callback_slots",
                        },
                    ],
                },
            }));

            await typeReply(
                `Please choose your preferred callback time.`,
                introId,
                set
            );
        },

        async selectCallbackTime(slot) {

            const userId = crypto.randomUUID();
            const assistantId = crypto.randomUUID();
            const assistantId2 = crypto.randomUUID();

            const leadId =
                get().conversation.profile.crmLeadId;

            if (leadId) {
                await axios.post("/api/lead/update", {
                    crmLeadId: leadId,
                    updates: {
                        preferredCallbackTime: slot,
                    },
                });
            }

            set((state) => ({
                conversation: {
                    ...state.conversation,

                    profile: {
                        ...state.conversation.profile,

                        preferredCallbackTime: slot,
                    },

                    messages: [
                        ...state.conversation.messages,

                        {
                            id: userId,
                            role: "user",
                            content: slot,
                            timestamp: Date.now(),
                        },

                        {
                            id: assistantId,
                            role: "assistant",
                            content: "",
                            timestamp: Date.now(),
                            type: "text",
                        },
                    ],
                },
            }));

            await typeReply(
                `We've received your request for a callback.

One of our admission experts will personally connect with you to discuss your selected programme, answer your questions, and guide you through the next steps of the admission process.

We'll do our best to contact you within your preferred time slot.`,
                assistantId,
                set
            );

            set((state) => ({
                conversation: {
                    ...state.conversation,
                    messages: [
                        ...state.conversation.messages,
                        {
                            id: crypto.randomUUID(),
                            role: "assistant",
                            content: "",
                            timestamp: Date.now(),
                            type: "ask_another_question",
                        },
                    ],
                    phase: "completed",
                    isCompleted: true,
                    isInputLocked: true,
                },
            }));
        },

        openInfoSheet(section) {
            set((state) => ({
                conversation: {
                    ...state.conversation,
                    isInfoSheetOpen: true,
                    infoSheetSection: section,
                },
            }));
        },

        closeInfoSheet() {
            set((state) => ({
                conversation: {
                    ...state.conversation,
                    isInfoSheetOpen: false,
                },
            }));
        },

        resetConversation() {
            set({
                conversation:
                    initialConversation,
            });
        },
    })
);