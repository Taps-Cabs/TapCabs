import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { updateBooking } from '@/lib/firebase/admin/booking';
import { getVendorAllDrivers } from '@/lib/firebase/vendor/driver';
import { TRIP_STATUS, TRIP_TYPES } from '@/lib/constants/constants';
import { formatFirestoreDate } from '@/lib/firebase/services/formatDate';

function AssignDriverDialog({ open, onOpenChange, booking, fetchOneBookingDetails, userData }) {

    const [isLoading, setIsLoading] = useState(false);
    const [assigning, setAssigning] = useState(false);

    const [drivers, setDrivers] = useState()
    const [selectedDriverId, setSelectedDriverId] = useState('')
    const [tripStatus, setTripStatus] = useState('Not Started')

    useEffect(() => {
        if (!open) return;
        setIsLoading(true);
        getVendorAllDrivers(userData?.id).then(setDrivers).finally(() => setIsLoading(false))
    }, [open]);

    const handleUpdateBooking = async () => {
        if (!selectedDriverId) return;
        setAssigning(true);

        try {
            const updatedData = {
                ...booking,
                pickupDate: formatFirestoreDate(booking?.pickupDate),
                status: {
                    ...booking.status,
                    driver: selectedDriverId,
                    trip: tripStatus
                },
            };

            const assginedDriver = drivers?.filter(d => d?.id === selectedDriverId)[0];
            // console.log("driver", assginedDriver);
            // console.log("booking data", updatedData);

            //Update booking status
            await updateBooking(updatedData);

            let templateParams = [];

            // Set template params for driver notification
            if (updatedData?.tripType === TRIP_TYPES.local || updatedData?.tripType === TRIP_TYPES.airport) {
                templateParams = [
                    assginedDriver?.name,
                    updatedData?.tripType,
                    updatedData?.id,
                    updatedData?.tripType,
                    `${updatedData?.pickupDate}, ${updatedData?.pickupTime}`,
                    updatedData?.pickupCity,
                    updatedData?.userData?.exactPickup,
                    updatedData?.userData?.exactDrop,
                    updatedData?.totalDistance,
                    updatedData?.totalHours,
                    `${updatedData?.totalAmount}`,
                    `${updatedData?.bookingAmount}`,
                    `${+updatedData?.totalAmount - +updatedData?.bookingAmount}`,
                    updatedData?.userData?.name,
                    updatedData?.userData?.phoneNo || updatedData?.userData?.phoneNumber
                ];
            } else if (updatedData?.tripType === TRIP_TYPES.oneWay) {
                templateParams = [
                    assginedDriver?.name,
                    updatedData?.tripType,
                    updatedData?.id,
                    updatedData?.tripType,
                    `${updatedData?.pickupDate}, ${updatedData?.pickupTime}`,
                    updatedData?.pickupCity,
                    updatedData?.userData?.exactPickup,
                    updatedData?.userData?.exactDrop,
                    updatedData?.dropCity,
                    `${updatedData?.totalAmount}`,
                    `${updatedData?.bookingAmount}`,
                    `${+updatedData?.totalAmount - +updatedData?.bookingAmount}`,
                    updatedData?.userData?.name,
                    updatedData?.userData?.phoneNo || updatedData?.userData?.phoneNumber
                ];
            } else if (updatedData?.tripType === TRIP_TYPES.roundTrip) {

                const updatedDrops = updatedData?.dropOffs?.map((location, index) => {
                    const city = location.split(",")[0].trim().toLowerCase();
                    return ` ${city} `;
                }).join('->');

                templateParams = [
                    assginedDriver?.name,
                    updatedData?.tripType,
                    updatedData?.id,
                    updatedData?.tripType,
                    `${updatedData?.pickupDate}, ${updatedData?.pickupTime}`,
                    `${updatedData?.returnDate}`,
                    updatedData?.pickupCity,
                    updatedData?.userData?.exactPickup,
                    updatedData?.userData?.exactDrop,
                    updatedDrops,
                    `${updatedData?.totalAmount}`,
                    `${updatedData?.bookingAmount}`,
                    `${+updatedData?.totalAmount - +updatedData?.bookingAmount}`,
                    updatedData?.userData?.name,
                    updatedData?.userData?.phoneNo || updatedData?.userData?.phoneNumber
                ];
            }

            // Send Notification to Driver 
            const res = await fetch('/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campaign: (updatedData?.tripType === TRIP_TYPES.local || updatedData?.tripType === TRIP_TYPES.airport)
                        ? "local_booking_assigned_to_driver2" : (
                            updatedData?.tripType === TRIP_TYPES.oneWay ? "one_way_booking_assigned_to_driver2"
                                : "round_trip_booking_assigned_to_driver2"
                        ),
                    destination: assginedDriver?.phoneNo || assginedDriver?.phoneNumber,
                    templateParams,
                    paramsFallbackValue: {}
                }),
            });

            const result = await res.json();
            templateParams = [];
            // console.log("Driver Notification Result", result);


            // console.log(assginedDriver)
            // Set template params for notification to customer
            templateParams = [
                updatedData?.userData?.name,
                updatedData?.id,
                updatedData?.tripType,
                `${updatedData?.pickupDate}, ${updatedData?.pickupTime}`,
                updatedData?.pickupCity,
                updatedData?.userData?.exactPickup,
                updatedData?.userData?.exactDrop,
                `${updatedData?.totalAmount}`,
                `${updatedData?.bookingAmount}`,
                `${+updatedData?.totalAmount - +updatedData?.bookingAmount}`,
                assginedDriver?.name,
                assginedDriver?.phoneNo || assginedDriver?.phoneNumber,
                assginedDriver?.cabType,
                assginedDriver?.vehicleNumber,
                assginedDriver?.vehicleName,
                `${process.env.NEXT_PUBLIC_LIVE_LINK}/my-trips`
            ]

            // Send Notification to Driver 
            const userRes = await fetch('/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campaign: "customer_driver_assigned_notification2",
                    destination: updatedData?.userData?.phoneNo || updatedData?.userData?.phoneNumber,
                    templateParams,
                    paramsFallbackValue: {}
                }),
            });

            const userResult = await userRes.json();
            // console.log("Customer Notification Result", userResult);
            templateParams = [];

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
            <DialogContent className="bg-gray-200 space-y-4">
                <DialogTitle>Update Booking</DialogTitle>

                {/* Driver Select with Label */}
                <div className="w-full space-y-1">
                    <label className="block text-sm font-medium">Select Driver</label>
                    <Select
                        value={selectedDriverId}
                        onValueChange={setSelectedDriverId}
                        disabled={isLoading || assigning}
                    >
                        <SelectTrigger className="bg-white w-full">
                            <SelectValue
                                placeholder={
                                    isLoading ? 'Loading drivers...' : 'Choose a driver'
                                }
                            />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            {isLoading ? (
                                <div className="p-2">Loading…</div>
                            ) : drivers?.length > 0 ? (
                                drivers?.map((d) => (
                                    <SelectItem key={d?.id} value={d?.id} className="w-full">
                                        {d?.name}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="NA" disabled>
                                    No drivers found
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>

                {/* Assign Button */}
                <div className="flex justify-end">
                    <Button
                        onClick={handleUpdateBooking}
                        disabled={assigning}
                    >
                        {assigning ? (
                            <>
                                <Loader2 className="animate-spin inline-block mr-2" />
                                Updating…
                            </>
                        ) : (
                            'Update Booking'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AssignDriverDialog;
