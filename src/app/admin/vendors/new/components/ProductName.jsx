import React from 'react'
// import { useProductForm } from '../contexts/ProductFormContext';

function ProductName({ register, editVendor, pickupCities }) {

    // const { data, handleData } = useProductForm();

    return (
        <div className='flex flex-col gap-4'>
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    {...register("name", {
                        required: true,
                    })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                    required
                />
            </div>

            {/* Personal Details */}
            <div className='flex gap-4 flex-col sm:flex-row'>
                {/* Email  */}
                <div className='grow'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Delhi, Noida"
                        {...register("email", {
                            required: true,
                        })}
                        // disabled={editVendor}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                        required
                    />
                </div>

                {/* Phone No  */}
                <div className='grow'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone No <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        placeholder="e.g., Delhi, Noida"
                        {...register("phoneNo", {
                            required: true,
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                        required
                    />
                </div>
            </div>

            <div className='flex gap-4 flex-col sm:flex-row'>
                {/* Pickup City */}
                <div className='grow'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register('city', { required: true })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                    >
                        <option value="">Select City</option>
                        {pickupCities.map(city => (
                            <option key={city?.id} value={city?.name}>{city?.name}</option>
                        ))}
                    </select>
                </div>

                {/* Location */}
                <div className='grow'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="eg, Rohini, Delhi"
                        {...register("location", {
                            required: true,
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                        required
                    />
                </div>
            </div>

            {/* Password  */}
            <div className=''>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pssword <span className="text-red-500">*</span>
                </label>
                <input
                    type="password"
                    {...register("password", {
                        required: editVendor ? false : true,
                    })}
                    disabled={editVendor}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                    required
                />
            </div>
        </div>
    )
}

export default ProductName
