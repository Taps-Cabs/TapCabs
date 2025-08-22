import { TRIP_TYPES } from '@/lib/constants/constants';
import { ArrowBigRightDashIcon, ArrowRight } from 'lucide-react';
import React from 'react'
import { IoCloseCircle } from 'react-icons/io5';

function DropLocation({ register, tripType, dropOffs, pickupCity, setDropOffs, cities }) {
    return (
        <div>
            {tripType !== 'Local' && (
                <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                        <ArrowRight size={16} className="text-primary" />
                        {tripType === 'Round Trip' ? 'Via Cities' : 'Drop Location'}
                    </label>

                    {
                        tripType === 'Round Trip' && dropOffs.length > 0 &&
                        <div className="flex flex-wrap gap-2 mb-2">
                            <div className="flex items-center gap-1 text-sm p-1 px-2 rounded-2xl bg-yellow-300">
                                <span className="text-gray-600">{pickupCity}</span>
                                <ArrowBigRightDashIcon />
                            </div>
                            {
                                dropOffs.map((city, index) => (
                                    <div key={index} className="flex items-center gap-1 text-sm p-1 px-2 rounded-2xl bg-yellow-300">
                                        <span className="text-gray-600">{city}</span>
                                        <button type="button" onClick={() => setDropOffs((prev) => prev.filter((_, i) => i !== index))} className="text-red-500 hover:text-red-700" >
                                            <IoCloseCircle />
                                        </button>
                                        <ArrowBigRightDashIcon />
                                    </div>
                                ))}
                            <span className="text-sm bg-yellow-300 p-1 px-2 rounded-2xl">
                                {pickupCity}
                            </span>
                        </div>
                    }

                    <select
                        {...register('dropCity', { required: tripType === 'Round Trip' || tripType === 'One Way' })}
                        onKeyDown={e => {
                            if (tripType === 'Round Trip' && e.key === 'Enter') {
                                e.preventDefault();
                                const value = e.target.value;
                                if (value && !dropOffs.includes(value)) {
                                    setDropOffs(prev => [...prev, value]);
                                }
                            }
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    >
                        <option value="">Select City</option>
                        {cities.map(city => (
                            city !== pickupCity && !dropOffs.includes(city) && (
                                <option key={city} value={city}>{city}</option>
                            )
                        ))}
                    </select>
                </div>
            )}
        </div>
    )
}

export default DropLocation
