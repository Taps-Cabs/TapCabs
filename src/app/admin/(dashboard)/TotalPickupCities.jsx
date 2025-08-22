'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, MapPinned } from 'lucide-react';
import { getAllPickupCities } from '@/lib/firebase/admin/pickupCity';
import Link from 'next/link';

const TotalPickupCities = () => {

    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchAllPickupCities() {
        setLoading(true)
        try {
            const res = await getAllPickupCities();
            setCities(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAllPickupCities()
    }, [])


    return (
        <Link href={'/admin/pickup-cities'} >
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 flex items-center justify-between border border-gray-200 dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Pickup Cities</h3>
                    <p className="text-3xl font-bold text-orange-400 dark:text-orange-200 mt-2">{
                        loading ? <Loader2 className='animate-spin h-6 w-6' /> : cities?.length
                    }</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-400 p-3 rounded-full">
                    <MapPinned className="text-orange-400 dark:text-orange-200 h-6 w-6" />
                </div>
            </div>
        </Link>
    );
};

export default TotalPickupCities;
