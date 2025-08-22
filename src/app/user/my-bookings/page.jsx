'use client'

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

function page() {

    const BOOKINGS_LIST = [
        {
            tripType: 'Round Trip',
            vehicleType: 'Sedan',
            pickUpLocation: "Delhi",
            dropLocation: 'Meerut',
            pickUpDate: '20 Apr 2025',
            pickUpTime: '12:30 AM',
            returnDate: "22 Apr 2025",
            confirmationStatus: "Pending",
            tripStatus: 'Pending',
            customer: {
                name: "Raghav",
                mobileNo: 9844587856,
                email: 'raghav@gmail.com'
            },
            assignedVendor: null
        },
        {
            tripType: 'One Way',
            vehicleType: 'Sedan',
            pickUpLocation: "Delhi",
            dropLocation: 'Meerut',
            pickUpDate: '20 Apr 2025',
            pickUpTime: '12:30 AM',
            confirmationStatus: "Pending",
            tripStatus: 'Pending',
            customer: {
                name: "Anju",
                mobileNo: 9856987856,
                email: 'anju@gmail.com'
            },
            assignedVendor: "PtkcL4WAoSWLFUxAN8sHwGAkNY73"
        },
        {
            tripType: 'One Way',
            vehicleType: 'SUV',
            pickUpLocation: "Noida",
            dropLocation: 'Agra',
            pickUpDate: '21 Apr 2025',
            pickUpTime: '9:00 AM',
            confirmationStatus: "Confirmed",
            tripStatus: 'Scheduled',
            customer: {
                name: "Sohail",
                mobileNo: 9876543210,
                email: 'sohail@gmail.com'
            },
            assignedVendor: "AbcdEfGh123456"
        },
        {
            tripType: 'Round Trip',
            vehicleType: 'Hatchback',
            pickUpLocation: "Gurgaon",
            dropLocation: 'Jaipur',
            pickUpDate: '22 Apr 2025',
            pickUpTime: '7:30 AM',
            returnDate: "24 Apr 2025",
            confirmationStatus: "Rejected",
            tripStatus: 'Cancelled',
            customer: {
                name: "Pooja",
                mobileNo: 9123456789,
                email: 'pooja@yahoo.com'
            },
            assignedVendor: null
        },
        {
            tripType: 'One Way',
            vehicleType: 'Sedan',
            pickUpLocation: "Chandigarh",
            dropLocation: 'Delhi',
            pickUpDate: '23 Apr 2025',
            pickUpTime: '4:00 PM',
            confirmationStatus: "Confirmed",
            tripStatus: 'Completed',
            customer: {
                name: "Vikram",
                mobileNo: 9988776655,
                email: 'vikram@outlook.com'
            },
            assignedVendor: "VendorUID09876"
        },
        {
            tripType: 'Round Trip',
            vehicleType: 'SUV',
            pickUpLocation: "Lucknow",
            dropLocation: 'Varanasi',
            pickUpDate: '25 Apr 2025',
            pickUpTime: '10:00 AM',
            returnDate: "28 Apr 2025",
            confirmationStatus: "Pending",
            tripStatus: 'Pending',
            customer: {
                name: "Neha",
                mobileNo: 9001122334,
                email: 'neha@rediffmail.com'
            },
            assignedVendor: null
        },
        {
            tripType: 'One Way',
            vehicleType: 'Hatchback',
            pickUpLocation: "Pune",
            dropLocation: 'Mumbai',
            pickUpDate: '26 Apr 2025',
            pickUpTime: '6:45 AM',
            confirmationStatus: "Confirmed",
            tripStatus: 'Ongoing',
            customer: {
                name: "Arjun",
                mobileNo: 8899776655,
                email: 'arjun@gmail.com'
            },
            assignedVendor: "VendorXyz789"
        },
        {
            tripType: 'Round Trip',
            vehicleType: 'Sedan',
            pickUpLocation: "Hyderabad",
            dropLocation: 'Vizag',
            pickUpDate: '27 Apr 2025',
            pickUpTime: '3:15 PM',
            returnDate: "29 Apr 2025",
            confirmationStatus: "Confirmed",
            tripStatus: 'Scheduled',
            customer: {
                name: "Sneha",
                mobileNo: 9876547890,
                email: 'sneha@gmail.com'
            },
            assignedVendor: "VendorUID12345"
        }
    ];


    const [selectedBooking, setSelectedBooking] = useState(null);

    return (
        <div>
            <InnerLayout heading={"Bookings"}>
                <ScrollArea className="h-full sm:pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {BOOKINGS_LIST.map((booking, index) => (
                            <Dialog key={index}>
                                <DialogTrigger asChild>
                                    <div
                                        onClick={() => setSelectedBooking(booking)}
                                        className="p-4 cursor-pointer hover:shadow-lg transition duration-200 bg-white rounded-xl shadow-md space-y-2"
                                    >
                                        <div className="text-lg font-semibold text-purple-700">{booking.tripType}</div>
                                        <div className="text-sm text-gray-600">{booking.vehicleType} • {booking.pickUpLocation} → {booking.dropLocation}</div>
                                        <div className="text-sm text-gray-500">Pick-up: {booking.pickUpDate} at {booking.pickUpTime}</div>
                                        {booking.returnDate && <div className="text-sm text-gray-500">Return: {booking.returnDate}</div>}
                                        <div className="mt-2 text-sm">
                                            Status:{" "}
                                            <span
                                                className={`font-medium px-2 py-1 rounded ${booking.confirmationStatus === "Pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : booking.confirmationStatus === "Confirmed"
                                                        ? "bg-green-100 text-green-800"
                                                        : booking.confirmationStatus === "Rejected"
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {booking.confirmationStatus}
                                            </span>
                                        </div>
                                        {/* <div className="text-sm">Customer: {booking.customer.name}</div> */}
                                    </div>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Booking Details</DialogTitle>
                                        <DialogDescription>
                                            Full trip information for <strong>{booking.customer.name}</strong>
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-2">
                                        <p><strong>Trip Type:</strong> {booking.tripType}</p>
                                        <p><strong>Vehicle:</strong> {booking.vehicleType}</p>
                                        <p><strong>Pick-up:</strong> {booking.pickUpLocation} on {booking.pickUpDate} at {booking.pickUpTime}</p>
                                        {booking.returnDate && <p><strong>Return:</strong> {booking.returnDate}</p>}
                                        <p><strong>Drop:</strong> {booking.dropLocation}</p>
                                        {/* <p><strong>Status:</strong> {booking.confirmationStatus}</p> */}
                                        <p><strong>Trip Status:</strong> {booking.tripStatus}</p>
                                        <hr />
                                        {/* <p><strong>Customer Name:</strong> {booking.customer.name}</p> */}
                                        <p><strong>Phone:</strong> {booking.customer.mobileNo}</p>
                                        <p><strong>Email:</strong> {booking.customer.email}</p>
                                        {/* <p><strong>Vendor:</strong> {booking.assignedVendor ? booking.assignedVendor : "Not Assigned"}</p> */}
                                    </div>
                                    {/* 
                                    {booking.confirmationStatus === "Pending" && (
                                        <div className="flex justify-end gap-2 mt-4">
                                            <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">Reject</Button>
                                            <Button className="bg-green-600 hover:bg-green-700 text-white">Accept</Button>
                                        </div>
                                    )} */}
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </ScrollArea>
            </InnerLayout>
        </div>
    )
}

export default page
