import React from 'react'
import { Button } from '@/components/ui/button'
import { AddPrice } from './AddPrice'
// import { useProductForm } from '../contexts/ProductFormContext';

function AddVariant() {
    // const { variants, setVariants, variant, setVariant } = useProductForm();

    function handleAddVariant(e) {
        // e.preventDefault();
        // if (!variant?.name) return
        // if (!variant?.actualPrice) return

        // const exists = variants.some(item => item.name === variant.name);

        // if (exists) {
        //     alert("Variant Already Exists");
        //     return;
        // }

        // setVariants(prev => [...prev, variant]);
        // setVariant({});
    }

    function handleVariant(key, value) {
        // setVariant({
        //     ...variant,
        //     [key]: value
        // })
    }

    return (
        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col gap-4">

                {/* Cab Type */}
                <div className="flex flex-col">
                    <label htmlFor="variant-name" className="text-sm font-medium text-gray-700 mb-1">
                        Cab Type
                    </label>
                    <input
                        type="text"
                        id="cab-type"
                        value={''}
                        // value={variant?.name ?? ''}
                        // onChange={(e) => handleVariant('name', e.target.value)}
                        placeholder="Eg. Sedan, SUV(Economy)"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

                {/* Minimum Km Covered */}
                <div className="flex flex-col">
                    <label htmlFor="variant-name" className="text-sm font-medium text-gray-700 mb-1">
                        Minimum Kms Travel
                    </label>
                    <input
                        type="number"
                        id="minKm"
                        value={''}
                        // value={variant?.name ?? ''}
                        // onChange={(e) => handleVariant('name', e.target.value)}
                        placeholder="eg, 200, 300."
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

                {/* Trip Price */}
                <AddPrice />

                <Button
                    className="w-full mt-2 bg-secondary text-white hover:opacity-90 transition-all"
                // onClick={handleAddVariant}
                >
                    Add
                </Button>
            </div>
        </div>
    )
}

export default AddVariant
