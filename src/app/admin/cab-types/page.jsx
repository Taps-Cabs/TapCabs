"use client"

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import { Button } from '@/components/ui/button'
import { getAllCabTypes } from '@/lib/firebase/admin/cabType'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Loader2, Users, Briefcase, Pencil } from 'lucide-react'

function Page() {
    const [loading, setLoading] = useState(false)
    const [cabTypes, setCabTypes] = useState([])

    async function fetchCabTypes() {
        setLoading(true)
        try {
            const res = await getAllCabTypes()
            setCabTypes(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchCabTypes()
    }, [])

    return (
        <div>
            <InnerLayout heading={"Cab Types"}>
                <div className='flex justify-between items-center w-full mb-6'>
                    <div className="text-lg font-medium text-muted-foreground">
                        Total Cab Types: {cabTypes?.length}
                    </div>
                    <Link href={'/admin/cab-types/form'}>
                        <Button className="cursor-pointer">Add New</Button>
                    </Link>
                </div>

                {/* Cab Type Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {loading ? (
                        <div className="col-span-full flex justify-center py-10">
                            <Loader2 className="animate-spin w-8 h-8 text-primary" />
                        </div>
                    ) : cabTypes.length === 0 ? (
                        <div className="col-span-full text-center text-muted-foreground py-10">
                            No cab types found.
                        </div>
                    ) : (
                        cabTypes.map((cab) => (
                            <div key={cab.id} className='bg-white shadow-sm border rounded-xl p-4 flex flex-col gap-3 transition hover:shadow-md'>
                                <h2 className='text-xl font-semibold text-primary'>{cab.name}</h2>
                                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                    <Users size={16} /> Seating Capacity: {cab.seatingCapacity}
                                </div>
                                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                    <Briefcase size={16} /> Luggage Capacity: {cab.luggageCapacity}
                                </div>
                                <div className='flex justify-end mt-4'>
                                    <Link href={`/admin/cab-types/form?id=${cab.id}`}>
                                        <Button size="icon" variant="outline" className='cursor-pointer'>
                                            <Pencil size={16} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </InnerLayout>
        </div>
    )
}

export default Page
