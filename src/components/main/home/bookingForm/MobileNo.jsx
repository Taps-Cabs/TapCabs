import { Phone } from 'lucide-react'
import React from 'react'

function MobileNo({ register }) {
    return (
        <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-1">
                <Phone size={16} className="text-primary" />
                Mobile Number
            </label>
            <input
                type="tel"
                placeholder="10-digit number"
                {...register('mobileNumber', {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                })}
                className="w-full px-4 py-1 rounded-lg border border-gray-300"
            />
        </div>
    )
}

export default MobileNo
