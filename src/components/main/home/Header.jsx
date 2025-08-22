import Image from 'next/image';
import React, { Suspense } from 'react';
import BookingForm from './BookingForm';

export const dynamic = "force-dynamic";

function Header() {
    return (
        <div className="pt-0 pb-12 px-4 lg:px-20 xl:px-28">
            <div className="flex flex-col lg:flex-row-reverse  min-h-[83vh] items-center h-full justify-center gap-5 xl:gap-7 max-w-[1500px] mx-auto bg-[#2f1889] p-1 sm:p-10 rounded-xl sm:rounded-4xl">
                {/* LEFT - FORM */}
                <div className="w-full max-w-lg lg:self-start">
                    <div className="rounded-lg sm:rounded-3xl shadow-lg overflow-hidden">
                        <h2 className="text-primary text-center text-3xl font-black bg-white pt-5 pb-5">
                            Book Your Cab Now
                        </h2>
                        <div className="">
                            <Suspense fallback={<div className="text-center py-6"></div>}>
                                <BookingForm />
                            </Suspense>
                        </div>
                    </div>
                </div>

                {/* RIGHT - IMAGE */}
                <div className="w-full flex-1 flex flex-col gap-6 justify-center items-center lg:items-start p-5 sm:p-0">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl md:text-4xl xl:text-5xl mb-5 sm:mb-0 font-extrabold leading-tight text-white">
                            Book Your Ride in Seconds with Taps Cabs
                            <span className="text-white"> Easily</span>.
                        </h1>
                        <p className="mt-1 text-white text-base md:text-lg">
                            From city rides to airport transfers – we’ve got you covered.
                        </p>
                    </div>
                    <Image
                        src="/Audi.png"
                        alt="Main Cab"
                        width={800}
                        height={800}
                        quality={100}
                        className="w-full h-auto max-w-[580px] object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
