'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { MAIN_WEBSITE } from '@/lib/assets/assets';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/app/globals.css';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const testimonials = [
    {
        id: 1,
        name: 'Rahul Kumar',
        location: 'From Mumbai, India',
        rating: 5,
        text: "I feel very secure when using TapsCabs's services. Your customer care team is very enthusiastic and the driver is always on time.",
        image: MAIN_WEBSITE.client1,
    },
    {
        id: 2,
        name: 'Priya Singh',
        location: 'From Delhi, India',
        rating: 5,
        text: "I’ve been using your services for years. Your service is great, I will continue to use your service.",
        image: MAIN_WEBSITE.client2,
    },
    {
        id: 3,
        name: 'Arjun Patel',
        location: 'From Bangalore, India',
        rating: 5,
        text: "Everything was perfect! The process was smooth, and the car delivery was on time.",
        image: MAIN_WEBSITE.client3,
    },
];


const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};

export default function Testimonials() {
    return (
        <section id='testimonials' className="bg-[#f5faff] py-16 px-4 md:px-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#2f1889] mt-4">
                    What people say about us?
                </h2>
            </div>
            <div className='max-w-[1200px] mx-auto'>
                <Slider className='' {...sliderSettings}>
                    {testimonials.map((item) => (
                        <div key={item.id} className="px-4">
                            <div className="h-full flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden min-h-[420px]">
                                {/* Image */}
                                <div className="md:w-1/2 h-64 md:h-auto relative">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="absolute inset-0"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8 flex flex-col justify-center md:w-1/2 h-full">
                                    <div className="flex items-baseline gap-1 text-2xl font-bold text-gray-800">
                                        {item.rating.toFixed(1)}
                                        <span className="text-base font-medium">stars</span>
                                    </div>
                                    <div className="flex items-center text-yellow-500 mt-1 mb-4">
                                        {Array.from({ length: item.rating }).map((_, idx) => (
                                            <FaStar key={idx} />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-sm mb-6 flex-1">“{item.text}”</p>
                                    <div className="font-semibold text-gray-800">{item.name}</div>
                                    <div className="text-gray-400 text-sm">{item.location}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
