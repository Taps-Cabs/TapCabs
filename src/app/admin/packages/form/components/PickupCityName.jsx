"use client"

import React, { useEffect, useState } from 'react'
import { useLocalTripFromForm } from '../context/localTripContext'
import { Skeleton } from '@/components/ui/skeleton';
import { getAllPickupCities } from '@/lib/firebase/admin/pickupCity';

function PickupCityName({ updateLocalTripId }) {
    const { isLoading, handleData, data, selectedCity, setSelectedCity } = useLocalTripFromForm();

    const [loading, setLoading] = useState(true)
    const [citiesList, setCitiesList] = useState([])

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

    // Fetch cities on mount
    useEffect(() => {
        fetchCities()
    }, [])

    // Set default city if updateLocalTripId is present
    useEffect(() => {
        if (!loading && updateLocalTripId && data?.pickupCity && citiesList.length > 0) {
            const matchedCity = citiesList.find(city => city.name === data.pickupCity)
            if (matchedCity) {
                setSelectedCity(matchedCity)
            }
        }
    }, [loading, updateLocalTripId, data?.pickupCity, citiesList])

    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Pickup City</label>
            {loading ? (
                <Skeleton className="h-6 w-full rounded-lg" />
            ) : (
                <select
                    value={data?.pickupCity || selectedCity?.name || ''}
                    onChange={(e) => {
                        handleData('pickupCity', e.target.value)
                        setSelectedCity(citiesList?.find(i => i.name === e.target.value))
                    }}
                    className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NzY3NjciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im02IDkgNiA2IDYtNiIvPjwvc3ZnPg==')] bg-no-repeat bg-[center_right_1rem]"
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

export default PickupCityName
