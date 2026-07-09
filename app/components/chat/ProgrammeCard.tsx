"use client";

import { Programme } from "@/app/types/programme";
import { useSetInputLocked } from "@/app/stores/chat.selectors";

interface ProgrammeCardProps {
    programme: Programme;
    match?: number;
    onSelect: (id: string) => void;
}

export default function ProgrammeCard({
    programme,
    match = programme.match ?? 0,
    onSelect,
}: ProgrammeCardProps) {
    const setInputLocked = useSetInputLocked();

    return (
        <div className="rounded-2xl w-full border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {match}% Match
                </span>

                <span className="text-[10px] text-red-600 font-medium bg-red-50 px-2 py-1 rounded-md border border-red-200">
                    NAAC {programme.naacGrade}
                </span>
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
                {programme.university}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
                {programme.programmeName}
            </p>

            <div className="flex gap-3">

                <div className="flex-1 mt-4 space-y-1 text-sm text-slate-600 bg-purple-50 p-2 rounded-lg border border-purple-200">
                    {/* Separated by border between each p */}
                    <p className="py-1">🎓 Online {programme.degree}</p>

                    <p className="py-1">⏳ {programme.duration}</p>

                    <p className="py-1">
                        🪙 ₹
                        {programme.fees.total.toLocaleString(
                            "en-IN"
                        )}
                    </p>
                </div>

                <div className="flex-1 mt-4 space-y-1 text-sm text-slate-600 bg-blue-50 p-2 rounded-lg border border-blue-200">
                    {/* display program specializations here*/}
                    <p className="text-[12px] font-medium py-1">Specializations</p>

                    {/* only upto 6 specializations */}
                    {programme.specializations.slice(0, 6).map((specialization, i) => (
                        <p key={i} className="text-[10px] py-[3px]">· {specialization}</p>
                    ))}
                </div>
            </div>

            <div className="mt-2 bg-green-50 p-2 rounded-lg border border-green-200">
                <p className="text-[12px] text-slate-600 font-medium py-1">Eligibility</p>
                {programme.eligibility.minimumQualification.map((eligibility, i) => (
                    <p key={i} className="text-[10px] text-slate-600">* {eligibility}</p>
                ))}
            </div>

            <button
                onClick={() => {
                    onSelect(programme.id)
                    setInputLocked(true)
                }}
                className="hover:cursor-pointer hover:scale-[1.02] mt-5 w-full rounded-xl bg-[#E2374D] py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
                Choose Programme
            </button>
        </div>
    );
}