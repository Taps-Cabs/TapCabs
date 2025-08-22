"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import VariantCard from './VariantCard'
import VariantName from './variant/VariantName'
import VariantMinKm from './variant/VariantMinKm'
import RoundTripPrice from './variant/RoundTripPrice'
import OneWayPrice from './variant/OneWayPrice'
import DriverAllowance from './variant/DriverAllowance'
import { usePickupCityForm } from '../context/PickupCityContext'
import LocalTripPrice from './variant/LocalTripPrice'
import AirportTripPrice from './variant/AirportTripPrice'

function CabVariant() {

    const {
        variant, setVariant, editVariant, setEditVariant, deleteVariant, setDeleteVariant,
        variantList, setVariantList, handleEditVariantList, handleDeleteVariantList
    } = usePickupCityForm();

    function handleAddVariant() {
        const requiredFields = [
            'name',
            'minKilometers',
            'actualPriceRoundTrip',
            'discountedPriceRoundTrip',
            'actualPriceOneWay',
            'discountedPriceOneWay',
            'driverAllowance'
        ];

        if (requiredFields.some(field => !variant[field])) {
            alert("Please fill all the fields before adding the variant.")
            return
        }

        if (editVariant) {
            handleEditVariantList();
            setVariant({
                name: '',
                minKilometers: '',
                actualPriceRoundTrip: '',
                discountedPriceRoundTrip: '',
                actualPriceOneWay: '',
                discountedPriceOneWay: '',
                driverAllowance: '',
            })
            setEditVariant(null);
            return;
        }

        setVariantList(prev => [...prev, variant])
        setVariant({
            name: '',
            minKilometers: '',
            actualPriceRoundTrip: '',
            discountedPriceRoundTrip: '',
            actualPriceOneWay: '',
            discountedPriceOneWay: '',
            driverAllowance: '',
        })
    }

    useEffect(() => {
        // console.log(deleteVariant, variant);
        if (deleteVariant && variant) {
            handleDeleteVariantList();
            setVariant({
                name: '',
                minKilometers: '',
                actualPriceRoundTrip: '',
                discountedPriceRoundTrip: '',
                actualPriceOneWay: '',
                discountedPriceOneWay: '',
                driverAllowance: '',
            })
            setDeleteVariant(null);
        }
    }, [deleteVariant])

    const onEdit = (vr) => {
        setEditVariant(vr);
        setVariant(vr);
    }

    const onDelete = (vr) => {
        setDeleteVariant(vr);
        setVariant(vr);
    }

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg p-6">
            <h2 className='text-2xl text-primary font-bold mb-3'>{editVariant ? "Edit" : "Add"} Cab Types</h2>

            <div className="space-y-4">
                {/* Variant Details Section */}
                <div className="border-b pb-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <VariantName />
                        <VariantMinKm />
                    </div>
                </div>

                {/* Round Trip Pricing Section */}
                <RoundTripPrice />

                {/* One Way Trip Pricing Section */}
                <OneWayPrice />

                {/* Local Trip Pricing Section */}
                <LocalTripPrice />

                {/* Airport Trip Pricing Section */}
                <AirportTripPrice />

                {/* Driver Allowance Section */}
                <DriverAllowance />

                <Button
                    type="button"
                    className="w-full bg-primary text-white hover:opacity-90 transition-all p-6 text-lg -mt-4"
                    onClick={handleAddVariant}
                >
                    {editVariant ? "Update" : "Add"} Cab Type
                </Button>
            </div>

            {/* Display added variants */}
            {variantList.length > 0 && (
                <div className="mt-8 space-y-4">
                    <h3 className="text-xl font-semibold">Added Cab Variants</h3>
                    {variantList.map((v, idx) => (
                        <VariantCard key={idx} variant={{ ...v, id: idx }}
                            onEdit={onEdit} onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CabVariant
