import Footer from '@/components/main/Footer';
import Navbar from '@/components/main/navbar/Navbar';
import React, { Suspense } from 'react';
import BookingData from './components/BookingData';

export const dynamic = "force-dynamic";

function page() {
    return (
        <div className='bg-gray-100'>
            <div className='sticky top-0 z-[100]'>
                <Navbar />
            </div>
            <div className='text-black pb-10 pt-1 sm:w-11/12 mx-auto flex flex-col justify-between'>
                <Suspense fallback={<div></div>}>
                    <BookingData />
                </Suspense>
            </div>
            <Footer />
        </div>
    )
}

export default page
