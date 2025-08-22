"use client"

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { getAllLocalTrips, getLocalTripsByCity } from '@/lib/firebase/admin/localTrips';
import LocalTripList from './components/LocalTripList';
import { getAllPickupCities } from '@/lib/firebase/admin/pickupCity';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function page() {
    const [loading, setLoading] = useState(false)
    const [loadingPickupCities, setLoadingPickupCities] = useState(false)
    const [localTrips, setLocalTrips] = useState([])
    const [pickupCities, setPickupCities] = useState([])
    const [selectedPickupCity, setSelectedPickupCity] = useState("all")

    async function fetchPickupCities() {
        setLoadingPickupCities(true)
        try {
            const res = await getAllPickupCities()
            setPickupCities(res)
            // if (res.length > 0) {
            //     setSelectedPickupCity(res[0].name)
            // }
        } catch (error) {
            console.log(error)
        }
        setLoadingPickupCities(false)
    }

    useEffect(() => {
        fetchPickupCities()
    }, [])

    async function fetchLocalTrips() {
        setLoading(true)
        try {
            let res = await (selectedPickupCity == "all" ? getAllLocalTrips() : getLocalTripsByCity(selectedPickupCity))
            setLocalTrips(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchLocalTrips()
    }, [selectedPickupCity])


    return (
        <div>
            <InnerLayout heading={"Local Trips"}>
                <ScrollArea className={'h-full md:pr-4'}>
                    <div className='w-full flex flex-col gap-2'>

                        <div className='w-full flex justify-between px-1'>

                            <p className='font-semibold text-primary'>Total Local Trips: {localTrips?.length}</p>

                            <div className='flex gap-3 items-center justify-center'>
                                <Link href={'/admin/localTrips/form'}>
                                    <Badge className="text-base font-bold cursor-pointer">
                                        Add new Local Trip
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
                                        <SelectItem value={"all"}>
                                            All
                                        </SelectItem>
                                        {pickupCities?.map((city) => (
                                            <SelectItem key={city.id} value={city.name}>
                                                {city.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </div>

                        </div>

                        <LocalTripList
                            loading={loading}
                            localTrips={localTrips}
                        />
                    </div>
                </ScrollArea>
            </InnerLayout>
        </div>
    )
}

export default page