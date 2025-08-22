import React from 'react'
import { useLocalTripFromForm } from '../context/localTripContext'
import { Skeleton } from '@/components/ui/skeleton';

function TripDistance({ updateLocalTripId }) {

    const { isLoading, handleData, data } = useLocalTripFromForm();

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Trip Distance (Kms)</label>
            {isLoading ? (
                <Skeleton className="h-11 w-full rounded-lg" />
            ) : (
                <input
                    type="number"
                    placeholder="Enter Distance"
                    onChange={(e) => handleData('tripDistance', e.target.value)}
                    value={data.tripDistance || ""}
                    className="border p-2 rounded-md"
                />
            )}
        </div>
    )
}

export default TripDistance
