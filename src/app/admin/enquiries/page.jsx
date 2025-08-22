'use client'

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import EnquiriesList from './components/EnquiryList'
import { getAllEnquiries, getEnquiriesByDate } from '@/lib/firebase/admin/enquiry'
import { Loader2 } from 'lucide-react'

function page() {
    const [timeFilter, setTimeFilter] = useState("today");
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchAllEnquiries() {
        setLoading(true)
        try {
            const res = await (timeFilter === "all" ? getAllEnquiries() : getEnquiriesByDate(timeFilter))
            setEnquiries(res)
            // console.log(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    console.log(enquiries)

    useEffect(() => {
        if (timeFilter)
            fetchAllEnquiries()
    }, [timeFilter])

    return (
        <div>
            <InnerLayout heading={"Enquiries"}>
                <div className='pb-3'>
                    <div className='w-full flex justify-between px-1 mb-3'>
                        <div className='flex items-start gap-4'>
                            <p className='font-semibold text-primary'>Total Enquiries: {enquiries?.length}</p>
                            <select name="timeFilter"
                                className='px-2 bg-white rounded-md border border-black'
                                onChange={(e) => setTimeFilter(e.target.value)}
                                defaultValue={timeFilter}
                            >
                                <option value="today">Today</option>
                                <option value="yesterday">Yesterday</option>
                                <option value="last7days">Past 7 days</option>
                                <option value="lastMonth">Past 1 Month</option>
                                <option value="lastYear">Past 1 Year</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        {
                            loading || !enquiries ? <Loader2 className='animate-spin text-primary w-10 h-10 mx-auto mt-20' /> :
                                enquiries?.length > 0
                                    ? <EnquiriesList enquiries={enquiries} fetchAllEnquiries={fetchAllEnquiries} />
                                    : <p className='text-center text-lg font-semibold'>No Enquiries Found</p>
                        }
                    </div>
                </div>
            </InnerLayout>
        </div>
    )
}

export default page
