"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import useAuthStore from '@/store/useAuthStore'
import { CheckCircle, MapPin, Car, User, CreditCard, Home } from 'lucide-react'
import { getBookingDetails } from '@/lib/firebase/admin/booking'
import { TRIP_TYPES } from '@/lib/constants/constants'
import { formatFirestoreDate } from '@/lib/firebase/services/formatDate';

export default function BookingData() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [bookingData, setBookingData] = useState(null)
    const [loading, setLoading] = useState(true)

    const bookingId = searchParams.get('bookingId')

    async function getBookingDetailsFromId(bookingId) {
        try {
            const res = await getBookingDetails(bookingId)
            setBookingData(res)
        } catch (error) {
            console.error("Error fetching booking details:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (bookingId) {
            getBookingDetailsFromId(bookingId)
        }
    }, [bookingId])

    const isRoundTrip = useMemo(() => {
        return bookingData?.tripType === 'Round Trip'
    }, [bookingData])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-500">Loading booking details...</p>
            </div>
        )
    }

    if (!bookingId || !bookingData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-500">No booking details found.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-4 md:py-7 px-2 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-sm sm:rounded-xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="h-12 w-12 text-white" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
                        <p className="text-emerald-100 font-medium">
                            Booking ID: <span className="font-bold">{bookingId}</span>
                        </p>
                        <p className='text-white mt-2'>Thanks for booking trip with us. Our team will reach out to you soon.</p>
                        <p className='text-white'>For any queries, contact us at - 9869855698</p>
                    </div>

                    <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <User className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Passenger Details</h3>
                                    <p className="text-gray-600">{bookingData?.userData?.name}</p>
                                    <p className="text-gray-600 text-sm">{bookingData.userData?.email}</p>
                                    <p className="text-gray-600 text-sm">+91 {bookingData.userData?.phoneNo}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <MapPin className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Trip Details</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Trip Type:</span>
                                            <span className="font-medium">{bookingData.tripType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">From:</span>
                                            <span className="font-medium">{bookingData.pickupCity}</span>
                                        </div>
                                        {
                                            bookingData?.tripType === TRIP_TYPES.roundTrip ||
                                            bookingData?.tripType === TRIP_TYPES.oneWay &&
                                            <div className="flex justify-between gap-2">
                                                <span className="text-gray-600">To:</span>
                                                {isRoundTrip && bookingData.dropOffs?.length > 0 ? (
                                                    <span className="font-medium text-right self-end">
                                                        {bookingData.dropOffs.join(' → ')}
                                                    </span>
                                                ) : (
                                                    <span className="font-medium  self-end">{bookingData.dropCity}</span>
                                                )}
                                            </div>
                                        }
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Distance:</span>
                                            <span className="font-medium">{bookingData.totalDistance} km</span>
                                        </div>
                                        {
                                            bookingData?.totalHours &&
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Hours:</span>
                                                <span className="font-medium">{bookingData.totalHours} km</span>
                                            </div>
                                        }
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Pickup Date:</span>
                                            <span className="font-medium">{
                                                formatFirestoreDate(bookingData?.pickupDate)
                                            }</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Pickup Time:</span>
                                            <span className="font-medium">{bookingData.pickupTime}</span>
                                        </div>
                                        {
                                            bookingData?.noOfDays &&
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">No of Days Trip:</span>
                                                <span className="font-medium text-blue-600">{bookingData.noOfDays}</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Car className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Vehicle Details</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Cab Type: </span>
                                            <span className="font-medium">{bookingData.cab?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Price per km:</span>
                                            <span className="font-medium">
                                                ₹{isRoundTrip ? bookingData.cab?.discountedPriceRoundTrip : bookingData.cab?.discountedPriceOneWay}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <CreditCard className="h-6 w-6 text-blue-600" />
                                <h3 className="text-xl font-semibold text-gray-800">Payment Summary</h3>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Base Fare</span>
                                    <span className="font-medium">₹{bookingData.basePrice?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Driver Allowance</span>
                                    <span className="font-medium">₹{bookingData.driverAllowance?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">GST (5%)</span>
                                    <span className="font-medium">₹{bookingData.gstAmount?.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 mt-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-800 font-semibold">Total Amount</span>
                                        <span className="text-blue-600 font-bold">₹{bookingData.totalAmount?.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-3 mt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-green-700 font-medium">Amount Paid</span>
                                        <span className="text-green-700 font-bold">₹{bookingData.payment?.amount?.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mt-6 pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500 text-center">
                                    {bookingData.payment?.status === 'completed'
                                        ? "Payment receipt has been sent to your email"
                                        : "Payment receipt will be sent to your email"}
                                </p>
                            </div> */}
                        </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-center gap-3">
                        <button
                            onClick={() => router.push('/my-trips')}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                            <span>View My Trips</span>
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="flex-1 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors flex items-center justify-center space-x-2"
                        >
                            <Home className="h-5 w-5" />
                            <span>Back to Home</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}