'use client';

import React, { useEffect, useState } from 'react';
import { Building2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getEnquiriesByDate } from '@/lib/firebase/admin/enquiry';

const TodaysEnquiries = () => {

    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchTodaysEnquiries() {
        setLoading(true)
        try {
            const res = await getEnquiriesByDate("today");
            setEnquiries(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchTodaysEnquiries()
    }, [])


    return (
        <Link href={'/admin/enquiries'} >
            <div className="bg-white flex-1 dark:bg-gray-900 shadow-md rounded-2xl h-full p-6 flex items-center justify-between border border-gray-200 dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Enquiries</h3>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{
                        loading ? <Loader2 className='animate-spin h-6 w-6' /> : enquiries?.length
                    }</p>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                    <Building2 className="text-indigo-600 dark:text-indigo-300 h-6 w-6" />
                </div>
            </div>
        </Link>
    );
};

export default TodaysEnquiries;
