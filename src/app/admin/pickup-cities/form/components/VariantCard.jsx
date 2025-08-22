import React from 'react'

function VariantCard({ variant, onEdit, onDelete }) {
    return (
        <div className="group relative border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {variant.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                            <p className="text-gray-600">
                                <span className="font-medium">One Way:</span>
                                <span className="ml-2">
                                    <span className="line-through text-red-600">₹{variant.actualPriceOneWay}/km</span>
                                    <span className="ml-2 text-green-600">₹{variant.discountedPriceOneWay}/km</span>
                                </span>
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Min KM One Way:</span> {variant.minKilometersOneWay}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Round Trip:</span>
                                <span className="ml-2">
                                    <span className="line-through text-red-600">₹{variant.actualPriceRoundTrip}/km</span>
                                    <span className="ml-2 text-green-600">₹{variant.discountedPriceRoundTrip}/km</span>
                                </span>
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Min KM Round Trip:</span> {variant.minKilometersRoundTrip}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-600">
                                <span className="font-medium">Local Trip Extra Price:</span>
                                <span className="ml-2">
                                    <span className="">₹{variant.extraKilometersLocal}/km</span>
                                    <span className="ml-2">₹{variant.extraHoursLocal}/Hour</span>
                                </span>
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Airport Trip Extra Price:</span>
                                <span className="ml-2">
                                    <span className="">₹{variant.extraKilometersAirport}/km</span>
                                    <span className="ml-2">₹{variant.extraHoursAirport}/Hour</span>
                                </span>
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Min KM:</span> {variant.minKilometers}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Driver Allowance:</span>
                                <span className="ml-2 text-blue-600">₹{variant.driverAllowance}/day</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                    <button
                        type='button'
                        onClick={() => onEdit(variant)}
                        className="p-2 hover:bg-gray-100 rounded-md text-gray-500 hover:text-blue-600 transition-colors"
                        aria-label="Edit variant"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                        </svg>
                    </button>
                    <button
                        type='button'
                        onClick={() => onDelete(variant)}
                        // onClick={onDelete}
                        className="p-2 hover:bg-gray-100 rounded-md text-gray-500 hover:text-red-600 transition-colors"
                        aria-label="Delete variant"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VariantCard