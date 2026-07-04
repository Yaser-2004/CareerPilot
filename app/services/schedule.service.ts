export interface ScheduleDay {
    date: string;
    iso: string;
}

export function getScheduleDays(): ScheduleDay[] {
    const days: ScheduleDay[] = [];

    for (let i = 0; i < 3; i++) {
        const d = new Date();

        d.setDate(d.getDate() + i);

        days.push({
            iso: d.toISOString(),
            date: d.toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
            }),
        });
    }

    return days;
}

export function getSlotsForDate(iso: string) {
    const allSlots = [
        "11:00 AM",
        "2:00 PM",
        "4:00 PM",
        "5:00 PM",
        "7:00 PM",
    ];

    const selected = new Date(iso);
    const now = new Date();

    const isToday =
        selected.getDate() === now.getDate() &&
        selected.getMonth() === now.getMonth() &&
        selected.getFullYear() === now.getFullYear();

    if (!isToday) {
        return allSlots;
    }

    return allSlots.filter((slot) => {
        const slotDate = new Date(selected);

        const [time, meridian] = slot.split(" ");

        let [hour] = time.split(":").map(Number);

        if (meridian === "PM" && hour !== 12)
            hour += 12;

        if (meridian === "AM" && hour === 12)
            hour = 0;

        slotDate.setHours(hour, 0, 0, 0);

        return slotDate > now;
    });
}