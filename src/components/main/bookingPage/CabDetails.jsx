"use client";

import { useSearchParams } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, MapPin, CalendarDays, Clock, CalendarCheck, Compass, Pencil, Route, Info, Fuel, TerminalIcon, ListTodoIcon, ListCheckIcon } from "lucide-react";
import BookingForm from "../home/BookingForm";
import { getAllPickupCities } from "@/lib/firebase/admin/pickupCity";
import { Fragment, useEffect, useState } from "react";
import { getAllCabTypes } from "@/lib/firebase/admin/cabType";
import { MAIN_WEBSITE } from "@/lib/assets/assets";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import LoginDialogOuter from "../LoginDialogOuter";
import { TRIP_TYPES } from "@/lib/constants/constants";
import { LocalTripDetails } from "./LocalTripDetails";
import { differenceInCalendarDays } from "date-fns";
import { PackageTripDetails } from "./PackageTripDetails";

export const CabDetails = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { userData } = useAuthStore()

    const tripDataString = searchParams.get("tripData");
    // const tripData = tripDataString ? JSON.parse(tripDataString) : null;

    const [tripData, setTripData] = useState(null);
    const [currentPickupCity, setCurrentPickupCity] = useState([]);
    const [noOfDays, setNoOfDays] = useState(null);
    const [cabTypes, setCabTypes] = useState([]);
    const [currentCab, setCurrentCab] = useState(null);
    const [editTrip, setEditTrip] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        if (tripDataString) {
            setTripData(JSON.parse(tripDataString));
        } else {
            setTripData(null);
        }
    }, [tripDataString]);

    async function fetchPickupCities() {
        setLoading(true);
        try {
            let res = await getAllPickupCities();
            if (res) {
                setCurrentPickupCity(res.filter((item) => item.name === tripData?.pickupCity)[0]);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    async function fetchAllCabTypes() {
        setLoading(true);
        try {
            let res = await getAllCabTypes();
            if (res) setCabTypes(res);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const setDays = () => {
        let dayDifference = 1;

        if (tripData?.returnDate) {
            const d1 = new Date(tripData.pickupDate);
            const d2 = new Date(tripData.returnDate);
            dayDifference = differenceInCalendarDays(d2, d1) + 1;
        }

        setNoOfDays(dayDifference);
    }

    useEffect(() => {

        if (tripData) {
            fetchPickupCities();
            fetchAllCabTypes();

        }

    }, [tripData]);

    useEffect(() => {
        if (tripData) {
            setDays();
            // fetchPickupCities();
            // fetchAllCabTypes();
        }
    }, [tripData])

    const handleCabBooking = (cab) => {

        let finalBookingPrice = (
            (
                tripData?.totalDistance && +tripData?.totalDistance > +(tripData?.tripType === TRIP_TYPES.roundTrip ? cab?.minKilometersRoundTrip * 2 : cab?.minKilometersOneWay * 1)
                    ? tripData?.totalDistance : (tripData?.tripType === TRIP_TYPES.roundTrip ? cab?.minKilometersRoundTrip * noOfDays : cab?.minKilometersOneWay * noOfDays)
            ) *
            (
                tripData?.tripType === "Round Trip"
                    ? cab?.discountedPriceRoundTrip
                    : cab?.discountedPriceOneWay
            )
        ).toFixed(0)

        let bookingData = {
            tripType: tripData?.tripType,
            pickupCity: tripData?.pickupCity,
            dropCity: tripData?.dropCity,
            dropOffs: tripData?.dropOffs,
            cab: {
                ...cab,
                driverAllowance: noOfDays * cab?.driverAllowance,
                luggageCapacity: cabTypes?.filter(cb => cb?.name_lower === cab?.name?.toLowerCase())[0]?.luggageCapacity,
                seatingCapacity: cabTypes?.filter(cb => cb?.name_lower === cab?.name?.toLowerCase())[0]?.seatingCapacity,
                terms: [...currentPickupCity?.terms,
                ...(
                    tripData?.tripType === TRIP_TYPES.roundTrip
                        ? currentPickupCity?.roundTripTerms : (
                            tripData?.tripType === TRIP_TYPES.oneWay && currentPickupCity?.oneWayTerms
                        )
                )
                ],
                basePrice: tripData?.tripType === "Round Trip"
                    ? cab?.discountedPriceRoundTrip
                    : cab?.discountedPriceOneWay
            },
            pickupDate: tripData?.pickupDate,
            pickupTime: tripData?.pickupTime,
            returnDate: tripData?.returnDate,
            price: finalBookingPrice,
            totalDistance: (
                tripData?.totalDistance && +tripData?.totalDistance > +(tripData?.tripType === TRIP_TYPES.roundTrip ? cab?.minKilometersRoundTrip * 2 : cab?.minKilometersOneWay * 1)
                    ? tripData?.totalDistance : (tripData?.tripType === TRIP_TYPES.roundTrip ? cab?.minKilometersRoundTrip * noOfDays : cab?.minKilometersOneWay * noOfDays)
            )
        }
        // console.log(bookingData, tripData);

        router.push(`/checkout?bookingData=${encodeURIComponent(JSON.stringify(bookingData))}`);
    }
    // console.log("No of days trip", noOfDays);

    if (loading || !currentPickupCity || !noOfDays || !tripData)
        return <div className="h-52 flex w-full items-center justify-center">
            <Loader2 className="animate-spin text-blue-600 w-10 h-10 mx-auto mt-20" />;
        </div>

    // console.log('Trip Data', tripData)
    // console.log('cab', currentPickupCity)

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-5xl space-y-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Trip Details</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Trip Header */}
                {tripData && (
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-sm sm:shadow-md p-4 sm:p-6 lg:p-8 border border-indigo-100 transition-all">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8">
                            {/* Left Content */}
                            <div className="space-y-6 flex-1">
                                {/* Header */}
                                <div className="pb-5 border-b  flex w-full justify-between items-center">
                                    <h3 className="text-sm font-bold border-teal-100 text-teal-600 uppercase tracking-wider flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-teal-500" />
                                        <span className="bg-gradient-to-r from-teal-100 to-purple-100 px-4 py-2 rounded-full">Journey Overview</span>
                                    </h3>
                                    {/* Edit Button */}
                                    <Dialog open={editTrip} onOpenChange={(isOpen) => setEditTrip(isOpen)}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:text-white gap-2 sm:self-start px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                                            >
                                                <Pencil className="w-5 h-5 text-teal-200" />
                                                <span className="text-base hidden sm:block">Modify Trip Plan</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl bg-indigo-50 border-teal-100">
                                            <DialogHeader>
                                                <DialogTitle className="flex items-center gap-3 text-indigo-900">
                                                    <Pencil className="w-6 h-6 text-teal-500" />
                                                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                        Edit Travel Details
                                                    </span>
                                                </DialogTitle>
                                            </DialogHeader>
                                            <BookingForm editTrip={editTrip} setEditTrip={setEditTrip} />
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                {/* Route Visualization */}
                                <div className="space-y-4">
                                    <div className="flex items-center text-indigo-900 font-bold text-xl">
                                        {tripData.tripType === "Round Trip" && tripData.dropOffs?.length > 0 ? (
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 space-y-2">
                                                <span className="bg-gradient-to-br text-sm sm:text-lg from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">{tripData.pickupCity}</span>
                                                <ArrowRight className="w-6 h-6 text-teal-500 mx-2" />
                                                {tripData.dropOffs.map((dr, idx) => (
                                                    <Fragment key={idx}>
                                                        <span className="bg-white px-4 py-2 text-sm sm:text-lg rounded-full border-2 border-teal-200 shadow-md">{dr}</span>
                                                        <ArrowRight className="w-6 h-6 text-teal-500 mx-2" />
                                                    </Fragment>
                                                ))}
                                                <span className="bg-gradient-to-br text-sm sm:text-lg from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg">{tripData.pickupCity}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-lg">
                                                <span className="bg-gradient-to-br text-sm sm:text-lg from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">{tripData.pickupCity}</span>
                                                {
                                                    tripData?.dropCity &&
                                                    <div className="flex items-center gap-2 sm:gap-4">
                                                        <ArrowRight className="w-6 h-6 text-teal-500 mx-2" />
                                                        <span className="bg-white px-4 py-2 rounded-full border-2 border-teal-200 shadow-md">{tripData.dropCity}</span>
                                                    </div>
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-5">
                                    {[
                                        { icon: CalendarDays, label: "Pickup Date", value: tripData.pickupDate, color: "text-teal-500" },
                                        { icon: Clock, label: "Pickup Time", value: tripData.pickupTime, color: "text-purple-500" },
                                        ...(tripData?.returnDate ? [{ icon: CalendarCheck, label: "Return Date", value: tripData.returnDate, color: "text-indigo-500" }] : []),
                                        { icon: Compass, label: "Trip Type", value: tripData.tripType, color: "text-teal-500" },
                                        ...(tripData?.totalDistance > 0 ? [{ icon: Route, label: "Total Distance", value: `${tripData.totalDistance} km`, color: "text-purple-500" }] : [])
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md">
                                            <item.icon className={`w-7 h-7 ${item.color}`} />
                                            <div>
                                                <p className="text-sm font-semibold text-indigo-600 mb-1">{item.label}</p>
                                                <p className="text-indigo-900 font-bold">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                    </div>
                )}

                {/* Cab List */}
                <PackageTripDetails
                    router={router}
                    userData={userData}
                    tripData={tripData}
                    currentPickupCity={currentPickupCity}
                    currentCab={currentCab}
                    setCurrentCab={setCurrentCab}
                    cabTypes={cabTypes}
                    noOfDays={noOfDays}
                />

                {
                    tripData?.tripType === TRIP_TYPES.local || tripData?.tripType === TRIP_TYPES.airport
                        ? (
                            <LocalTripDetails
                                router={router}
                                userData={userData}
                                tripData={tripData}
                                currentPickupCity={currentPickupCity}
                                currentCab={currentCab}
                                setCurrentCab={setCurrentCab}
                                cabTypes={cabTypes}
                                noOfDays={noOfDays}
                            />
                        )
                        : (
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-4 sm:p-6 border border-indigo-100 space-y-6">
                                <h1 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Regular Trips</h1>
                                {currentPickupCity?.variantList?.map((cab, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto_auto] items-center gap-6 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                                    >
                                        {/* Car Image and Name */}
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

                                            </div>
                                        </div>

                                        {/* Pricing Section */}
                                        <div className="text-right space-y-2">
                                            <div className="text-sm text-gray-500">
                                                {/* {tripData?.totalDistance} Kms Included */}
                                                {
                                                    (
                                                        +tripData?.totalDistance && +tripData?.totalDistance > (tripData?.tripType === TRIP_TYPES.roundTrip ? +cab?.minKilometersRoundTrip * 2 : cab?.minKilometersOneWay * 1)
                                                            ? tripData?.totalDistance : (tripData?.tripType === TRIP_TYPES.roundTrip ? cab?.minKilometersRoundTrip * noOfDays : cab?.minKilometersOneWay * noOfDays)
                                                    )
                                                } Kms Included
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="line-through text-gray-400 text-sm">
                                                    ₹{(
                                                        (
                                                            tripData?.totalDistance && +tripData?.totalDistance > +(tripData?.tripType === TRIP_TYPES.roundTrip ? cab?.minKilometersRoundTrip * 2 : cab?.minKilometersOneWay * 1)
                                                                ? tripData?.totalDistance : (tripData?.tripType === TRIP_TYPES.roundTrip ? cab?.minKilometersRoundTrip * noOfDays : cab?.minKilometersOneWay * noOfDays)
                                                        ) *
                                                        (
                                                            tripData?.tripType === "Round Trip"
                                                                ? cab?.actualPriceRoundTrip
                                                                : cab?.actualPriceOneWay
                                                        ) + +(cab?.driverAllowance * noOfDays)
                                                    ).toFixed(0)}
                                                </span>
                                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                                    ₹{(
                                                        (
                                                            tripData?.totalDistance && +tripData?.totalDistance > +(tripData?.tripType === TRIP_TYPES.roundTrip ? cab?.minKilometersRoundTrip * 2 : cab?.minKilometersOneWay * 1)
                                                                ? tripData?.totalDistance : (tripData?.tripType === TRIP_TYPES.roundTrip ? cab?.minKilometersRoundTrip * noOfDays : cab?.minKilometersOneWay * noOfDays)
                                                        ) *
                                                        (
                                                            tripData?.tripType === "Round Trip"
                                                                ? cab?.discountedPriceRoundTrip
                                                                : cab?.discountedPriceOneWay
                                                        ) + +(cab?.driverAllowance * noOfDays)
                                                    ).toFixed(0)}
                                                </span>
                                                <span className="text-xs font-semibold text-teal-600 bg-teal-100 px-2 py-1 rounded-full">
                                                    BEST DEAL
                                                </span>
                                            </div>
                                        </div>

                                        {/* Book Button */}
                                        <Button
                                            className="bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                                            onClick={() => handleCabBooking(cab)}
                                        >
                                            Book Now
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )
                }

                <LoginDialogOuter open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            </div>
        </div>
    );
};




{/* Terms and Details Tab */ }
// <Dialog
//     onOpenChange={(isOpen) => {
//         if (!isOpen) setCurrentCab(null);
//     }}
// >
//     {(
//         <DialogTrigger
//             className="text-sm text-teal-600 hover:text-teal-800 mt-1 flex items-center gap-1"
//             onClick={() =>
//                 setCurrentCab(
//                     cabTypes.find(
//                         (cb) =>
//                             cb?.name_lower === cab?.name?.toLowerCase()
//                     )
//                 )
//             }
//         >
//             <Info className="w-4 h-4" />
//             View Full Specifications
//         </DialogTrigger>
//     )}

//     {/* Dialog Content */}
//     <DialogContent className="max-w-4xl rounded-2xl bg-gradient-to-b from-indigo-50 to-white">
//         <DialogHeader>
//             <DialogTitle className="text-2xl font-bold text-indigo-900">
//                 {cab?.name} Specifications
//                 <div className="h-1 bg-gradient-to-r from-teal-400 to-purple-400 w-24 mt-2 rounded-full" />
//             </DialogTitle>
//         </DialogHeader>

//         <Tabs defaultValue="inclusions" className="w-full">
//             <TabsList className="w-full grid grid-cols-4 gap-2 bg-indigo-50 rounded-xl p-2 mb-6">
//                 {["inclusions", "facilities", "t&C"].map((tab) => (
//                     <TabsTrigger
//                         key={tab}
//                         value={tab}
//                         className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 rounded-lg py-2"
//                     >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </TabsTrigger>
//                 ))}
//             </TabsList>

//             {/* Tab Contents - inclusions */}
//             <TabsContent value="inclusions" className="space-y-3">
//                 <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
//                     <div className="p-2 bg-teal-100 rounded-full">
//                         <Fuel className="w-5 h-5 text-teal-600" />
//                     </div>
//                     <div>
//                         <p className="font-semibold text-indigo-900">Base Fare</p>
//                         <p className="text-lg font-bold text-teal-600">
//                             ₹{tripData?.tripType === "Round Trip"
//                                 ? cab?.discountedPriceRoundTrip
//                                 : cab?.discountedPriceOneWay
//                             }/Km
//                         </p>
//                     </div>
//                 </div>
//                 {/* Similar styled blocks for other inclusions */}
//             </TabsContent>

//             {/* Tab Contents - facilities */}
//             <TabsContent value="facilities" className="space-y-3">
//                 <div className="flex flex-col gap-1 p-3 bg-white rounded-lg">
//                     <div className="flex items-center gap-2">
//                         <p className="font-bold text-indigo-900">Luggage Capacity: </p>
//                         <p className="font-semibold text-teal-600">
//                             {
//                                 cabTypes?.filter(cb => cb?.name_lower === cab?.name?.toLowerCase())[0]?.luggageCapacity
//                             }
//                         </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <p className="font-bold text-indigo-900">Seating Capacity: </p>
//                         <p className="font-semibold text-teal-600">
//                             {
//                                 cabTypes?.filter(cb => cb?.name_lower === cab?.name?.toLowerCase())[0]?.seatingCapacity
//                             }
//                         </p>
//                     </div>
//                 </div>
//             </TabsContent>

//             {/* Tab Contents - t&c */}
//             <TabsContent value="t&C" className="space-y-3">
//                 <div className="flex flex-col gap-2 p-3 bg-white rounded-lg">
//                     {
//                         currentPickupCity?.terms?.map((tc, id) => (
//                             <p key={id} className="flex items-center gap-2">
//                                 <ArrowRight size={30} />
//                                 {tc}
//                             </p>
//                         ))
//                     }
//                     {
//                         tripData?.tripType === TRIP_TYPES.roundTrip
//                             ? currentPickupCity?.roundTripTerms?.map((tc, id) => (
//                                 <p key={id} className="flex items-center gap-2">
//                                     <ArrowRight size={30} />
//                                     {tc}
//                                 </p>
//                             ))
//                             : (
//                                 tripData?.tripType === TRIP_TYPES.oneWay
//                                 && currentPickupCity?.oneWayTerms?.map((tc, id) => (
//                                     <p key={id} className="flex items-center gap-2">
//                                         <ArrowRight size={30} />
//                                         {tc}
//                                     </p>
//                                 ))
//                             )
//                     }
//                 </div>
//             </TabsContent>
//         </Tabs>
//     </DialogContent>
// </Dialog>