import React from 'react'
import { usePickupCityForm } from '../context/PickupCityContext'
import { Skeleton } from '@/components/ui/skeleton';

function CityName() {

    const { isLoading, handleData, data } = usePickupCityForm();

    // console.log(data)

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor='name' className="text-sm font-medium">City Name</label>
            {isLoading
                ? <Skeleton className="h-10 w-full" />
                : <input
                    type="text"
                    id="name"
                    placeholder='eg. Delhi / Lucknow / Manali'
                    value={data?.name ?? ""}
                    onChange={(e) => handleData('name', e.target.value)}
                    className="border p-2 rounded-md"
                />
            }
        </div>
    )
}

export default CityName
