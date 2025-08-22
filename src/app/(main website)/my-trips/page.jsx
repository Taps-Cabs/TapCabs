"use client"
import React, { useEffect, useState } from 'react'
import Footer from '@/components/main/Footer';
import Navbar from '@/components/main/navbar/Navbar';
import { getBookingsByUser } from '@/lib/firebase/admin/booking';
import useAuthStore from '@/store/useAuthStore';
import BookingHistory from '@/components/main/MyBookings';
import { ROLE } from '@/lib/constants/constants';
import Navigate from '@/components/auth/Navigate';

function page() {
    const { userData } = useAuthStore()
    const [bookings, setBookings] = useState([]);

    async function fetchBookingsOfUser() {
        const res = await getBookingsByUser(userData?.id)
        setBookings(res);
    }

    useEffect(() => {
        if (userData)
            fetchBookingsOfUser()
    }, [userData])

    // if (userData && userData?.role !== ROLE.CUSTOMER) {
    //     return <Navigate to='/' />;
    // }

    if (!bookings) {
        return <div>No Bookings Yet</div>
    }

    return (
        <div>
            <div className='bg-gray-100'>
                <div className='sticky top-0 z-[100]'>
                    <Navbar />
                </div>
                <div className='text-black min-h-[50vh] pb-10 pt-5 w-11/12 flex flex-col justify-between max-w-6xl mx-auto'>
                    <BookingHistory bookings={bookings} />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default page
