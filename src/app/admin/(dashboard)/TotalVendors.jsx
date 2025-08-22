'use client';

import React, { useEffect, useState } from 'react';
import { Building2, Loader2 } from 'lucide-react';
import { getAllVendors } from '@/lib/firebase/admin/vendor';
import Link from 'next/link';

const TotalVendors = () => {

    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchAllVendors() {
        setLoading(true)
        try {
            const res = await getAllVendors();
            setVendors(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAllVendors()
    }, [])


    return (
        <Link href={'/admin/vendors'} >
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 flex items-center justify-between border border-gray-200 dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Vendors</h3>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{
                        loading ? <Loader2 className='animate-spin h-6 w-6' /> : vendors?.length
                    }</p>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                    <Building2 className="text-indigo-600 dark:text-indigo-300 h-6 w-6" />
                </div>
            </div>
        </Link>
    );
};

export default TotalVendors;
