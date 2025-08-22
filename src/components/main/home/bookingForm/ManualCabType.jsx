'use cient'
import { getAllCabTypes } from '@/lib/firebase/admin/cabType';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function ManualCabType({ register }) {

    const [cabTypes, setCabTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    // const { data, handleData } = useProductForm();
    const fetchCabTypes = async () => {
        setLoading(true);
        try {
            const res = await getAllCabTypes();
            // console.log(res);
            setCabTypes(res || []);
        } catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCabTypes();
    }, []);

    if (loading || !cabTypes)
        return <Loader2 />

    return (
        <div>
            {/* Cab Type */}
            <div className='grow'>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cab Type <span className="text-red-500">*</span>
                </label>
                <select
                    {...register('cabType', { required: true })}
                    className="w-full px-4 py-1 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                >
                    <option value="">Select Cab Type</option>
                    {cabTypes?.map((cb, idx) => (
                        <option key={idx} value={cb?.name}>{cb?.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default ManualCabType
