import React from 'react'
import { usePickupCityForm } from '../../context/PickupCityContext'
import OneWayTerms from '../OneWayTerms'

function OneWayPrice() {
    const { handleVariant, variant, setVariant, } = usePickupCityForm()

    return (
        <div className="border-b pb-8 ">
            <h3 className="text-lg font-semibold mb-4">One Way Trip Pricing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Minimum Km One Way</label>
                    <input
                        type="number"
                        min={0}
                        value={variant.minKilometersOneWay}
                        onChange={(e) => handleVariant('minKilometersOneWay', e.target.value)}
                        placeholder="Eg. 10"
                        className="input-field"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Actual Price/Km</label>
                    <input
                        type="number"
                        min={0}
                        value={variant.actualPriceOneWay}
                        onChange={(e) => handleVariant('actualPriceOneWay', e.target.value)}
                        placeholder="Eg. 10"
                        className="input-field"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Discounted Price/Km</label>
                    <input
                        type="number"
                        min={0}
                        value={variant.discountedPriceOneWay}
                        onChange={(e) => handleVariant('discountedPriceOneWay', e.target.value)}
                        placeholder="Eg. 8"
                        className="input-field"
                    />
                </div>
            </div>
        </div>
    )
}

export default OneWayPrice
