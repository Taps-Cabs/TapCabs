// 'use client'
// import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";

// function BookingsList({ bookings }) {
//     const [selectedBooking, setSelectedBooking] = useState(null);

//     return (
//         <div>
//             <ScrollArea className="h-full sm:pr-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
//                     {bookings && bookings?.map((booking, index) => (
//                         <Dialog key={index}>
//                             <DialogTrigger asChild>
//                                 <div
//                                     onClick={() => setSelectedBooking(booking)}
//                                     className="p-4 cursor-pointer hover:shadow-lg transition duration-200 bg-white rounded-xl shadow-md space-y-2"
//                                 >
//                                     <div className="text-lg font-semibold text-purple-700">{booking.tripType}</div>
//                                     <div className="text-sm text-gray-600">{booking.vehicleType} • {booking.pickUpLocation} → {booking.dropLocation}</div>
//                                     <div className="text-sm text-gray-500">Pick-up: {booking.pickUpDate} at {booking.pickUpTime}</div>
//                                     {booking.returnDate && <div className="text-sm text-gray-500">Return: {booking.returnDate}</div>}
//                                     <div className="mt-2 text-sm">
//                                         Status:{" "}
//                                         <span
//                                             className={`font-medium px-2 py-1 rounded ${booking.confirmationStatus === "Pending"
//                                                 ? "bg-yellow-100 text-yellow-800"
//                                                 : booking.confirmationStatus === "Confirmed"
//                                                     ? "bg-green-100 text-green-800"
//                                                     : booking.confirmationStatus === "Rejected"
//                                                         ? "bg-red-100 text-red-800"
//                                                         : "bg-gray-100 text-gray-800"
//                                                 }`}
//                                         >
//                                             {booking.confirmationStatus}
//                                         </span>
//                                     </div>
//                                     <div className="text-sm">Customer: {booking.customer.name}</div>
//                                 </div>
//                             </DialogTrigger>

//                             <DialogContent>
//                                 <DialogHeader>
//                                     <DialogTitle>Booking Details</DialogTitle>
//                                     <DialogDescription>
//                                         Full trip information for <strong>{booking.customer.name}</strong>
//                                     </DialogDescription>
//                                 </DialogHeader>

//                                 <div className="space-y-2">
//                                     <p><strong>Trip Type:</strong> {booking.tripType}</p>
//                                     <p><strong>Vehicle:</strong> {booking.vehicleType}</p>
//                                     <p><strong>Pick-up:</strong> {booking.pickUpLocation} on {booking.pickUpDate} at {booking.pickUpTime}</p>
//                                     {booking.returnDate && <p><strong>Return:</strong> {booking.returnDate}</p>}
//                                     <p><strong>Drop:</strong> {booking.dropLocation}</p>
//                                     <p><strong>Status:</strong> {booking.confirmationStatus}</p>
//                                     <p><strong>Trip Status:</strong> {booking.tripStatus}</p>
//                                     <hr />
//                                     <p><strong>Customer Name:</strong> {booking.customer.name}</p>
//                                     <p><strong>Phone:</strong> {booking.customer.mobileNo}</p>
//                                     <p><strong>Email:</strong> {booking.customer.email}</p>
//                                     <p><strong>Vendor:</strong> {booking.assignedVendor ? booking.assignedVendor : "Not Assigned"}</p>
//                                 </div>

//                                 {booking.confirmationStatus === "Pending" && (
//                                     <div className="flex justify-end gap-2 mt-4">
//                                         <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">Reject</Button>
//                                         <Button className="bg-green-600 hover:bg-green-700 text-white">Accept</Button>
//                                     </div>
//                                 )}
//                             </DialogContent>
//                         </Dialog>
//                     ))}
//                 </div>
//             </ScrollArea>
//         </div>
//     )
// }

// export default BookingsList
