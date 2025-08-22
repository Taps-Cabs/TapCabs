'use client'

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { getAllPickupCities } from '@/lib/firebase/admin/pickupCity';
import { Loader2 } from 'lucide-react';
import { getAllVendors, getVendorsByCity } from '@/lib/firebase/admin/vendor'
import VendorsList from '@/components/admin/VendorsList'

function page() {

    const [loading, setLoading] = useState(false);
    const [vendorLoading, setVendorLoading] = useState(false);
    const [pickupCities, setPickupCities] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [vendorFilter, setVendorFilter] = useState("all");

    useEffect(() => {
        const fetchPickupCities = async () => {
            setLoading(true);
            try {
                const res = await getAllPickupCities();
                setPickupCities(res || []);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchPickupCities();
    }, []);

    async function fetchVendorsByCity() {
        setVendorLoading(true)
        try {
            const res = await (vendorFilter == "all" ? getAllVendors() : getVendorsByCity(vendorFilter));
            setVendors(res)
        } catch (error) {
            console.log(error)
        }
        setVendorLoading(false)
    }

    useEffect(() => {
        if (vendorFilter)
            fetchVendorsByCity()
    }, [vendorFilter])

    // console.log(vendors);

    if (loading || !pickupCities)
        return <Loader2 />

    return (
        <div>
            <InnerLayout heading={"Vendors"}>
                <ScrollArea className={'h-full md:pr-4'}>

                    {/* Vendor Count and new Vendor Button */}
                    <div className='w-full flex flex-col gap-2'>
                        <div className='w-full flex justify-between px-1 mb-3'>
                            <div className='flex items-start gap-4'>
                                <p className='flex gap-2 items-center font-semibold text-primary'>Total Vendors: {
                                    vendorLoading ? <Loader2 size={15} /> : vendors?.length
                                }</p>
                                <select name="timeFilter"
                                    className='px-2 bg-white rounded-md border border-black'
                                    onChange={(e) => setVendorFilter(e.target.value)}
                                    defaultValue={vendorFilter ? vendorFilter : pickupCities[0]}
                                >
                                    <option value={"all"}>All</option>
                                    {
                                        pickupCities && pickupCities?.length > 0 &&
                                        pickupCities?.map(pc => (
                                            <option key={pc?.id} value={pc?.name}>{pc?.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <Link href={'/admin/vendors/new'}>
                                <Badge className="text-base font-bold cursor-pointer">
                                    Add new Vendor
                                </Badge>
                            </Link>
                        </div>

                        {/* Vendor List */}
                        <VendorsList vendorLoading={vendorLoading} vendors={vendors} />
                    </div>
                </ScrollArea>
            </InnerLayout>
        </div>
    )
}

export default page
