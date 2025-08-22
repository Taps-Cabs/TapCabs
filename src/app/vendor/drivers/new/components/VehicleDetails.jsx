import { getPickupCityDetailsbyCityName } from '@/lib/firebase/admin/pickupCity';
import useAuthStore from '@/store/useAuthStore';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
// import { useProductForm } from '../contexts/ProductFormContext';

function VehicleDetails({ register }) {

    const { userData } = useAuthStore();
    const [cabTypes, setCabTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    // const { data, handleData } = useProductForm();
    const fetchPickupCityCabTypes = async () => {
        setLoading(true);
        try {
            const res = await getPickupCityDetailsbyCityName(userData?.city);
            // console.log(res);
            setCabTypes(res?.variantList || []);
        } catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userData)
            fetchPickupCityCabTypes();
    }, []);

    if (loading || !cabTypes)
        return <Loader2 />

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-4 flex-col sm:flex-row'>
                {/* Cab Type */}
                <div className='grow'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cab Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register('cabType', { required: true })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                    >
                        <option value="">Select Cab Type</option>
                        {cabTypes?.map((cb, idx) => (
                            <option key={idx} value={cb?.name}>{cb?.name}</option>
                        ))}
                    </select>
                </div>

                {/* Vehicle Name */}
                <div className='grow'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vehicle Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="eg, Wagon r, Innova"
                        {...register("vehicleName", {
                            required: true,
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                        required
                    />
                </div>
            </div>

            <div className='flex gap-4 flex-col sm:flex-row'>
                {/* Vehicle Nubmer */}
                <div className='grow'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vehicle Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="eg, DLG16578"
                        {...register("vehicleNumber", {
                            required: true,
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                        required
                    />
                </div>

                {/* Vehicle Model */}
                <div className='grow'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model/Year <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="eg, 2014, 2016"
                        {...register("vehicleYear", {
                            required: true,
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                        required
                    />
                </div>
            </div>
        </div>
    )
}

export default VehicleDetails
