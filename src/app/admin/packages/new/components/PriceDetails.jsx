"use client"
import React, { useEffect } from 'react'
// import { useProductForm } from '../contexts/ProductFormContext';
import AddVariant from './AddVariant';
// import VariantCart from './VariantCart';

function PriceDetails() {
    // const { data, variants, setVariants } = useProductForm();
    // console.log(variants)
    useEffect(() => {
        // setVariants(data?.variants || [])
    }, [])


    return (
        <div className="w-full border border-gray-300 p-6 rounded-xl shadow-sm bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Price Details</h2>
            </div>

            <div className="flex flex-col-reverse lg:flex-row gap-6">
                <AddVariant />
                <div className="flex flex-col gap-3 w-full lg:w-3/4">
                    {/* {variants?.length > 0 ? (
                        variants.map((item, idx) => (
                            <VariantCart item={item} key={idx} idx={idx} />
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 italic">No Variants added yet.</p>
                    )} */}
                </div>
            </div>
        </div>
    )
}

export default PriceDetails
