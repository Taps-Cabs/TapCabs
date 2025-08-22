"use client"

import React from 'react'
import { useAirportTripForm } from '../../context/airportTripContext'

function VariantPrice({
    valueActual,
    onChangeActual,
    valueDiscount,
    onChangeDiscount
}) {
    const { handleVariant, variant } = useAirportTripForm()

    const actual = valueActual !== undefined ? valueActual : variant.variantAcutalPrice
    const discount = valueDiscount !== undefined ? valueDiscount : variant.variantDiscountedPrice

    const handleActual = (val) => {
        if (onChangeActual) onChangeActual(val)
        else handleVariant('variantAcutalPrice', val)
    }

    const handleDiscount = (val) => {
        if (onChangeDiscount) onChangeDiscount(val)
        else handleVariant('variantDiscountedPrice', val)
    }

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Trip Actual Price</label>
                <input
                    type="number"
                    min={0}
                    value={actual}
                    onChange={(e) => handleActual(e.target.value)}
                    placeholder="Eg. 500"
                    className="input-field"
                />
            </div>

            <div className="flex flex-col mt-4">
                <label className="text-sm font-medium text-gray-700 mb-1">Trip Discounted Price</label>
                <input
                    type="number"
                    min={0}
                    value={discount}
                    onChange={(e) => handleDiscount(e.target.value)}
                    placeholder="Eg. 450"
                    className="input-field"
                />
            </div>
        </div>
    )
}

export default VariantPrice
