import React, { Suspense } from 'react';
import { CabDetails } from '@/components/main/bookingPage/CabDetails';
import Navbar from '@/components/main/navbar/Navbar';
import Footer from '@/components/main/Footer';

export const dynamic = "force-dynamic";

function page() {
    return (
        <div className='bg-gray-100'>
            <div className='sticky top-0'>
                <Navbar />
            </div>
            <div className='text-black pb-14 pt-7 w-11/12 mx-auto justify-between'>
                {/* <BookingForm /> */}
                <Suspense fallback={<div></div>}>
                    <CabDetails />
                </Suspense>
            </div>
            <Footer />
        </div>
    )
}

export default page
