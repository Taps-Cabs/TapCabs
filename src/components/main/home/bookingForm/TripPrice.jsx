import React, { useEffect, useState } from 'react';

function TripPrice({ register, watch, setValue }) {

    const basePrice = watch('basePrice');
    const gstAmount = watch('gstAmount');
    const [totalAmount, setTotalAmount] = useState(basePrice);

    useEffect(() => {
        const base = parseFloat(basePrice);
        const gst = parseFloat(gstAmount);
        const total = base + ((base * gst) / 100);
        setTotalAmount(total.toFixed(2));
        register('totalAmount', { required: true })
        setValue('totalAmount', total.toFixed(2));
    }, [basePrice]);

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            {/* Price Input */}
            <div className="flex-1">
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Base Price <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    defaultValue={0}
                    {...register('basePrice', { required: true })}
                    className="w-full px-4 py-1 rounded-lg border border-gray-300"
                />
            </div>

            {/* GST */}
            <div className="flex-1">
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                    GST (%)
                </label>
                <input
                    type="number"
                    readOnly={true}
                    value={5}
                    {...register('gstAmount', { required: true })}
                    className="w-full px-4 py-1 rounded-lg border border-gray-300"
                />
            </div>

            {/* Total Amount */}
            <div className="flex-1">
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Final Amount (Base + GST)
                </label>
                <input
                    type="number"
                    readOnly
                    value={totalAmount}
                    className="w-full px-4 py-1 rounded-lg border border-gray-300"
                />
            </div>
        </div>
    );
}

export default TripPrice;
