"use client"

import { ClipLoader } from "react-spinners";
import { Clock as ClockIcon } from "lucide-react";
import useTime from "@/hooks/useTime";

export default function Clock() {
    const date = new Date();
    const { finalDate, realTime, timeLoading } = useTime({ date });

    return (
        <div className="bg-white flex-1 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 group flex items-center justify-between">
            <div>
                {!timeLoading ? (
                    <div className="mt-2 space-y-1">
                        <h3 className="text-2xl font-bold text-gray-800">{realTime}</h3>
                        <h3 className="text-sm text-gray-500">{finalDate}</h3>
                    </div>
                ) : (
                    <div className="mt-2">
                        <ClipLoader size={20} color="#4F46E5" />
                    </div>
                )}
            </div>
            <div className="bg-orange-100 dark:bg-orange-400 p-3 rounded-full">
                <ClockIcon className="text-orange-400 dark:text-orange-200 h-6 w-6" />
            </div>
        </div>
    );
}
