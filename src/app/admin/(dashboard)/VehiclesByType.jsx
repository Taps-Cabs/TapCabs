'use client';

import React from 'react';
import { Car, CarFront, CarTaxiFront, Truck } from 'lucide-react';
import { VENDORS } from '@/lib/constants/constants';

const VehiclesByType = () => {
    const allCabs = VENDORS.flatMap(vendor => vendor.cabs);

    const hatchbackCount = allCabs.filter(cab => cab.vehicleType.toLowerCase() === 'hatchback').length;
    const sedanCount = allCabs.filter(cab => cab.vehicleType.toLowerCase() === 'sedan').length;
    const suvCount = allCabs.filter(cab => cab.vehicleType.toLowerCase() === 'suv').length;
    const muvCount = allCabs.filter(cab => cab.vehicleType.toLowerCase() === 'muv').length;

    const types = [
        { label: 'Hatchback', count: hatchbackCount, icon: <Car className="text-blue-500 w-5 h-5" /> },
        { label: 'Sedan', count: sedanCount, icon: <CarFront className="text-purple-500 w-5 h-5" /> },
        { label: 'SUV', count: suvCount, icon: <Truck className="text-green-500 w-5 h-5" /> },
        { label: 'MUV', count: muvCount, icon: <CarTaxiFront className="text-orange-500 w-5 h-5" /> },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Vehicles by Type</h3>
            <ul className="space-y-3">
                {types.map((type) => (
                    <li key={type.label} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {type.icon}
                            <span className="text-gray-600 dark:text-gray-300">{type.label}</span>
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white">{type.count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VehiclesByType;
