import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React from 'react'
import Clock from '../admin/(dashboard)/Clock'
import TotalBookings from './(dashboard)/TotalBookings'
import TotalDrivers from './(dashboard)/TotalDrivers'

function page() {
    return (
        <div>
            <InnerLayout heading={'Vendor Dashboard'}>
                <div className='flex flex-col gap-3'>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-3'>
                        <div className='flex flex-col gap-3 h-full'>
                            <TotalBookings />
                        </div>
                        <div className='flex flex-col gap-3 h-full'>
                            <TotalDrivers />
                        </div>
                        <div className='flex flex-col gap-3 h-full'>
                            <Clock />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4 w-full'>
                    </div>
                </div>
            </InnerLayout>
        </div>
    )
}

export default page
