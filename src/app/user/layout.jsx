import LayoutProvider from '@/components/dashboard/layout/LayoutProvider';
import { userSidebarLinks } from '@/lib/constants/sidebarLinks';
import React from 'react'

export const metadata = {
    title: "User Panel",
    description: "Apoorv Cab Booking User Panel.",
};

function UserLayout({ children }) {

    // if (!user) {
    //     return <Auth />;
    // }

    return (
        <div>
            <LayoutProvider sidebarLinks={userSidebarLinks}>
                {children}
            </LayoutProvider>
        </div>
    )
}

export default UserLayout
