import React, { Suspense } from 'react'
import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import BookingDetails from './components/BookingDetails';

export const dynamic = "force-dynamic";

export default function page() {

    return (
        <div>
            <InnerLayout heading={"View Booking Details"}>
                <div className='flex justify-center w-full pb-6'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <BookingDetails />
                    </Suspense>
                </div>
            </InnerLayout>
        </div>
    )
}