'use client'

import React, { useEffect, useState } from 'react'
import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import { getVendorAllBookings } from '@/lib/firebase/vendor/vendorBooking'
import BookingList from './components/BookingList';
import useAuthStore from '@/store/useAuthStore';

function page() {
    const { userData } = useAuthStore();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchVendorAllBookings() {
        setLoading(true)
        try {
            const res = await getVendorAllBookings(userData?.id)
            setBookings(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchVendorAllBookings()
    }, [])

    return (
        <div>
            <InnerLayout heading={"Bookings"}>
                <div className='pb-3'>
                    <div className='w-full flex justify-between px-1 mb-3'>
                        <div className='flex items-start gap-4'>
                            <p className='font-semibold text-primary'>Total Bookings: {bookings?.length || 0}</p>
                        </div>
                    </div>

                    <div>
                        <BookingList bookings={bookings} />
                    </div>
                </div>
            </InnerLayout>
        </div>
    )
}

export default page
