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
        return Response.json({
            faq: false,

            reply: `Hello! I am here to help you with the admission process. So, ${MBA_FLOW[currentStep].message}`,

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
        return Response.json({
            faq: false,

            reply:
                `😊 Sure! Let's continue with your admission process. \n\n${interpolate(
                    MBA_FLOW[currentStep].message,
                    conversation.profile
                )}`,

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

    // ---------------- FAQ ----------------

    if (intent.intent === "faq") {
        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {

                const currentQuestion =
                    MBA_FLOW[currentStep].message;

                const response = await streamFaqResponse(
                    message,
                    currentStep,
                    currentQuestion,
                    conversation.summary,
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
        return Response.json({
            faq: false,

            reply:
                `😊 Lets not deviate from the topic, lets continue with your admission process. \n\n${interpolate(
                    MBA_FLOW[currentStep].message,
                    conversation.profile
                )}`,

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