import {
    Home,
    ReceiptIndianRupee,
    User,
    Truck,
    Building,
    Package,
    MapPinned,
    Car,
    Pin,
    HelpCircleIcon,
    File,
} from "lucide-react";
import { FaHelicopter } from "react-icons/fa";

// Admin Sidebar
export const adminSidebarLinks = [
    {
        href: "/admin",
        label: "Dashboard",
        icon: <Home />,
    },
    {
        href: "/admin/enquiries",
        label: "Enquiries",
        icon: <HelpCircleIcon />,
    },
    {
        href: "/admin/bookings",
        label: "Bookings",
        icon: <ReceiptIndianRupee />,
    },
    {
        href: "/admin/vendors",
        label: "Vendors",
        icon: <Building />,
    },
    {
        href: "/admin/localTrips",
        label: "Local Trips",
        icon: <Pin />,
    },
    {
        href: "/admin/airport-trips",
        label: "Airport Trips",
        icon: <FaHelicopter />,
    },
    {
        href: "/admin/pickup-cities",
        label: "Pickup Cities",
        icon: <MapPinned />,
    },
    {
        href: "/admin/cab-types",
        label: "Cab Types",
        icon: <Car />,
    },
    {
        href: "/admin/packages",
        label: "Packages",
        icon: <Package />,
    },
    {
        href: "/admin/blogs",
        label: "Blogs",
        icon: <File />,
    },
];

// User Sidebar
export const userSidebarLinks = [
    {
        href: "/user",
        label: "My Profile",
        icon: <User />,
    },
    {
        href: "/user/my-bookings",
        label: "My Bookings",
        icon: <ReceiptIndianRupee />,
    },
];

// Vendor Sidebar
export const vendorSidebarLinks = [
    {
        href: "/vendor",
        label: "Dashboard",
        icon: <Home />,
    },
    {
        href: "/vendor/my-bookings",
        label: "My Bookings",
        icon: <ReceiptIndianRupee />,
    },
    {
        href: "/vendor/drivers",
        label: "Drivers",
        icon: <Truck />,
    },
];
