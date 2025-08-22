import { PrivateRoute } from '@/components/auth/PrivateRoute';
import LayoutProvider from '@/components/dashboard/layout/LayoutProvider';
import { adminSidebarLinks } from '@/lib/constants/sidebarLinks';
import React from 'react'
import { Toaster } from 'react-hot-toast';

export const metadata = {
    title: "Admin Panel",
    description: "Apoorv Cab Booking Admin Panel.",
};

function AdminLayout({ children }) {
    return (
        <PrivateRoute>
            <Toaster position="top-right" />
            <LayoutProvider sidebarLinks={adminSidebarLinks}>
                {children}
            </LayoutProvider>
        </PrivateRoute>
    )
}

export default AdminLayout
