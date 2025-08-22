import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React from 'react'
import CustomPieChart from './(dashboard)/CustomPieChart'
import ConfirmationStatusChart from './(dashboard)/ConfirmationStatusChart'
import TotalVendors from './(dashboard)/TotalVendors'
import TotalCabs from './(dashboard)/TotalCabs'
import Clock from './(dashboard)/Clock'
import VehiclesByType from './(dashboard)/VehiclesByType'
import TotalPickupCities from './(dashboard)/TotalPickupCities'
import TotalCabTypes from './(dashboard)/TotalCabTypes'
import TodaysEnquiries from './(dashboard)/TodaysEnquiries'

function page() {
    return (
        <div>
            <InnerLayout heading={'Admin Dashboard'}>
                <div className='flex flex-col gap-3'>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-3'>
                        <div className='flex flex-col gap-3 h-full'>
                            <TotalPickupCities />
                            <TotalCabTypes />
                        </div>
                        <div className='flex flex-col gap-3 h-full'>
                            <TotalVendors />
                            <TotalCabs />
                        </div>
                        <div className='flex flex-col gap-3 h-full'>
                            <Clock />
                            <TodaysEnquiries />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4 w-full'>
                        <CustomPieChart />
                        <ConfirmationStatusChart />
                    </div>
                </div>
            </InnerLayout>
        </div>
    )
}

export default page
