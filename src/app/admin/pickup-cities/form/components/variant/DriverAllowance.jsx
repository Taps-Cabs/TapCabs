import React from 'react'
import { usePickupCityForm } from '../../context/PickupCityContext'

function DriverAllowance() {

    const { handleVariant, variant, setVariant, } = usePickupCityForm()

    return (
        <div className="pb-8">
            <h3 className="text-lg font-semibold">Driver Allowance</h3>
            <div className="max-w-xs">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Daily Allowance</label>
                    <input
                        type="number"
                        min={0}
                        value={variant.driverAllowance}
                        onChange={(e) => handleVariant('driverAllowance', e.target.value)}
                        placeholder="Eg. 500"
                        className="input-field"
                    />
                </div>
            </div>
        </div>
    )
}

export default DriverAllowance
