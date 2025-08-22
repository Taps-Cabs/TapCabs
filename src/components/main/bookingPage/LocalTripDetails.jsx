'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MAIN_WEBSITE } from '@/lib/assets/assets'
import { TRIP_TYPES } from '@/lib/constants/constants'
import { getLocalTripsByCity } from '@/lib/firebase/admin/localTrips'
import { ArrowRight, Clock, Fuel, Info, Loader2, WatchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getAirportTripsByCity } from '@/lib/firebase/admin/airportTrips';

export const LocalTripDetails = ({ router, tripData, currentPickupCity, cabTypes, setCurrentCab }) => {

    // console.log(tripData)
    const [loading, setLoading] = useState(false);
    const [trips, setTrips] = useState([]);
    const [tripFilter, setTripFilter] = useState(null);

    const fetchTrips = async () => {
        setLoading(true)
        try {
            const res = await (
                tripData?.tripType === TRIP_TYPES.local
                    ? getLocalTripsByCity(tripData?.pickupCity)
                    : getAirportTripsByCity(tripData?.pickupCity)
            );

            let updatedResult = [];
            if (res)
                updatedResult = res.map(trip => ({
                    pickupCity: trip.cityName,
                    totalDistance: trip.tripDistance,
                    tripHours: trip.tripHours,
                    terms: trip.terms,
                    variantList: trip.variantList.map(variant => ({
                        name: variant.cabType,
                        totalDistance: trip.tripDistance,
                        tripHours: trip.tripHours,
                        price: variant.variantAcutalPrice,
                        discountedPrice: variant.variantDiscountedPrice
                    }))
                }))
            setTrips(updatedResult);
            setTripFilter(updatedResult?.map(lc => (
                {
                    totalDistance: lc?.totalDistance,
                    tripHours: lc?.tripHours,
                }
            )));

        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (tripData?.tripType === TRIP_TYPES.local || tripData?.tripType === TRIP_TYPES.airport)
            fetchTrips();
    }, [tripData]);

    // console.log(currentPickupCity);


    const handleCabBooking = (cab, lt) => {

        // console.log(cab);
        // console.log(tripData?.tripType === TRIP_TYPES.local ? cab?.extraKilometersLocal
        //     : (tripData?.tripType === TRIP_TYPES.airport && cab?.extraKilometersAirport))
        // return;

        let bookingData = {
            tripType: tripData?.tripType,
            pickupCity: tripData?.pickupCity,
            cab: {
                ...cab,
                actualPriceOneWay: currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.actualPriceOneWay,
                driverAllowance: currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.driverAllowance,
                luggageCapacity: cabTypes?.filter(cb => cb?.name_lower === cab?.name?.toLowerCase())[0]?.luggageCapacity,
                seatingCapacity: cabTypes?.filter(cb => cb?.name_lower === cab?.name?.toLowerCase())[0]?.seatingCapacity,
                terms: lt?.terms ? [...currentPickupCity?.terms, ...lt?.terms] : [...currentPickupCity?.terms],
                basePrice: tripData?.tripType === TRIP_TYPES.local
                    ? currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.extraKilometersLocal
                    : currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.extraKilometersAirport,
                extraKilometers: tripData?.tripType === TRIP_TYPES.local
                    ? currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.extraKilometersLocal
                    : currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.extraKilometersAirport,
                extraHours: tripData?.tripType === TRIP_TYPES.local
                    ? currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.extraHoursLocal
                    : currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.extraHoursAirport
            },
            pickupDate: tripData?.pickupDate,
            pickupTime: tripData?.pickupTime,
            totalDistance: cab?.totalDistance,
            totalHours: cab?.tripHours,
            price: cab?.discountedPrice,
        }

        console.log(bookingData);

        router.push(`/checkout?bookingData=${encodeURIComponent(JSON.stringify(bookingData))}`);
    }

    if (loading || !trips || !tripFilter || !currentPickupCity)
        return <Loader2 />

    return (
        <div className="mx-auto  rounded-2xl shadow-md p-4 space-y-6 bg-gradient-to-br from-indigo-50 to-purple-50 sm:p-6 border border-indigo-100">
            <h1 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Regular Trips</h1>
            <Tabs defaultValue={tripFilter && tripFilter[0]} >
                <TabsList className="w-full justify-start mb-4 border-2 border-indigo-100">
                    {
                        tripFilter?.map((tr, idx) =>
                            <TabsTrigger
                                key={idx} value={tr}>{tr?.tripHours}Hrs | {tr?.totalDistance}Kms</TabsTrigger>
                        )
                    }
                </TabsList>
                {
                    tripFilter?.map(tr => (
                        {
                            label: tr,
                            data: trips?.filter(lt =>
                                lt?.totalDistance === tr?.totalDistance && lt?.tripHours === tr?.tripHours
                            )
                        }
                    ))?.map(({ label, data }, idx) => (
                        <TabsContent value={label} key={idx}>
                            {
                                data?.map(lt =>
                                    lt?.variantList?.map((cab, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-1 sm:grid-cols-[auto_auto_1fr_auto_auto] items-center gap-4 border-b last:border-b-0 pb-4 bg-white p-4 rounded-xl"
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
                                                                    {["inclusions", "exclusions", "facilities", "t&C"].map((tab) => (
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

                                                                {/* Tab Contents - Exclusions */}
                                                                <TabsContent value="exclusions" className="space-y-1">

                                                                    {/* Extra Km */}
                                                                    <div className="flex items-center gap-3 p-3 py-1 bg-white rounded-lg">
                                                                        <div className="p-2 bg-teal-100 rounded-full">
                                                                            <Fuel className="w-5 h-5 text-teal-600" />
                                                                        </div>
                                                                        <div>
                                                                            <p className="font-semibold text-indigo-900">Price for Extra Kms</p>
                                                                            <p className="text-lg font-bold text-teal-600">
                                                                                ₹{tripData?.tripType === TRIP_TYPES.local
                                                                                    ? currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.extraKilometersLocal
                                                                                    : (
                                                                                        tripData?.tripType === TRIP_TYPES.airport &&
                                                                                        currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.extraKilometersAirport
                                                                                    )
                                                                                }/Km
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    {/* Extra Hour */}
                                                                    <div className="flex items-center gap-3 p-3 py-1 bg-white rounded-lg">
                                                                        <div className="p-2 bg-teal-100 rounded-full">
                                                                            <Clock className="w-5 h-5 text-teal-600" />
                                                                        </div>
                                                                        <div>
                                                                            <p className="font-semibold text-indigo-900">Price for Extra Hours</p>
                                                                            <p className="text-lg font-bold text-teal-600">
                                                                                ₹{tripData?.tripType === "Local Trip"
                                                                                    ? currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.extraHoursLocal
                                                                                    : currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.extraHoursAirport
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

                                                                {/* Tab Contents T&C */}
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

                                            {/* <img
                                                src={MAIN_WEBSITE.car1}
                                                alt={cab?.name}
                                                className="w-20 h-14 object-contain"
                                            />
                                            <div className="text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                <p className="font-bold">{cab?.name}</p>
                                            </div> */}
                                            <div className="text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent self-center flex justify-start items-center gap-2">
                                                <p className="font-bold">{cab?.totalDistance} Kms</p>
                                                <p className="font-bold">For {cab?.tripHours} Hours</p>
                                            </div>
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
                                                onClick={() => handleCabBooking(cab, lt)}
                                            >
                                                Book Now
                                            </Button>
                                        </div>
                                    ))
                                )}
                        </TabsContent>
                    ))
                }
            </Tabs>
        </div>
    )
}
