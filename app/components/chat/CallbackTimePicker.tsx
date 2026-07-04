"use client";

import { useSelectCallbackTime, useMessages } from "@/app/stores/chat.selectors";

const slots = [
    "☀️ Morning (9:00 AM – 12:00 PM)",
    "🌤️ Afternoon (12:00 PM – 4:00 PM)",
    "🌙 Evening (4:00 PM – 8:00 PM)",
];

export default function CallbackTimePicker() {

    const messages = useMessages();

    const select =
        useSelectCallbackTime();

    return (

        <div className="mt-4 flex flex-col gap-2 ml-12">

            {slots.map(slot => (

                <button
                    disabled={messages[messages.length - 1].content !== "Choose callback time"}
                    //when disabled no interactions
                    key={slot}
                    onClick={() => select(slot)}
                    className="w-fit rounded-full border text-sm border-slate-200 bg-[#E2374D] text-left text-white px-5 py-3 hover:bg-[#E2374D]/80 hover:cursor-pointer transition-all duration-200 hover:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {slot}
                </button>

            ))}

        </div>
    );
}