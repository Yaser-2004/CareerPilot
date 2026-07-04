"use client";

import { FeeBreakdown } from "@/app/services/fees.service";

interface Props {
    fee: FeeBreakdown;
}

export default function FeeBreakdownCard({
    fee,
}: Props) {

    return (
        <div className="ml-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
                Fee Breakdown
            </h3>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-base font-semibold">
                    <span>Total Fee</span>

                    <span>
                        ₹{fee.totalFee.toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Per Semester</span>

                    <span>
                        ₹{fee.semesterFee?.toLocaleString("en-IN")}
                    </span>
                </div>
            </div>

            <div className="mt-4 text-sm text-green-800 py-2 text-center w-full rounded-lg border border-green-200 bg-green-50">
                Exclusive Scholarship of Up to <span className="font-semibold">20%</span>
            </div>

            <hr className="mt-8 mb-8 opacity-10" />

            {fee.emiAvailable && (
                <div className="mt-5 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                    EMI Available

                    {fee.emiPerMonth && (
                        <div className="mt-1 font-semibold">
                            ₹
                            {fee.emiPerMonth.toLocaleString(
                                "en-IN"
                            )}
                            /month
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}