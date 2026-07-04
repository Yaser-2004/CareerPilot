// AskAnotherQuestionCard.tsx

"use client";

import { MessageCircle } from "lucide-react";
import { useAskAnotherQuestion } from "@/app/stores/chat.selectors";

export default function AskAnotherQuestionCard() {
    const askAnotherQuestion = useAskAnotherQuestion();

    return (
        <div className="ml-12 rounded-2xl border border-slate-200 shadow-sm bg-white p-5">
            <p className="text-sm text-slate-600">
                Have another question? I'm here to help.
            </p>

            <button
                onClick={askAnotherQuestion}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E2374D] py-3 font-semibold text-white hover:opacity-90 hover:cursor-pointer"
            >
                <MessageCircle size={18} />
                Ask Another Question
            </button>
        </div>
    );
}