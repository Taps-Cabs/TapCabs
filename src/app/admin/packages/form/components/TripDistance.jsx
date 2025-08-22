import React from 'react'
import { useLocalTripFromForm } from '../context/localTripContext'
import { Skeleton } from '@/components/ui/skeleton';

function TripDistance({ updateLocalTripId }) {

    const { isLoading, handleData, data } = useLocalTripFromForm();

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Trip Hours</label>
            {isLoading ? (
                <Skeleton className="h-11 w-full rounded-lg" />
            ) : (
                <input
                    type="number"
                    placeholder="Enter hours"
                    onChange={(e) => handleData('tripHours', e.target.value)}
                    value={data.tripHours || ""}
                    className="h-11 w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400 transition-all outline-none"
                />
            )}
        </div>
    )
}

export default TripDistance
