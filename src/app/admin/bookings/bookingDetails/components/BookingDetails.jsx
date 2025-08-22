"use client";
import React, { useEffect, useState } from "react";
import { getBookingDetails } from "@/lib/firebase/admin/booking";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
    Pencil,
    Trash,
    UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingSkeleton from "./BookingSkeleton";
import BookingFullDetails from "./BookingFullDetails";
import UpdateBookingDialog from "./UpdateBookingDialog";
import { getVendorDetails } from "@/lib/firebase/admin/vendor";

function BookingDetails() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("id");

    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState({});
    const [assignedVendor, setAssignedVendor] = useState(null)

    async function fetchOneBookingDetails() {
        setLoading(true);
        try {
            const res = await getBookingDetails(bookingId);
            setBooking(res);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    async function getVendor() {
        setLoading(true);
        const id = booking?.status?.vendor;
        try {
            const res = await getVendorDetails(id);
            setAssignedVendor(res);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchOneBookingDetails();
    }, []);

    useEffect(() => {
        if (booking) {
            getVendor();
        }
    }, [booking]);

    console.log(booking)

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (loading) {
        return <BookingSkeleton />;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="mx-auto">
                <div className="flex mb-4 justify-between items-center w-full">
                    <h1 className="text-black font-semibold text-xl">Booking Details</h1>
                    <div className="flex items-center justify-center gap-3">
                        <Button
                            variant={"outline"}
                            className={
                                "hover:text-green-600 hover:border-green-600 hover:bg-white"
                            }
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <Pencil />
                            <span className="hidden sm:block"> Update</span>
                        </Button>
                        {/* <Button
                            variant={"outline"}
                            className={
                                "hover:text-red-600 hover:border-red-600 hover:bg-white"
                            }
                        >
                            <Trash /> <span className="hidden sm:block"> Delete</span>
                        </Button> */}
                    </div>
                </div>
                <BookingFullDetails booking={booking} vendor={assignedVendor} />

                <UpdateBookingDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    booking={booking}
                    fetchOneBookingDetails={fetchOneBookingDetails}
                />
            </div>
        </div>
    );
}

export default BookingDetails;
