import { NextRequest } from "next/server";

import { handleChat } from "@/app/services/chat.service";
import { streamFaqResponse } from "@/app/services/faq.service";
import { detectIntent } from "@/app/services/router.service";

import { MBA_FLOW } from "@/app/data/mbaFlow";
import { ConversationState } from "@/app/types/chat";
import { FlowStep } from "@/app/types/conversation";
import { getSuggestionsForStep } from "./chatHelpers";
import { interpolate } from "@/app/services/flow.service";
import { buildSummary } from "@/app/services/summary.service";
import { getProgrammeData } from "@/app/services/programmeQuery.service";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    const { message, conversation } = (await req.json()) as {
        message: string;
        conversation: ConversationState;
    };

    const currentStep =
        (conversation.phase as FlowStep) ??
        "welcome";

    // ---------------- POST-ONBOARDING FAQ MODE ----------------

    if (conversation.chatMode === "faq" && !conversation.isCompleted) {
        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {

                const response =
                    await streamFaqResponse(
                        message,
                        currentStep,
                        "",
                        conversation.summary,
                        conversation.recommendations,
                    );

                for await (const chunk of response) {

                    const token =
                        chunk.choices[0]?.delta?.content;

                    if (!token) continue;

                    controller.enqueue(
                        encoder.encode(
                            `event: token\n` +
                            `data:${JSON.stringify(token)}\n\n`
                        )
                    );
                }

                controller.enqueue(
                    encoder.encode(
                        `event: done\n` +
                        `data:${JSON.stringify({
                            faq: true,
                            continueFlow: false,
                        })}\n\n`
                    )
                );

                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
    }

    const intent = await detectIntent(
        message,
        currentStep,
        conversation.profile,
        conversation.recommendations
    );

    // ---------- Greeting -----------
    if (intent.intent === "greeting") {
        const replies = [
            "Hello! I am here to help you with the admission process. So,",
            ...(MBA_FLOW[currentStep].messages ?? [MBA_FLOW[currentStep].message!]).map(msg =>
                interpolate(msg, conversation.profile)
            ),
        ];

        return Response.json({
            faq: false,

            replies,

            profileUpdates: {},

            nextStep: conversation.phase,

            phase: conversation.phase,

            suggestions: [],

            recommendations: conversation.recommendations,

            feeBreakdown: conversation.feeBreakdown,

            applyUrl: conversation.applyUrl,

            completed: conversation.isCompleted,
        })
    }

    // ---------- Small Talk ----------

    if (intent.intent === "smalltalk") {
        const replies = [
            "😊 Sure! Let's continue with your admission process.",
            ...(MBA_FLOW[currentStep].messages ?? [MBA_FLOW[currentStep].message!]).map(msg =>
                interpolate(msg, conversation.profile)
            ),
        ];

        return Response.json({
            faq: false,

            replies,

            profileUpdates: {},

            nextStep: conversation.phase,

            phase: conversation.phase,

            suggestions: [],

            recommendations:
                conversation.recommendations,

            feeBreakdown:
                conversation.feeBreakdown,

            applyUrl: conversation.applyUrl,

            completed: conversation.isCompleted,
        });
    }

    // ---------------- FAQ / PROGRAMME DATA ----------------

    if (intent.intent === "faq" || intent.intent === "programme_data") {
        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {

                const node = MBA_FLOW[currentStep];

                const currentQuestion = (
                    node.messages ?? [node.message!]
                ).join("\n\n");

                let programmeData = undefined;
                if (intent.intent === "programme_data") {
                    programmeData = getProgrammeData(message, conversation.profile.chosenProgrammeId) || undefined;
                }

                const response = await streamFaqResponse(
                    message,
                    currentStep,
                    currentQuestion,
                    conversation.summary,
                    conversation.recommendations,
                    programmeData
                );

                for await (const chunk of response) {

                    const token =
                        chunk.choices[0]?.delta
                            ?.content;

                    if (!token) continue;

                    controller.enqueue(
                        encoder.encode(
                            `event: token\n` +
                            `data:${JSON.stringify(
                                token
                            )}\n\n`
                        )
                    );
                }

                controller.enqueue(
                    encoder.encode(
                        `event: done\n` +
                        `data:${JSON.stringify({
                            faq: true,
                            continueFlow: true,
                        })}\n\n`
                    )
                );

                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type":
                    "text/event-stream",
                "Cache-Control":
                    "no-cache",
                Connection: "keep-alive",
            },
        });
    }

    if (intent.intent === "unknown") {

        const node = MBA_FLOW[currentStep];

        const replies = [
            "😊 Let's not deviate from the topic. Let's continue with your admission process.",
            ...(node.messages ?? [node.message!]).map(msg =>
                interpolate(msg, conversation.profile)
            ),
        ];

        return Response.json({
            faq: false,

            replies,

            profileUpdates: {},

            nextStep: conversation.phase,

            phase: conversation.phase,

            suggestions: getSuggestionsForStep(
                conversation.phase,
                conversation.profile
            ),

            recommendations:
                conversation.recommendations,

            feeBreakdown:
                conversation.feeBreakdown,

            applyUrl: conversation.applyUrl,

            completed: conversation.isCompleted,
        });
    }

    // ---------------- FLOW ----------------

    const result = await handleChat(
        message,
        conversation,
        intent.normalizedValue
    );

    const updatedProfile = {
        ...conversation.profile,
        ...result.profileUpdates,
    };

    return Response.json({
        faq: false,
        ...result,
    });
}