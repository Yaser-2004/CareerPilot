"use client";

import {
    useConversation,
    useSelectCounsellingTime,
    useMessages,
} from "@/app/stores/chat.selectors";

import {
    getSlotsForDate,
} from "@/app/services/schedule.service";

export default function ScheduleTimePicker() {

    const selectedDate =
        useConversation().selectedCounsellingDate;

    const messages = useMessages();

    const slots = getSlotsForDate(selectedDate!.iso);

    const selectTime =
        useSelectCounsellingTime();

    return (
        <div className="ml-12 mt-4 flex flex-wrap gap-3">

            {slots.map(slot => (

                <button
                    disabled={messages[messages.length - 1].content !== "Choose a preferred time"}
                    key={slot}
                    onClick={() => selectTime(slot)}
                    className="rounded-full border text-sm border-slate-200 bg-[#E2374D] text-white px-5 py-3 hover:bg-[#E2374D]/80 hover:cursor-pointer transition-all duration-200 hover:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {slot}
                </button>

            ))}

        </div>
    );
}