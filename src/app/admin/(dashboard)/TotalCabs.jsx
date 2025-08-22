'use client';

import React, { useEffect, useState } from 'react';
import { CarFront, Loader2 } from 'lucide-react';
import { getAllDrivers } from '@/lib/firebase/vendor/driver';
import Link from 'next/link';

const TotalCabs = () => {

    const [drivers, setDrviers] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchAllDrivers() {
        setLoading(true)
        try {
            const res = await getAllDrivers();
            setDrviers(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAllDrivers()
    }, [])

    return (
        <Link href={'/admin/vendors'} >
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 flex items-center justify-between border border-gray-200 dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Cabs</h3>
                    <p className="text-3xl font-bold text-red-500 dark:text-red-200 mt-2">
                        {
                            loading ? <Loader2 className='animate-spin h-6 w-6' /> : drivers?.length
                        }
                    </p>
                </div>
                <div className="bg-red-200 dark:bg-red-500 p-3 rounded-full">
                    <CarFront className="text-red-500 dark:text-red-200 h-6 w-6" />
                </div>
            </div>
        </Link>
    );
};

export default TotalCabs;
