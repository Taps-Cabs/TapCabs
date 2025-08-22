'use client'

import InnerLayout from '@/components/dashboard/layout/InnerLayout';
import React, { useEffect, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { VENDORS } from '@/lib/constants/constants';
import useAuthStore from '@/store/useAuthStore';
import { getVendorAllDrivers } from '@/lib/firebase/vendor/driver';
import { Loader2 } from 'lucide-react';

function page() {

    const { userData } = useAuthStore();
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDrivers = async () => {
        setLoading(true);
        try {
            const res = await getVendorAllDrivers(userData?.id);
            // console.log(res);
            setDrivers(res || []);
        } catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    if (loading || !drivers)
        return <Loader2 />

    return (
        <div>
            <InnerLayout heading={"Drivers"}>
                <ScrollArea className={'h-full md:pr-4'}>

                    {/* Driver Count and new Driver Button */}
                    <div className='w-full flex flex-col gap-2'>
                        <div className='w-full flex justify-between px-1'>
                            <p className='font-semibold text-primary'>Total Drivers: {drivers?.length}</p>
                            <Link href={'/vendor/drivers/new'}>
                                <Badge className="text-base font-bold cursor-pointer">
                                    Add new Driver
                                </Badge>
                            </Link>
                        </div>

                        {/* Driver List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {
                                drivers && !drivers?.length
                                    ? (<p>No drivers added yet</p>)
                                    : (
                                        drivers?.map((driver, idx) => (
                                            <Card key={idx}>
                                                <CardContent className="p-4 py-0 space-y-2">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-purple-700">{driver?.name}</h3>
                                                        <p className="text-sm text-muted-foreground">{userData?.name}</p>
                                                    </div>

                                                    <div className="text-sm">
                                                        <p><strong>Email:</strong> {driver?.email}</p>
                                                        <p><strong>Contact:</strong> {driver?.phoneNo}</p>
                                                    </div>

                                                    <Separator />

                                                    <div className="space-y-2">
                                                        <p className="text-sm font-medium">Vehicle Details:</p>
                                                        <div className="border rounded-md p-2 bg-muted/30">
                                                            <div className="flex flex-wrap justify-between items-center mb-1">
                                                                <span className="font-semibold">{driver?.vehicleName}</span>
                                                                <Badge className="text-xs">
                                                                    {driver?.cabType}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-sm">Veicle Number: {driver?.vehicleNumber}</p>
                                                            <p className="text-sm">Vehicle Model: {driver.vehicleYear}</p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    )
                            }
                        </div>
                    </div>
                </ScrollArea>
            </InnerLayout>
        </div>
    )
}

export default page
