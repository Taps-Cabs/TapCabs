import { MAIN_WEBSITE } from '@/lib/assets/assets';
import Image from 'next/image';
import React from 'react';
import { FaDollarSign, FaUser, FaClock, FaHeadset } from 'react-icons/fa';

function WhyUs() {
    return (
        <section id='why-us' className="pt-10 pb-24 px-10">
            <div className='max-w-[1200px] mx-auto flex flex-col-reverse sm:flex-row lg:gap-10 items-center'>
                {/* Left Side - Car Image */}
                <div className="mb-12 sm:mb-0 sm:w-1/2 mt-12 sm:mt-0">
                    <Image
                        src={MAIN_WEBSITE.mobile}
                        height={800}
                        width={2000}
                        alt='Rental Car'
                        className="w-full h-auto"
                    />
                </div>

                {/* Right Side - Content */}
                <div className="sm:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                        We offer the best experience <br /> with our rides
                    </h2>

                    <div className="space-y-6">
                        {/* Feature Item */}
                        <div className="flex items-start gap-4">
                            <div className="bg-[#2f188915] p-3 rounded-xl">
                                <FaDollarSign className="text-[#2f1889] text-xl" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900">Best price guaranteed</h4>
                                <p className="text-gray-500 text-sm">
                                    Find a lower price? We’ll refund you 100% of the difference.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-[#2f188915] p-3 rounded-xl">
                                <FaUser className="text-[#2f1889] text-xl" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900">Experienced driver</h4>
                                <p className="text-gray-500 text-sm">
                                    Don’t have a driver? Don’t worry, we have many experienced drivers for you.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-[#2f188915] p-3 rounded-xl">
                                <FaClock className="text-[#2f1889] text-xl" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900">24 hour car availability</h4>
                                <p className="text-gray-500 text-sm">
                                    Book your car anytime and we will never let down your bookings.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-[#2f188915] p-3 rounded-xl">
                                <FaHeadset className="text-[#2f1889] text-xl" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900">24/7 technical support</h4>
                                <p className="text-gray-500 text-sm">
                                    Have a question? Contact TapsCabs support any time when you have a problem.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyUs;
