'use client';

import React, { useEffect, useState } from 'react';
import { CarFront, Loader2 } from 'lucide-react';
import { getAllCabTypes } from '@/lib/firebase/admin/cabType';
import Link from 'next/link';

const TotalCabTypes = () => {

    const [cabTypes, setCabTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchAllCabTypes() {
        setLoading(true)
        try {
            const res = await getAllCabTypes();
            setCabTypes(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAllCabTypes()
    }, [])

    return (
        <Link href={'/admin/cab-types'} >
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 flex items-center justify-between border border-gray-200 dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Cab Types</h3>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                        {
                            loading ? <Loader2 className='animate-spin h-6 w-6' /> : cabTypes?.length
                        }
                    </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <CarFront className="text-green-600 dark:text-green-300 h-6 w-6" />
                </div>
            </div>
        </Link>
    );
};

export default TotalCabTypes;
