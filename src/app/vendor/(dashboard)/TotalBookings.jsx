'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, MapPinned } from 'lucide-react';
import Link from 'next/link';
import { getVendorAllBookings } from '@/lib/firebase/vendor/vendorBooking';
import useAuthStore from '@/store/useAuthStore';

const TotalBookings = () => {
    const { userData } = useAuthStore()
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchAllVendorBookings() {
        setLoading(true)
        try {
            const res = await getVendorAllBookings(userData?.id);
            setBookings(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAllVendorBookings()
    }, [])


    return (
        <Link href={'/vendor/my-bookings'} >
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 flex items-center justify-between border border-gray-200 dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Bookings</h3>
                    <p className="text-3xl font-bold text-green-400 dark:text-green-200 mt-2">{
                        loading ? <Loader2 className='animate-spin h-6 w-6' /> : bookings?.length
                    }</p>
                </div>
                <div className="bg-green-100 dark:bg-green-400 p-3 rounded-full">
                    <MapPinned className="text-green-400 dark:text-green-200 h-6 w-6" />
                </div>
            </div>
        </Link>
    );
};

export default TotalBookings;
