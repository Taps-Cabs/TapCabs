'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, MapPinned } from 'lucide-react';
import Link from 'next/link';
import useAuthStore from '@/store/useAuthStore';
import { getVendorAllDrivers } from '@/lib/firebase/vendor/driver';

const TotalDrivers = () => {
    const { userData } = useAuthStore()
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchAllVendorDrivers() {
        setLoading(true)
        try {
            const res = await getVendorAllDrivers(userData?.id);
            setBookings(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAllVendorDrivers()
    }, [])


    return (
        <Link href={'/vendor/my-bookings'} >
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 flex items-center justify-between border border-gray-200 dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Drivers</h3>
                    <p className="text-3xl font-bold text-blue-400 dark:text-blue-200 mt-2">{
                        loading ? <Loader2 className='animate-spin h-6 w-6' /> : bookings?.length
                    }</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-400 p-3 rounded-full">
                    <MapPinned className="text-blue-400 dark:text-blue-200 h-6 w-6" />
                </div>
            </div>
        </Link>
    );
};

export default TotalDrivers;
