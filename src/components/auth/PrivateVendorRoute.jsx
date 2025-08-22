'use client'

import Navigate from "./Navigate";
import useAuthStore from "@/store/useAuthStore";
import Login from "@/components/main/Login";

export const PrivateVendorRoute = ({ children }) => {

    const { userData } = useAuthStore()

    if (!userData)
        return <div className="w-screen h-screen flex justify-center items-center mx-auto bg-gray-100">
            <div className="w-11/12 sm:max-w-xl p-4 bg-white shadow-md rounded-lg">
                <Login />
            </div>
        </div>;

    if (userData?.role !== 'vendor') {
        return <Navigate to='/' />;
    }

    return (
        <div>
            {children}
        </div>
    )
}
