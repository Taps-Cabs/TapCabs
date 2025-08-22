"use client"

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PickupCityCards from './components/PickupCityCards';
import { getAllPickupCities } from '@/lib/firebase/admin/pickupCity'
import { Loader2 } from 'lucide-react'

function page() {

    const [loading, setLoading] = useState(false)
    const [pickupCities, setPickupCities] = useState([])

    async function fetchPickupCities() {
        setLoading(true)
        try {
            const res = await getAllPickupCities()
            setPickupCities(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPickupCities()
    }, [])

    return (
        <div>
            <InnerLayout heading={"Pickup Cities"}>
                <div className='flex justify-between items-center w-full mb-6'>
                    <div className="text-lg font-medium text-muted-foreground">
                        Total Cities: {pickupCities.length}
                    </div>
                    <Link href={'/admin/pickup-cities/form'}>
                        <Button className="cursor-pointer">Add New</Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="col-span-full flex justify-center py-10">
                        <Loader2 className="animate-spin w-8 h-8 text-primary" />
                    </div>
                ) : pickupCities.length === 0 ? (
                    <div className="col-span-full text-center text-muted-foreground py-10">
                        No Pickup City found.
                    </div>
                ) : (
                    <PickupCityCards pickupCities={pickupCities} />
                )}
            </InnerLayout>
        </div>
    )
}

export default page
