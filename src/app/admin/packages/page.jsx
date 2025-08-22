"use client"
import React, { useEffect, useState } from 'react'
import { PackageList } from './components/PackageList'
import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getAllTripPackages } from '@/lib/firebase/admin/tripPackage';

function page() {

    const [loading, setLoading] = useState(false)
    const [packages, setPackages] = useState([])

    async function fetchPackages() {
        setLoading(true)
        try {
            const res = await getAllTripPackages()
            setPackages(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPackages()
    }, [])

    console.log(packages)

    return (
        <InnerLayout heading={'Manage Packages'}>
            <div className='w-full flex flex-col gap-2'>
                <div className='w-full flex justify-between px-1'>
                    <p className='font-semibold text-primary'>Total Packages: {packages?.length}</p>
                    <Link href={'/admin/packages/form'}>
                        <Badge className="text-base font-bold cursor-pointer">
                            Add new Package
                        </Badge>
                    </Link>
                </div>
                <div>
                    {loading ?
                        <div>Loading...</div>
                        : <PackageList packages={packages} />
                    }
                </div>
            </div>
        </InnerLayout>
    )
}

export default page
