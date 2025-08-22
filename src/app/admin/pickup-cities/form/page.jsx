'use client'

import React, { Suspense, useState } from 'react'
import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import PickupCityForm from './components/PickupCityForm';

export const dynamic = "force-dynamic";

export default function page() {

    const [editPickup, setEditPickup] = useState(false);

    return (
        <div>
            <InnerLayout heading={editPickup ? "Edit Pickup City" : "Add New Pickup City"}>
                <div className='flex justify-center w-full pb-6'>
                    <Suspense fallback={<div>Loading form...</div>}>
                        <PickupCityForm setEditPickup={setEditPickup} />
                    </Suspense>
                </div>
            </InnerLayout>
        </div>
    )
}