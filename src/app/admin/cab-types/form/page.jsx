import React, { Suspense } from 'react'
import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import CabTypeForm from './components/CabTypeForm ';

export const dynamic = "force-dynamic";

export default function page() {

    return (
        <div>
            <InnerLayout heading={"Add New Cab Type"}>
                <div className='flex justify-center w-full'>
                    <Suspense fallback={<div>Loading form...</div>}>
                        <CabTypeForm />
                    </Suspense>
                </div>
            </InnerLayout>
        </div>
    )
}