import React from 'react'
import { useAirportTripForm } from '../context/airportTripContext'
import { Skeleton } from '@/components/ui/skeleton';

function TripDistance() {

    const { isLoading, handleData, data } = useAirportTripForm();

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor='tripDistance' className="text-sm font-medium">Trip Distance</label>
            {isLoading
                ? <Skeleton className="h-10 w-full" />
                : <input
                    type="number"
                    id="tripDistance"
                    placeholder='eg. 8 / 10'
                    onChange={(e) => handleData('tripDistance', e.target.value)}
                    value={data.tripDistance || ""}
                    className="border p-2 rounded-md"
                />
            }
        </div>
    )
}

export default TripDistance
