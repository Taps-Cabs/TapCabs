"use client";

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TRIP_TYPES } from '@/lib/constants/constants';
import { ArrowRightCircle, Loader2 } from 'lucide-react';
import { point, distance } from '@turf/turf';
import { createNewEnquiry } from '@/lib/firebase/admin/enquiry';
import Pickup from './bookingForm/Pickup';
import PickupDate from './bookingForm/PickupDate';
import MobileNo from './bookingForm/MobileNo';
import TripType from './bookingForm/TripType';
import ReturnDate from './bookingForm/ReturnDate';
import useAuthStore from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';
import LocationSearch from './bookingForm/DropSuggestionForm';

export default function BookingForm({ editTrip, setEditTrip }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { userData } = useAuthStore();

    const [query, setQuery] = useState(""); // for drop city input  
    const [tripData, setTripData] = useState(null);
    const [pickupCities, setPickupCities] = useState([]);
    const [dropOffs, setDropOffs] = useState([]);
    const [loading, setLoading] = useState(false);

    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        control,
        reset,
        unregister
    } = useForm({
        defaultValues: {
            tripType: TRIP_TYPES.oneWay,
            pickupDate: currentDate,
            pickupTime: currentTime,
        },
    });

    const tripType = watch('tripType');
    const pickupCity = watch('pickupCity');

    // Load trip data if present in URL
    useEffect(() => {
        const tripDataString = searchParams.get("tripData");
        if (tripDataString) {
            try {
                const parsed = JSON.parse(decodeURIComponent(tripDataString));
                setTripData(parsed);
                console.log(parsed)
                setDropOffs(parsed.dropOffs || []);
                reset({
                    pickupCity: parsed.pickupCity || "",
                    dropCity: parsed.dropCity || "",
                    pickupDate: parsed.pickupDate || "",
                    pickupTime: parsed.pickupTime || "",
                    returnDate: parsed.returnDate || "",
                    mobileNumber: parsed.mobileNumber || "",
                    tripType: parsed.tripType || TRIP_TYPES.oneWay,
                });
            } catch (err) {
                console.error("Error parsing tripData from URL:", err);
            }
        }
    }, [searchParams, reset]);

    const getCoordinates = async (address) => {
        const encoded = encodeURIComponent(address);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encoded}`;
        const res = await fetch(url, {
            headers: { 'User-Agent': 'MyApp/1.0 (my@email.com)' },
        });
        const data = await res.json();
        if (data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
        throw new Error("Location not found");
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (userData && userData.role !== 'user') {
                toast.error("You are not authorized to book a cab.");
                return;
            }

            let allDropOffs = [...dropOffs];

            // Add selected city if not already included (user didn’t click "+")
            if (tripType === TRIP_TYPES.roundTrip && query) {
                // const trimmedQuery = query;
                if (!allDropOffs.includes(query)) {
                    allDropOffs.push(query);
                }
            }


            const coordList = [];
            let pickupCoords = null;

            if (tripType === TRIP_TYPES.oneWay || tripType === TRIP_TYPES.roundTrip) {
                pickupCoords = await getCoordinates(data.pickupCity);
                coordList.push(point([pickupCoords.lng, pickupCoords.lat]));
            }

            if (tripType === TRIP_TYPES.roundTrip) {
                if (allDropOffs.length) {
                    for (let city of allDropOffs) {
                        const coords = await getCoordinates(city);
                        coordList.push(point([coords.lng, coords.lat]));
                    }
                } else {
                    toast.error("Please add at least one drop-off location.");
                    return;
                }
                // Return to pickup location
                coordList.push(point([pickupCoords.lng, pickupCoords.lat]));
            } else if (tripType === TRIP_TYPES.oneWay) {
                if (data.dropCity) {
                    const dropCoords = await getCoordinates(data.dropCity);
                    coordList.push(point([dropCoords.lng, dropCoords.lat]));
                } else {
                    toast.error("Drop city is required for one-way trips.");
                    return;
                }
            }

            // Calculate total distance
            let totalDistance = 0;
            for (let i = 0; i < coordList.length - 1; i++) {
                totalDistance += distance(coordList[i], coordList[i + 1], {
                    units: 'kilometers',
                });
            }

            const bookingData = {
                ...data,
                coordinates: coordList,
                dropOffs: allDropOffs,
                totalDistance: (totalDistance + ((totalDistance * 25) / 100)).toFixed(0),
            };

            if (editTrip) setEditTrip(false);

            for (let obj in bookingData) {
                if (bookingData[obj] === undefined) bookingData[obj] = "";
            }

            if (!editTrip) await createNewEnquiry({ data: bookingData });

            router.push(`/Trip?tripData=${encodeURIComponent(JSON.stringify(bookingData))}`);
            if (editTrip) setEditTrip(false);
        } catch (err) {
            console.error("Error during form submission:", err);
        } finally {
            setLoading(false);
        }
    };


    // console.log(errors);

    return (
        <div className="w-full max-w-7xl mx-auto bg-white pb-2">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-6 pb-3"
            >
                {/* Trip Type Buttons */}
                <TripType setValue={setValue} tripType={tripType} />

                <div className="grid grid-cols-1 gap-4">
                    {/* Pickup City */}
                    <Pickup
                        sCity={pickupCity}
                        register={register}
                        setValue={setValue}
                        tripType={tripType}
                        pickupCities={pickupCities}
                        setPickupCities={setPickupCities}
                    />

                    {/* Drop suggestions */}
                    {tripType !== TRIP_TYPES.airport &&
                        tripType !== TRIP_TYPES.local && (
                            // Add `query` and `setQuery` to props passed to LocationSearch
                            <LocationSearch
                                register={register}
                                unregister={unregister}
                                setValue={setValue}
                                dropOffs={dropOffs}
                                setDropOffs={setDropOffs}
                                tripType={tripType}
                                pickupCity={pickupCity}
                                query={query}
                                setQuery={setQuery}
                            />
                        )}

                    {/* Pickup Date and Time */}
                    <PickupDate register={register} control={control} watch={watch} />

                    {/* Return Date */}
                    {tripType === TRIP_TYPES.roundTrip && (
                        <ReturnDate register={register} tripType={tripType}
                            pickupDate={watch('pickupDate')}
                            pickupTime={watch('pickupTime')}
                        />
                    )}

                    {/* Mobile Number */}
                    <MobileNo register={register} />

                    {Object.keys(errors).length > 0 && (
                        <p className="text-red-500 text-sm">Please fill all the required fields.</p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 mt-1 px-6 rounded-xl flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                Search Cabs <ArrowRightCircle size={20} />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}


// code to fetch cities list from firebase
// useEffect(() => {
//     const fetchPickupCities = async () => {
//         setLoading(true);
//         try {
//             const res = await getAllPickupCities();
//             setPickupCities(res || []);
//         } catch (err) {
//             console.error(err);
//         }
//         setLoading(false); ``
//     };
//     fetchPickupCities();
// }, []);

{/* <div className="flex gap-2 mb-4">
                    {['One Way', 'Round Trip', 'Local', 'Airport'].map(type => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setValue('tripType', type)}
                            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${tripType === type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div> */}

// pickup city
{/* <div>
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                            <MapPin size={16} className="text-primary" />
                            Pickup Location
                        </label>
                        <select
                            {...register('pickupCity', { required: true })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                        >
                            <option value="">Select City</option>
                            {pickupCities.map(city => (
                                <option key={city?.id} value={city?.name}>{city?.name}</option>
                            ))}
                        </select>
                    </div> */}


{/* Pickup Time */ }
{/* <div>
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                            <CalendarDays size={16} className="text-primary" />
                            Pickup Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            {...register('pickupTime', { required: true })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                        />
                    </div> */}


{/* Return Date */ }
{/* {tripType === 'Round Trip' && (
                        <div>
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                <CalendarDays size={16} className="text-primary" />
                                Return Date
                            </label>
                            <input
                                type="date"
                                {...register('returnDate', { required: true })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                            />
                        </div>
                    )} */}


{/* Mobile Number */ }
{/* <div>
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                            <Phone size={16} className="text-primary" />
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            placeholder="10-digit number"
                            {...register('mobileNumber', {
                                required: true,
                                pattern: /^[0-9]{10}$/,
                            })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                        />
                    </div> */}



{/* Drop or Via Cities */ }
{/* {tripType !== 'Local' && (
                        <div>
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                <ArrowRight size={16} className="text-primary" />
                                {tripType === 'Round Trip' ? 'Via Cities' : 'Drop Location'}
                            </label>

                            {
                                tripType === 'Round Trip' && dropOffs.length > 0 &&
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <div className="flex items-center gap-1 text-sm p-1 px-2 rounded-2xl bg-yellow-300">
                                        <span className="text-gray-600">{pickupCity}</span>
                                        <ArrowBigRightDashIcon />
                                    </div>
                                    {
                                        dropOffs.map((city, index) => (
                                            <div key={index} className="flex items-center gap-1 text-sm p-1 px-2 rounded-2xl bg-yellow-300">
                                                <span className="text-gray-600">{city}</span>
                                                <button type="button" onClick={() => setDropOffs((prev) => prev.filter((_, i) => i !== index))} className="text-red-500 hover:text-red-700" >
                                                    <IoCloseCircle />
                                                </button>
                                                <ArrowBigRightDashIcon />
                                            </div>
                                        ))}
                                    <span className="text-sm bg-yellow-300 p-1 px-2 rounded-2xl">
                                        {pickupCity}
                                    </span>
                                </div>
                            }

                            <select
                                {...register('dropCity', { required: tripType !== 'Round Trip' })}
                                onKeyDown={e => {
                                    if (tripType === 'Round Trip' && e.key === 'Enter') {
                                        e.preventDefault();
                                        const value = e.target.value;
                                        if (value && !dropOffs.includes(value)) {
                                            setDropOffs(prev => [...prev, value]);
                                        }
                                    }
                                }}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                            >
                                <option value="">Select City</option>
                                {cities.map(city => (
                                    city !== pickupCity && !dropOffs.includes(city) && (
                                        <option key={city} value={city}>{city}</option>
                                    )
                                ))}
                            </select> */}
