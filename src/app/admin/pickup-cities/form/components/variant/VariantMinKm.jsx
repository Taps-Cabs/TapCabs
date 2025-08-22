import React from 'react'
import { usePickupCityForm } from '../../context/PickupCityContext'

function VariantMinKm() {
    const { handleVariant, variant, setVariant, } = usePickupCityForm()

    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Minimum Kilometers</label>
            <input
                type="number"
                min={0}
                value={variant.minKilometers}
                onChange={(e) => handleVariant('minKilometers', e.target.value)}
                placeholder="Eg. 120"
                className="input-field"
            />
        </div>
    )
}

export default VariantMinKm
