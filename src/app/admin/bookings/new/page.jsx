'use client';

import { useForm } from 'react-hook-form';
import InnerLayout from '@/components/dashboard/layout/InnerLayout';
import { TRIP_TYPES } from '@/lib/constants/constants';
import { useState } from 'react';
import ManualDrop from '@/components/admin/ManualDrop';
import PickupDate from '@/components/main/home/bookingForm/PickupDate';
import TripPrice from '@/components/main/home/bookingForm/TripPrice';
import ManualCabType from '@/components/main/home/bookingForm/ManualCabType';
import { createNewBooking } from '@/lib/firebase/admin/booking';
import { useRouter } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';

export default function Page() {

    const router = useRouter();
    const [dropOffs, setDropOffs] = useState([]);

    const {
        register,
        unregister,
        handleSubmit,
        setValue,
        formState: { errors },
        control,
        watch,
    } = useForm();

    const tripType = watch('tripType');
    const pickupCity = watch('pickupCity');

    const onSubmit = async (data) => {

        data = {
            userData: {
                name: data?.name,
                email: data?.email,
                phoneNo: data?.phoneNo,
            },
            tripType: data?.tripType,
            pickupCity: data?.pickupCity,
            pickupDate: Timestamp.fromDate(new Date(data?.pickupDate)),
            pickupTime: data?.pickupTime,
            returnDate: data?.returnDate ? data?.returnDate : "-",
            dropCity: data?.dropCity ? data?.dropCity : "-",
            cab: {
                name: data?.cabType,
                totalDistance: data?.totalDistance ? data?.totalDistance : "-",
                tripHours: data?.tripHours ? data?.tripHours : "-",
                price: "-",
                discountedPrice: "-"
            },
            totalDistance: data?.totalDistance ? data?.totalDistance : "-",
            tripHours: data?.tripHours ? data?.tripHours : "-",
            basePrice: data?.basePrice,
            totalAmount: data?.totalAmount,
            bookingAmount: 0,
            dropOffs: dropOffs ? dropOffs : [],
            gstAmount: data?.gstAmount,
            price: data?.basePrice,
            payment: {
                amount: data?.totalAmount,
                isFullPayment: false,
                status: "pending",
            },
            status: {
                booking: "accepted",
                trip: "Not Started",
            }
        }
        console.log('Update Data:', data);

        const result = await createNewBooking({ data });
        if (result)
            router.push('/admin/bookings')
    };

    return (
        <InnerLayout heading="Manual Booking">
            <section>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-6 rounded-xl shadow-md space-y-6 w-full max-w-xl"
                >
                    {/* Trip Type */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Trip Type <span className="text-red-500">*</span></label>
                        <select
                            {...register('tripType', { required: 'Trip type is required' })}
                            className="border p-2 py-1 rounded-md"
                        >
                            <option value={TRIP_TYPES.oneWay}>{TRIP_TYPES.oneWay}</option>
                            <option value={TRIP_TYPES.roundTrip}>{TRIP_TYPES.roundTrip}</option>
                            <option value={TRIP_TYPES.local}>{TRIP_TYPES.local}</option>
                            <option value={TRIP_TYPES.airport}>{TRIP_TYPES.airport}</option>
                        </select>
                        {errors.tripType && (
                            <span className="text-red-500 text-xs">{errors.tripType.message}</span>
                        )}
                    </div>

                    {/* Pickup City */}
                    <div className="flex flex-col">
                        <label htmlFor="pickupCity" className="text-sm font-medium mb-1">
                            Pickup City <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="pickupCity"
                            {...register('pickupCity', {
                                required: 'Pickup City is required',
                            })}
                            placeholder="Eg. Delhi, UP, Bihar"
                            className="border p-2 py-1 rounded-md"
                        />
                        {errors.pickupCity && (
                            <span className="text-red-500 text-xs">{errors.pickupCity.message}</span>
                        )}
                    </div>

                    {/* Drop suggestions */}
                    {
                        tripType !== TRIP_TYPES.airport &&
                        tripType !== TRIP_TYPES.local && (
                            <ManualDrop
                                register={register}
                                unregister={unregister}
                                setValue={setValue}
                                dropOffs={dropOffs}
                                setDropOffs={setDropOffs}
                                tripType={tripType}
                                pickupCity={pickupCity}
                            />
                        )}

                    {/* Pickup Date & Time */}
                    <PickupDate register={register} control={control} watch={watch} />

                    {/* Return Date - Only for Round Trip */}
                    {tripType === TRIP_TYPES.roundTrip && (
                        <div className="flex flex-col">
                            <label htmlFor="returnDate" className="text-sm font-medium mb-1">
                                Return Date
                            </label>
                            <input
                                type="date"
                                id="returnDate"
                                {...register('returnDate', {
                                    required: 'Return Date is required',
                                })}
                                className="border p-2 py-1 rounded-md"
                            />
                            {errors.returnDate && (
                                <span className="text-red-500 text-xs">{errors.returnDate.message}</span>
                            )}
                        </div>
                    )}

                    {/* Local/Airport Trip Distance */}
                    {(tripType === TRIP_TYPES.local || tripType === TRIP_TYPES.airport) && (
                        <div className="flex flex-col">
                            <label htmlFor="totalDistance" className="text-sm font-medium mb-1">
                                Distance Covered
                            </label>
                            <input
                                type="text"
                                id="totalDistance"
                                {...register('totalDistance', {
                                    required: 'Required',
                                })}
                                className="border p-2 py-1 rounded-md"
                            />
                            {errors.totalDistance && (
                                <span className="text-red-500 text-xs">{errors.totalDistance.message}</span>
                            )}
                        </div>
                    )}

                    {/* Local/Airport Trip Hours */}
                    {(tripType === TRIP_TYPES.local || tripType === TRIP_TYPES.airport) && (
                        <div className="flex flex-col">
                            <label htmlFor="tripHours" className="text-sm font-medium mb-1">
                                Trip Hours
                            </label>
                            <input
                                type="text"
                                id="tripHours"
                                {...register('tripHours', {
                                    required: 'Required',
                                })}
                                className="border p-2 py-1 rounded-md"
                            />
                            {errors.tripHours && (
                                <span className="text-red-500 text-xs">{errors.tripHours.message}</span>
                            )}
                        </div>
                    )}

                    <ManualCabType register={register} />

                    {/* Trip Price  */}
                    <TripPrice register={register} watch={watch} setValue={setValue} />

                    {/* Customer Name */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium mb-1">
                            Customer Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                            placeholder="Eg., Rahul, Mukesh"
                            className="border p-2 py-1 rounded-md"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-xs">{errors.name.message}</span>
                        )}
                    </div>

                    {/* Customer Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium mb-1">
                            Customer Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                            })}
                            placeholder="rahul@gmailcom"
                            className="border p-2 py-1 rounded-md"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Customer Mobile Number */}
                    <div className="flex flex-col">
                        <label htmlFor="phoneNo" className="text-sm font-medium mb-1">
                            Customer Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phoneNo"
                            {...register('phoneNo', {
                                required: 'Mobile Number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Enter a valid 10-digit number',
                                },
                            })}
                            placeholder="Enter 10-digit mobile number"
                            className="border p-2 py-1 rounded-md"
                        />
                        {errors.phoneNo && (
                            <span className="text-red-500 text-xs">{errors.phoneNo.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-800 cursor-pointer transition"
                    >
                        Book Cab
                    </button>
                </form>

            </section>
        </InnerLayout>
    );
}
