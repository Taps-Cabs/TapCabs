import React from 'react'
import { Badge } from '@/components/ui/badge';
import { BadgeCheck, Car, ClipboardList, Coins, CreditCard, MapPin, MoveLeft, Pencil, Trash, UserRound } from 'lucide-react';
import { formatFirestoreDate } from '@/lib/firebase/services/formatDate';
import { format } from 'date-fns';
import { TRIP_TYPES } from '@/lib/constants/constants';

function BookingFullDetails({ booking, vendor }) {
    // console.log(booking)
    // console.log(booking?.pickupDate)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Location Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800">Location Details</h3>
                </div>
                <div className="space-y-4 grid grid-cols-2">
                    <div>
                        <p className="text-gray-500 text-xs mb-1">Pickup City</p>
                        <p className="font-medium text-gray-900">{booking?.pickupCity}</p>
                    </div>

                    {booking?.tripType === "Round Trip" && booking?.dropOffs?.length > 0 ? (
                        <div>
                            <p className="text-gray-500 text-xs mb-1">Drop-off Points</p>
                            <div className="space-y-2">
                                {booking.dropOffs.map((dropOff, index) => (
                                    <div key={index} className="flex items-center gap-2 text-gray-900">
                                        <span className="text-xs text-gray-500">{index + 1}.</span>
                                        {dropOff}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : booking?.tripType === "One Way" ? (
                        <div>
                            <p className="text-gray-500 text-xs mb-1">Drop City</p>
                            <p className="font-medium text-gray-900">{booking?.dropCity || 'N/A'}</p>
                        </div>
                    ) : null}

                    <div>
                        <p className="text-gray-500 text-xs mb-1">Total Distance</p>
                        <p className="font-medium text-gray-900">{booking?.totalDistance} km</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-xs mb-1">Pickup Date</p>
                        <p className="font-medium text-gray-900">
                            {booking?.pickupDate?.seconds
                                ? format(new Date(booking?.pickupDate?.seconds * 1000), 'dd MMM yyyy, hh:mm a')
                                : 'N/A'}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-xs mb-1">Pickup Time</p>
                        <p className="font-medium text-gray-900">
                            {booking?.pickupTime || 'N/A'}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-xs mb-1">Exact Pickup Location</p>
                        <p className="font-medium text-gray-900">
                            {booking?.userData?.exactPickup || 'N/A'}
                        </p>
                    </div>

                </div>
            </div>

            {/* User Information Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <UserRound className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800">User Information</h3>
                </div>
                <div className="space-y-4">
                    {[
                        ['Name', booking?.userData?.name],
                        ['Contact', booking?.userData?.phoneNo],
                        ['Email', booking?.userData?.email],
                    ].map(([label, value], idx) => (
                        <div key={idx}>
                            <p className="text-gray-500 text-xs mb-1">{label}</p>
                            <p className="font-medium text-gray-900 break-words">{value || 'N/A'}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                        <Coins className="w-5 h-5 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800">Pricing Details</h3>
                </div>
                <div className="space-y-4">
                    {[
                        ['Base Price', `₹${booking?.basePrice}`],
                        ['GST', `₹${booking?.gstAmount}`],
                        ['Total Amount', `₹${booking?.totalAmount}`, 'text-blue-600 font-semibold'],
                        [
                            'Extra Kms Price',
                            `${booking?.extraKm || 0}Kms * ${booking?.cab?.basePrice || 0} = ₹${(+booking?.extraKm || 0) * (+booking?.cab?.basePrice || 0)
                            }`,
                            'text-blue-600 font-semibold'
                        ],
                        [
                            'Extra Hours Price',
                            `${booking?.extraHour || 0}Hrs * ${booking?.cab?.extraHours || 0} = ₹${(+booking?.extraHour || 0) * (+booking?.cab?.extraHours || 0)
                            }`,
                            'text-blue-600 font-semibold'
                        ],
                        ['Extra Charge', `₹${booking?.extraCharge || 0}`, 'text-blue-600 font-semibold']
                    ].map(([label, value, style], idx) => (
                        <div key={idx} className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm">{label}</span>
                            <span className={`text-gray-900 ${style || ''}`}>{value}</span>
                        </div>
                    ))}
                    <div className="pt-4 mt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">Paid Amount</span>
                            <span className="text-blue-600 font-semibold">
                                ₹{booking.payment?.isFullPayment ? booking?.payment?.amount : booking.bookingAmount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Summary Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <ClipboardList className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800">Booking Summary</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    {[
                        ['Booking ID', `#${booking?.id}`, false],
                        ['Trip Type', booking?.tripType, true],
                        ['Distance', `${booking?.totalDistance} km`, false],
                        [
                            'Created',
                            booking?.createdAt?.seconds
                                ? format(new Date(booking.createdAt.seconds * 1000), 'dd MMM yyyy, hh:mm a')
                                : 'N/A',
                            false
                        ],
                    ].map(([label, value, isBadge], idx) => (
                        <div key={idx}>
                            <p className="text-gray-500 text-xs mb-1">{label}</p>
                            {isBadge ? (
                                <Badge variant="outline" className="border-blue-300 text-blue-800">
                                    {value}
                                </Badge>
                            ) : (
                                <p className="font-medium text-gray-900">{value}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Cab Details Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <Car className="w-5 h-5 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800">Cab Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    {(booking?.tripType === "Local" || booking?.tripType === "Airport" ? (
                        [
                            ['Cab Name', booking?.cab?.name],
                            ['Total Distance', `${booking?.cab?.totalDistance} km`],
                            ['Trip Hours', `${booking?.cab?.tripHours} hr`],
                            ['Base Price', `₹${booking?.cab?.price}`],
                            ['Discounted Price', `₹${booking?.cab?.discountedPrice}`],
                        ]
                    ) : (
                        [
                            ['Cab Name', booking?.cab?.name],
                            ['Min Kilometers', `${booking?.tripType === TRIP_TYPES.oneWay ? booking?.cab?.minKilometersOneWay :
                                booking?.cab?.minKilometersRoundTrip} km`],
                            ['Driver Allowance', `₹${booking?.cab?.driverAllowance}`],
                            ['Price', `₹${booking?.tripType === "One Way"
                                ? booking?.cab?.actualPriceOneWay
                                : booking?.cab?.actualPriceRoundTrip}`],
                        ]
                    )).map(([label, value], idx) => (
                        value !== undefined && (
                            <div key={idx} className="space-y-0.5">
                                <dt className="text-xs font-medium text-gray-500">{label}</dt>
                                <dd className="text-sm text-gray-900 font-medium">
                                    {value || '--'}
                                </dd>
                            </div>
                        )
                    ))}
                </div>

            </div>

            {/* Status Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <BadgeCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800">Status Overview</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-500 text-xs mb-1 capitalize">booking</p>
                        <Badge className="rounded-full px-3 py-1 text-xs bg-green-100 text-green-800">
                            {booking?.status?.booking || 'not assigned'}
                        </Badge>
                    </div>

                    <div>
                        <p className="text-gray-500 text-xs mb-1 capitalize">driver</p>
                        <Badge className="rounded-full px-3 py-1 text-xs bg-yellow-100 text-yellow-800">
                            {booking?.status?.driver || 'not assigned'}
                        </Badge>
                    </div>

                    <div>
                        <p className="text-gray-500 text-xs mb-1 capitalize">trip</p>
                        <Badge className="rounded-full px-3 py-1 text-xs bg-blue-100 text-blue-800">
                            {booking?.status?.trip || 'not started'}
                        </Badge>
                    </div>

                    <div>
                        <p className="text-gray-500 text-xs mb-1 capitalize">vendor</p>
                        <Badge className="rounded-full px-3 py-1 text-xs bg-purple-100 text-purple-800">
                            {vendor?.name || 'not assigned'}
                        </Badge>
                    </div>
                </div>

            </div>

            {/* Payment Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800">Payment Information</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-gray-500 text-xs mb-1">Payment ID</p>
                        <p className="font-medium text-gray-900 break-all">{booking?.payment?.paymentId}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Status</span>
                        <Badge className={` px-3 py-1 rounded-full`}>
                            {booking?.payment?.status}
                        </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Payment Type</span>
                        <Badge variant="outline" className="border-blue-300 text-blue-800">
                            {booking?.payment?.isFullPayment ? "Full" : "Partial"}
                        </Badge>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BookingFullDetails
