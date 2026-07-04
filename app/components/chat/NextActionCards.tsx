import { useAdmissionExpert, useAskAnotherQuestion, useRequestCallback, useScheduleVideoCounselling } from "@/app/stores/chat.selectors";

export default function NextActionsCard() {
    const schedule = useScheduleVideoCounselling();
    const expert = useAdmissionExpert();
    const callback = useRequestCallback();
    const ask = useAskAnotherQuestion();

    return (
        <div className="ml-12 mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <h3 className="font-semibold text-lg">
                What would you like to do next?
            </h3>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">

                <button
                    onClick={schedule}
                    className="rounded-xl bg-[#E2374D] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 hover:cursor-pointer hover:scale-[1.02]"
                >
                    Schedule Video Counselling
                </button>

                <button
                    onClick={expert}
                    className="rounded-xl border border-[#E2374D] px-4 py-3 text-sm font-semibold text-[#E2374D] transition hover:bg-red-50 hover:cursor-pointer hover:scale-[1.02]"
                >
                    Connect with Admission Expert
                </button>

                <button
                    onClick={callback}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:cursor-pointer hover:scale-[1.02]"
                >
                    Request Callback
                </button>

                <button
                    onClick={ask}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:cursor-pointer hover:scale-[1.02]"
                >
                    Ask Another Question
                </button>

            </div>

        </div>
    );
}