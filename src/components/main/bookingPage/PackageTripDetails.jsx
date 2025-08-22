'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MAIN_WEBSITE } from '@/lib/assets/assets'
import { TRIP_TYPES } from '@/lib/constants/constants'
import { getPackageTripsByTripType } from '@/lib/firebase/admin/tripPackage'
import { ArrowRight, Fuel, Info, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export const PackageTripDetails = ({ router, tripData, currentPickupCity, cabTypes, setCurrentCab }) => {

    const [loading, setLoading] = useState(false);
    const [trips, setTrips] = useState([]);

    const fetchTrips = async () => {
        setLoading(true)
        try {
            const res = await getPackageTripsByTripType(tripData?.tripType);

            let updatedResult = [...res];
            if (res)
                updatedResult = res.map(trip => ({
                    tripType: trip.tripType,
                    pickupCity: trip.pickupCity,
                    dropCity: trip.dropCity,
                    dropOffs: trip.dropOffs,
                    noOfDays: trip.noOfDays,
                    totalDistance: tripData.totalDistance,
                    terms: trip.terms,
                    // tripHours: trip.tripHours,
                    variantList: trip.variantList.map(variant => ({
                        name: variant.cabType,
                        totalDistance: tripData.totalDistance,
                        price: variant.variantAcutalPrice,
                        discountedPrice: variant.variantDiscountedPrice
                    }))
                }))


            // Strict order array comparison
            function arraysEqual(a = [], b = []) {
                if (a.length !== b.length) return false;
                return a.every((val, index) => val === b[index]);
            }

            if (tripData?.tripType === TRIP_TYPES.oneWay) {
                updatedResult = updatedResult?.filter(pc =>
                    pc?.pickupCity === tripData?.pickupCity &&
                    pc?.dropCity === tripData?.dropCity
                );
            } else if (tripData?.tripType === TRIP_TYPES.roundTrip) {
                updatedResult = updatedResult?.filter(pc =>
                    pc?.pickupCity === tripData?.pickupCity &&
                    arraysEqual(pc?.dropOffs, tripData?.dropOffs)
                );
            }

            setTrips(updatedResult);

        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchTrips();
    }, [tripData]);

    const handleCabBooking = (cab, lt) => {

        let bookingData = {
            tripType: tripData?.tripType,
            pickupCity: tripData?.pickupCity,
            dropCity: tripData?.dropCity ? tripData?.dropCity : "",
            noOfDays: cab.noOfDays,
            dropOffs: (tripData?.dropOffs && tripData?.dropOffs) ? tripData?.dropOffs : [],
            cab: {
                ...cab,
                actualPriceOneWay: currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.actualPriceOneWay,
                driverAllowance: currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.driverAllowance,
                luggageCapacity: cabTypes?.filter(cb => cb?.name_lower === cab?.name?.toLowerCase())[0]?.luggageCapacity,
                seatingCapacity: cabTypes?.filter(cb => cb?.name_lower === cab?.name?.toLowerCase())[0]?.seatingCapacity,
                terms: [...currentPickupCity?.terms, ...lt?.terms],
                basePrice: tripData?.tripType === "Round Trip"
                    ? currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.discountedPriceRoundTrip
                    : currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.discountedPriceOneWay
            },
            pickupDate: tripData?.pickupDate,
            returnDate: tripData?.returnDate,
            pickupTime: tripData?.pickupTime,
            totalDistance: cab?.totalDistance,
            totalHours: cab?.tripHours,
            price: cab?.discountedPrice,

        }
        // console.log(bookingData);

        router.push(`/checkout?bookingData=${encodeURIComponent(JSON.stringify(bookingData))}`);
    }

    if (loading || !trips || !currentPickupCity)
        return <Loader2 />

    if (trips?.length <= 0)
        return null;

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl shadow-md p-4 lg:p-6 space-y-6">
            <h1 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Special Packages Just for You</h1>
            {
                trips?.map(lt =>
                    lt?.variantList?.map((cab, index) => (
                        <div
                            key={index}
                            className="bg-white grid grid-cols-1 sm:grid-cols-[auto_auto_1fr_auto_auto] items-center gap-4 border-b last:border-b-0 p-4 rounded-2xl shadow-sm"
                        >
                            {/* CaB details and terms and Conditions */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={MAIN_WEBSITE.car1}
                                    alt={cab?.name}
                                    className="w-24 h-16 object-contain p-2 bg-indigo-50 rounded-lg border border-indigo-100"
                                />
                                <div>
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        {cab?.name}
                                    </h3>
                                    <Dialog
                                        onOpenChange={(isOpen) => {
                                            if (!isOpen) setCurrentCab(null);
                                        }}
                                    >
                                        {(
                                            <DialogTrigger
                                                className="text-sm text-teal-600 hover:text-teal-800 mt-1 flex items-center gap-1"
                                                onClick={() =>
                                                    setCurrentCab(
                                                        cabTypes.find(
                                                            (cb) =>
                                                                cb?.name_lower === cab?.name?.toLowerCase()
                                                        )
                                                    )
                                                }
                                            >
                                                <Info className="w-4 h-4" />
                                                View Full Specifications
                                            </DialogTrigger>
                                        )}

                                        {/* Dialog Content */}
                                        <DialogContent className="max-w-4xl rounded-2xl bg-gradient-to-b from-indigo-50 to-white">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl font-bold text-indigo-900">
                                                    {cab?.name} Specifications
                                                    <div className="h-1 bg-gradient-to-r from-teal-400 to-purple-400 w-24 mt-2 rounded-full" />
                                                </DialogTitle>
                                            </DialogHeader>

                                            <Tabs defaultValue="inclusions" className="w-full">
                                                <TabsList className="w-full grid grid-cols-4 gap-2 bg-indigo-50 rounded-xl p-2 mb-6">
                                                    {["inclusions", "facilities", "t&C"].map((tab) => (
                                                        <TabsTrigger
                                                            key={tab}
                                                            value={tab}
                                                            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 rounded-lg py-2"
                                                        >
                                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                                        </TabsTrigger>
                                                    ))}
                                                </TabsList>

                                                {/* Tab Contents - Inclusions */}
                                                <TabsContent value="inclusions" className="space-y-3">
                                                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                                        <div className="p-2 bg-teal-100 rounded-full">
                                                            <Fuel className="w-5 h-5 text-teal-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-indigo-900">Base Fare</p>
                                                            <p className="text-lg font-bold text-teal-600">
                                                                ₹{tripData?.tripType === "Round Trip"
                                                                    ? currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.discountedPriceRoundTrip
                                                                    : currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.discountedPriceOneWay
                                                                }/Km
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* Similar styled blocks for other inclusions */}
                                                </TabsContent>

                                                {/* Tab Contents - Facilities */}
                                                <TabsContent value="facilities" className="space-y-3">
                                                    <div className="flex flex-col gap-1 p-3 bg-white rounded-lg">
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-bold text-indigo-900">Luggage Capacity: </p>
                                                            <p className="font-semibold text-teal-600">
                                                                {
                                                                    cabTypes?.filter(cb => cb?.name_lower === cab?.name?.toLowerCase())[0]?.luggageCapacity
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-bold text-indigo-900">Seating Capacity: </p>
                                                            <p className="font-semibold text-teal-600">
                                                                {
                                                                    cabTypes?.filter(cb => cb?.name_lower === cab?.name?.toLowerCase())[0]?.seatingCapacity
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TabsContent>

                                                {/* Tab Contents - Term and Conditions */}
                                                <TabsContent value="t&C" className="space-y-3">
                                                    <div className="flex flex-col gap-2 p-3 bg-white rounded-lg">
                                                        {
                                                            currentPickupCity?.terms?.map((tc, id) => (
                                                                <p key={id} className="flex items-center gap-2">
                                                                    <ArrowRight size={30} />
                                                                    {tc}
                                                                </p>
                                                            ))
                                                        }
                                                        {
                                                            lt?.terms?.map((tc, id) => (
                                                                <p key={id} className="flex items-center gap-2">
                                                                    <ArrowRight size={30} />
                                                                    {tc}
                                                                </p>
                                                            ))
                                                        }
                                                    </div>
                                                </TabsContent>
                                            </Tabs>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            {
                                lt?.noOfDays &&
                                <div className="text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent sm:ml-8 w-full">
                                    <p className="font-bold text-center w-full">{lt?.noOfDays} Days Trip</p>
                                </div>
                            }

                            <div className="text-right space-y-0.5">
                                <div className="line-through text-sm text-gray-400">
                                    ₹{
                                        +cab?.price + +(
                                            currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.driverAllowance
                                        )
                                    }
                                </div>
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-xl font-bold">
                                    ₹{
                                        +cab?.discountedPrice + +(
                                            currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.driverAllowance
                                        )
                                    }
                                </div>
                                <div className="text-green-700 text-xs bg-green-100 px-2 py-0.5 rounded-sm inline-block">
                                    GUARANTEED
                                </div>
                            </div>

                            <Button
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-2 rounded-lg w-full sm:w-auto"
                                onClick={() => handleCabBooking({ ...cab, noOfDays: lt?.noOfDays }, lt)}
                            >
                                Book Now
                            </Button>
                        </div>
                    ))
                )}
        </div>
    )
}
