// CabType.jsx
"use client"

import React, { useEffect, useState } from 'react'
import { useLocalTripFromForm } from '../../context/localTripContext'
import { getAllCabTypes } from '@/lib/firebase/admin/cabType'
import { Skeleton } from "@/components/ui/skeleton"

function CabType({ value, onChange }) {
    const [cabTypes, setCabTypes] = useState([])
    const [loading, setLoading] = useState(true)

    const { handleVariant, variant, selectedCity } = useLocalTripFromForm()

    useEffect(() => {
        async function fetchCabTypes() {
            try {
                const res = await getAllCabTypes()
                setCabTypes(res)
            } catch (error) {
                console.error('Error fetching cab types:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchCabTypes()
    }, [])

    const selectedValue = value !== undefined ? value : variant.cabType
    const triggerChange = (val) => {
        if (onChange) onChange(val)
        else handleVariant('cabType', val)
    }

    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Variant Name</label>

            {loading ? (
                <Skeleton className="h-10 w-full rounded-md" />
            ) : (
                <select
                    value={selectedValue}
                    onChange={(e) => triggerChange(e.target.value)}
                    className="input-field h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a Cab Type</option>
                    {cabTypes.map((cab) => (
                        selectedCity?.variantList?.filter(i => i.name === cab.name).length > 0 && (
                            <option key={cab.id} value={cab.name}>
                                {cab.name}
                            </option>
                        )
                    ))}
                </select>
            )}
        </div>
    )
}

export default CabType