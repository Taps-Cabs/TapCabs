import React from 'react'
import { useAirportTripForm } from '../context/airportTripContext'
import { Skeleton } from '@/components/ui/skeleton';

function TripHours() {

    const { isLoading, handleData, data } = useAirportTripForm();

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor='name' className="text-sm font-medium">Trip Hours</label>
            {isLoading
                ? <Skeleton className="h-10 w-full" />
                : <input
                    type="number"
                    id="tripHours"
                    placeholder='eg. 8 / 10'
                    onChange={(e) => handleData('tripHours', e.target.value)}
                    value={data.tripHours || ""}
                    className="border p-2 rounded-md"
                />
            }
        </div>
    )
}

export default TripHours
