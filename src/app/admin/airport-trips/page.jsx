"use client"

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { getAirportTripsByCity, getAllAirportTrips } from '@/lib/firebase/admin/airportTrips';
import AirportTripList from './components/AirportTripList';
import { getAllPickupCities } from '@/lib/firebase/admin/pickupCity';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function page() {

    const [loading, setLoading] = useState(false)
    const [loadingPickupCities, setLoadingPickupCities] = useState(false)
    const [pickupCities, setPickupCities] = useState([])
    const [selectedPickupCity, setSelectedPickupCity] = useState()
    const [airportTrips, setAirportTrips] = useState([])

    async function fetchPickupCities() {
        setLoadingPickupCities(true)
        try {
            const res = await getAllPickupCities()
            setPickupCities(res)
            if (res.length > 0) {
                setSelectedPickupCity(res[0].name)
            }
        } catch (error) {
            console.log(error)
        }
        setLoadingPickupCities(false)
    }

    useEffect(() => {
        fetchPickupCities()
    }, [])

    async function fetchAirportTrips() {
        setLoading(true)
        try {
            const res = await getAirportTripsByCity(selectedPickupCity)
            setAirportTrips(res)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAirportTrips()
    }, [selectedPickupCity])

    return (
        <div>
            <InnerLayout heading={"Airport Trips"}>
                <ScrollArea className={'h-full md:pr-4'}>
                    <div className='w-full flex flex-col gap-2'>
                        <div className='w-full flex justify-between px-1'>
                            <p className='font-semibold text-primary'>Total airport Trips: {airportTrips?.length}</p>

                            <div className='flex gap-3 items-center justify-center'>
                                <Link href={'/admin/airport-trips/form'}>
                                    <Badge className="text-base font-bold cursor-pointer">
                                        Add New Airport Trip
                                    </Badge>
                                </Link>

                                <Select
                                    value={selectedPickupCity}
                                    onValueChange={(value) => setSelectedPickupCity(value)}
                                    disabled={loadingPickupCities}
                                >
                                    <SelectTrigger className="w-[220px] bg-white">
                                        <SelectValue placeholder={loadingPickupCities ? "Loading cities..." : "Filter by Pickup City"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {pickupCities?.map((city) => (
                                            <SelectItem key={city.id} value={city.name}>
                                                {city.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </div>
                        </div>

                        <AirportTripList
                            airportTrips={airportTrips}
                            loading={loading}
                            fetchAirportTrips={fetchAirportTrips}
                        />
                    </div>
                </ScrollArea>
            </InnerLayout>
        </div>
    )
}

export default page
