"use client"

import React, { useEffect, useState } from 'react'
import { useAirportTripForm } from '../context/airportTripContext'
import { Skeleton } from '@/components/ui/skeleton';
import { getAllPickupCities } from '@/lib/firebase/admin/pickupCity';

function CityName({ updateAirportTripId }) {
    const { isLoading, handleData, data, selectedCity, setSelectedCity } = useAirportTripForm();

    const [loading, setLoading] = useState(true)
    const [citiesList, setCitiesList] = useState()

    async function fetchCities() {
        try {
            const res = await getAllPickupCities()
            setCitiesList(res)
        } catch (error) {
            console.error('Error fetching Pickup Cities:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCities()
    }, [])

    // Set default city if updateAirportTripId is present
    useEffect(() => {
        if (!loading && updateAirportTripId && data?.cityName && citiesList.length > 0) {
            const matchedCity = citiesList.find(city => city.name === data.cityName)
            if (matchedCity) {
                setSelectedCity(matchedCity)
            }
        }
    }, [loading, updateAirportTripId, data?.cityName, citiesList])

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor='name' className="text-sm font-medium">City Name</label>
            {loading ? (
                <Skeleton className="h-10 w-full rounded-md" />
            ) : (
                <select
                    value={selectedCity?.name || ""}
                    onChange={(e) => {
                        handleData('cityName', e.target.value)
                        setSelectedCity(citiesList?.find(i => i.name === e.target.value))
                    }}
                    className="h-11 w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NzY3NjciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im02IDkgNiA2IDYtNiIvPjwvc3ZnPg==')] bg-no-repeat bg-[center_right_1rem]"
                >
                    <option value="">Select City</option>
                    {citiesList.map((city) => (
                        <option key={city.id} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    )
}

export default CityName
