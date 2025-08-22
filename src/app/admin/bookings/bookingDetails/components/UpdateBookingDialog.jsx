// components/UpdateBookingDialog.jsx
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getAllVendors } from '@/lib/firebase/admin/vendor';
import { updateBooking } from '@/lib/firebase/admin/booking';

function UpdateBookingDialog({ open, onOpenChange, booking, fetchOneBookingDetails }) {
    const [vendors, setVendors] = useState([]);
    const [selectedVendorId, setSelectedVendorId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [assigning, setAssigning] = useState(false);

    useEffect(() => {
        if (!open) return;
        setIsLoading(true);
        getAllVendors()
            .then(setVendors)
            .finally(() => setIsLoading(false));
    }, [open]);

    console.log(vendors)

    const handleAssignVendor = async () => {
        if (!selectedVendorId) return;

        setAssigning(true);
        try {
            const updatedData = {
                ...booking,
                status: {
                    ...booking.status,
                    vendor: selectedVendorId,
                },
            };

            const assginedVendor = vendors?.filter(v => v?.id === selectedVendorId)[0];

            await updateBooking(updatedData);

            // Send Notification to Vendor 
            const res = await fetch('/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campaign: "vendor-booking-assigned-notification",
                    destination: assginedVendor?.phoneNo || assginedVendor?.phoneNumber,
                    templateParams: [
                        assginedVendor?.name,
                        updatedData?.id,
                        updatedData?.tripType,
                        updatedData?.pickupCity,
                        `${process.env.NEXT_PUBLIC_LIVE_LINK}/vendor/my-bookings/bookingDetails?id=${updatedData?.id}`
                    ],
                    paramsFallbackValue: {}
                }),
            });

            const result = await res.json();
            // console.log("Vendor Notification Result", result);

            onOpenChange(false);
        } catch (err) {
            console.error(err);
        } finally {
            setAssigning(false);
            fetchOneBookingDetails(booking?.id)
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gray-200">
                <DialogTitle>Update Booking</DialogTitle>
                <div className="w-full flex items-center justify-between gap-2">
                    <Select
                        value={selectedVendorId || ''}
                        onValueChange={(e) => {
                            setSelectedVendorId(e)
                            // console.log(e)
                        }}
                        disabled={isLoading || assigning}
                    >
                        <SelectTrigger className="bg-white w-full">
                            <SelectValue placeholder={isLoading ? 'Loading vendors...' : 'Select a Vendor'} />
                        </SelectTrigger>
                        <SelectContent className="w-full flex-1">
                            {isLoading ? (
                                <SelectItem>
                                    <Skeleton className="h-8 w-full mb-1 rounded-md" />
                                </SelectItem>
                            ) : vendors.length > 0 ? (
                                vendors.map((v, idx) => (
                                    <SelectItem key={idx} value={v.id} className="w-full">
                                        {v.name} ({v.city})
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="" disabled>
                                    No vendors found
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>

                    <Button
                        onClick={handleAssignVendor}
                        disabled={!selectedVendorId || assigning}
                    >
                        {assigning ? (
                            <>
                                <Loader2 className="animate-spin inline-block mr-2" />
                                Assigning
                            </>
                        ) : (
                            'Assign'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateBookingDialog;
