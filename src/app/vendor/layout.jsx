import { PrivateVendorRoute } from '@/components/auth/PrivateVendorRoute';
import LayoutProvider from '@/components/dashboard/layout/LayoutProvider';
import { vendorSidebarLinks } from '@/lib/constants/sidebarLinks';
import React from 'react'

export const metadata = {
    title: "Vendor Panel",
    description: "Apoorv Cab Booking Vendor Panel.",
};

function VendorLayout({ children }) {
    return (
        <PrivateVendorRoute>
            <LayoutProvider sidebarLinks={vendorSidebarLinks}>
                {children}
            </LayoutProvider>
        </PrivateVendorRoute>
    )
}

export default VendorLayout
