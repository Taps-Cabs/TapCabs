import { TRIP_TYPES } from '@/lib/constants/constants'
import React from 'react'
import { motion, LayoutGroup } from 'framer-motion'

function TripType({ tripType, setValue }) {
    return (
        <LayoutGroup>
            <div className="relative flex gap-2 sm:gap-4 mb-2 items-center justify-center pb-3">
                {Object.values(TRIP_TYPES).map(type => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => setValue('tripType', type)}
                        className="relative px-4 sm:px-4 py-2 sm:py-1 rounded-xl text-[12px] sm:text-sm font-semibold transition-all focus:outline-none"
                    >
                        {tripType === type && (
                            <motion.div
                                layoutId="tripTypeBackground"
                                className="absolute inset-0 rounded-xl bg-primary z-0"
                                initial={false}
                                transition={{ type: 'spring', stiffness: 500, damping: 30, duration: 0.1 }}
                            />
                        )}
                        {/* Add 'relative' and 'z-10' to ensure text is above the background */}
                        <span className={`relative z-10 ${tripType === type ? 'text-white' : 'text-gray-600'}`}>
                            {type}
                        </span>
                    </button>
                ))}
            </div>
        </LayoutGroup>
    )
}

export default TripType
