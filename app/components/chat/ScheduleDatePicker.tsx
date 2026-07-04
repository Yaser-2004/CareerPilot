"use client";

import { getScheduleDays } from "@/app/services/schedule.service";
import { useSelectCounsellingDate, useMessages } from "@/app/stores/chat.selectors";

export default function ScheduleDatePicker() {

    const days = getScheduleDays();
    const messages = useMessages();

    const selectDate = useSelectCounsellingDate();

    return (
        <div className="ml-12 mt-4 flex gap-3 flex-wrap">
            {days.map(day => (
                <button
                    disabled={messages[messages.length - 1].content !== "Choose a preferred date"}
                    key={day.iso}
                    onClick={() => selectDate(day)}
                    className="rounded-full border text-sm border-slate-200 bg-[#E2374D] text-white px-5 py-3 hover:bg-[#E2374D]/80 hover:cursor-pointer transition-all duration-200 hover:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {day.date}
                </button>
            ))}
        </div>
    );
}