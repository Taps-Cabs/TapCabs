"use client"
import { motion } from 'framer-motion'
import {
    CarFront,
    Smile,
    Clock,
    MapPin
} from 'lucide-react'

export default function Facts() {
    const stats = [
        { icon: <CarFront size={40} />, value: "200+ Cars", label: "Well-maintained & comfortable vehicles" },
        { icon: <Smile size={40} />, value: "20,000+", label: "Happy Customers Rated 4.9/5" },
        { icon: <Clock size={40} />, value: "99%", label: "On-Time Rides Guarantee" },
        { icon: <MapPin size={40} />, value: "15+ Cities", label: "Expanding Presence Daily" }
    ]

    return (
        <section className="relative py-16 bg-[#2f1889] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 opacity-10 z-0"
                style={{
                    backgroundImage: "url('/car-vector.png')",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(0) invert(0.1)'
                }}
            />

            <div className="max-w-[1000px] mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Trusted by Thousands Across the City
                    </h2>
                    <p className="text-gray-200 text-xl">
                        Here’s what makes Taps Cabs the preferred choice
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="text-white mb-4">{stat.icon}</div>
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    {stat.value}
                                </h3>
                                <p className="text-gray-200 text-sm leading-relaxed">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
