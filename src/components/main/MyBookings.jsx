'use client'

import { toWords } from 'number-to-words';
import { useState } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import {
    CalendarDays,
    Clock,
    MapPin,
    Car,
    Wallet,
    User,
    BadgeInfo,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { TRIP_TYPES } from '@/lib/constants/constants';
import { MAIN_WEBSITE } from '@/lib/assets/assets';
import isTimestampLike, { formatFirestoreDate } from '@/lib/firebase/services/formatDate';
import { Timestamp } from 'firebase/firestore';

const BookingHistory = ({ bookings }) => {
    const [selectedBooking, setSelectedBooking] = useState(null)

    const formatDate = (dateString) => {

        // console.log(dateString, dateString instanceof Timestamp)
        if (isTimestampLike(dateString)) {
            return formatFirestoreDate(dateString);
        }

        const options = { day: 'numeric', month: 'long', year: 'numeric' }
        return new Date(dateString).toLocaleDateString('en-IN', options)
    }

    const getBookingStatus = (pickupDate) => {
        const today = new Date()
        const bookingDate = new Date(pickupDate)
        today.setHours(0, 0, 0, 0)
        bookingDate.setHours(0, 0, 0, 0)

        if (bookingDate < today) return 'Completed'
        if (bookingDate > today) return 'Upcoming'
        return 'Current'
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'current': return 'bg-blue-100 text-blue-800'
            case 'upcoming': return 'bg-yellow-100 text-yellow-800'
            case 'completed': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }
    const generateReceipt = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        let yPosition = 15;

        // Company Header
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.setFont('helvetica', 'bold');
        doc.text("BOOKING INVOICE", pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;

        // Add logo image (parameters: imageData, x, y, width, height)
        doc.addImage(MAIN_WEBSITE.logo, 'PNG', 15, 15, 30, 15)
        yPosition = 30;

        // Company Details
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text("C 23 Malviya Nagar, Moradabad Uttar Pradesh 244001", 15, yPosition + 5);
        doc.text("24*7 7248772488 | INFO@TAPSCABS.COM | GSTIN 09BEWPG1107F12K", 15, yPosition + 10);
        yPosition += 20;

        // Invoice Details
        const invoiceDate = formatDate(selectedBooking?.createdAt) ? formatDate(selectedBooking?.createdAt)
            : formatFirestoreDate(selectedBooking?.createdAt);

        const createdAt = selectedBooking?.createdAt;
        const mobile = selectedBooking?.userData?.phoneNumber || selectedBooking?.userData?.phoneNo || "NA";

        let invoiceId = "INV-UNKNOWN";
        if (createdAt) {
            const date = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1e6);
            const pad = (n) => n.toString().padStart(2, "0");
            const hours = pad(date.getHours() % 12 || 12);
            const minutes = pad(date.getMinutes());
            const ampm = date.getHours() >= 12 ? "PM" : "AM";

            invoiceId = `INV-${mobile}-${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        }


        doc.text(`Invoice No: TC/${invoiceId}`, 15, yPosition);
        doc.text(`Invoice Date: ${invoiceDate}`, pageWidth - 15, yPosition, { align: 'right' });
        yPosition += 10;

        // Customer Details
        doc.setFont('helvetica', 'bold');
        doc.text(`${selectedBooking?.userData?.name}`, 15, yPosition);
        doc.text(`${selectedBooking?.userData?.email}`, 15, yPosition + 5);
        doc.text(`${selectedBooking?.userData?.phoneNo}`, 15, yPosition + 10);
        doc.text(`Pickup City: ${selectedBooking?.pickupCity}`, pageWidth - 15, yPosition, { align: 'right' });
        yPosition += 20;

        if (selectedBooking?.tripType === TRIP_TYPES.oneWay) {
            doc.text(`Drop: ${selectedBooking?.dropCity}`, 15, yPosition);
            // yPosition += 5;
        } else if (selectedBooking?.tripType === TRIP_TYPES.roundTrip) {
            doc.text(`Drops:`, 15, yPosition);
            for (let i = 0; i < selectedBooking?.dropOffs?.length; i++) {
                doc.text(`\n\t${i + 1}. ${selectedBooking?.dropOffs[i]}`, 15, yPosition + 5 * i);
            }
            yPosition += 10;
        }

        // Calculate line items
        const items = [];
        const tripType = selectedBooking?.tripType?.toLowerCase();

        const basePrice = +selectedBooking?.priceWithAllowance

        // Main Service
        items.push([
            1,
            `${selectedBooking?.pickupCity} ${tripType} Service`,
            "1.00",
            basePrice?.toFixed(2),
            `${(basePrice * 0.05).toFixed(2)} 5%`,
            (+selectedBooking?.totalAmount)?.toFixed(2)
        ]);


        // Items Table
        autoTable(doc, {
            startY: yPosition + 10,
            head: [['#', 'Description', 'Qty', 'Rate', 'IGST', 'Amount']],
            body: items,
            theme: 'grid',
            styles: { fontSize: 10 },
            headStyles: {
                fillColor: [0, 0, 0],  // Black color
                textColor: [255, 255, 255]
            },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 80 },
                2: { cellWidth: 20 },
                3: { cellWidth: 25 },
                4: { cellWidth: 35 },
                5: { cellWidth: 25 }
            }
        });

        // Calculations
        // const subtotal = items.reduce((sum, item) => sum + parseFloat(item[5]), 0);
        const subtotal = basePrice;
        const gst = subtotal * 0.05;
        const total = subtotal + gst;

        // Summary Table
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            body: [
                ["Sub Total", subtotal.toFixed(2)],
                ["IGST5 (5%)", gst.toFixed(2)],
                ["Total", total.toFixed(2)],
                ["Balance Paid", selectedBooking?.bookingAmount?.toFixed(2)],
                ["Balance Due", (total.toFixed(2) - selectedBooking?.bookingAmount?.toFixed(2)).toFixed(2)]
            ],
            theme: 'plain',
            styles: { fontSize: 12, fontStyle: 'bold' },
            columnStyles: {
                0: { halign: 'right', cellWidth: 100 },
                1: { cellWidth: 50, halign: 'right' }
            }
        });

        // Total in Words
        doc.setFont('helvetica', 'bold');
        doc.text(`Total in Words: Indian Rupee ${toWords(total.toFixed(2)).replace(/ point/g, ' and')} Only`, 15, doc.lastAutoTable.finalY + 15);

        // Footer
        const footerY = doc.internal.pageSize.getHeight() - 30;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text("This is an electronically generated invoice and does not require signature.", 15, footerY);
        doc.text("All disputes are subject to jurisdiction of courts in Moradabad.", 15, footerY + 5);
        doc.text("Please refer our website www.tapscabs.com for Terms and Conditions.", 15, footerY + 10);

        // Save PDF
        doc.save(`invoice-${invoiceId}.pdf`);
    };

    return (
        <div className="w-full mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Bookings</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {bookings?.map((booking) => {
                    const status = getBookingStatus(formatDate(booking?.pickupDate) ? formatDate(booking?.pickupDate)
                        : formatFirestoreDate(booking?.pickupDate))
                    return (
                        <div
                            key={booking.id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border p-4 cursor-pointer"
                            onClick={() => setSelectedBooking(booking)}
                        >
                            <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                    <Badge className={getStatusColor(status)}>
                                        {status}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                        #{booking.payment.paymentId.slice(-6)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Car className="h-5 w-5 text-primary" />
                                    <span className="font-medium">{booking.cab.name}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    <span>{booking.pickupCity}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <CalendarDays className="h-5 w-5 text-primary" />
                                    {
                                        formatDate(booking?.pickupDate) ? formatDate(booking?.pickupDate)
                                            : formatFirestoreDate(booking?.pickupDate)
                                    }
                                    <Clock className="h-5 w-5 ml-2 text-primary" />
                                    {booking.pickupTime}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
                {selectedBooking && (
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl">
                                Booking Details - {selectedBooking.cab.name}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Trip Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <BadgeInfo className="h-6 w-6 text-primary" />
                                    <h3 className="text-lg font-semibold">Trip Information</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Type:</strong> {selectedBooking.tripType}</p>
                                    <p><strong>Distance:</strong> {selectedBooking.totalDistance} km</p>
                                    <p><strong>Duration:</strong> {selectedBooking.totalHours} hours</p>
                                    <p><strong>Pickup:</strong> {
                                        formatDate(selectedBooking.pickupDate) ? formatDate(selectedBooking.pickupDate)
                                            : formatFirestoreDate(selectedBooking.pickupDate)
                                    } at
                                        {selectedBooking.pickupTime}</p>
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Wallet className="h-6 w-6 text-primary" />
                                    <h3 className="text-lg font-semibold">Payment Details</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Amount:</strong> ₹{selectedBooking.payment.amount}</p>
                                    <p><strong>Status:</strong>
                                        <Badge className={`ml-2 ${getStatusColor(selectedBooking.payment.status)}`}>
                                            {selectedBooking.payment.status}
                                        </Badge>
                                    </p>
                                    <p><strong>Payment ID:</strong> {selectedBooking.payment.paymentId}</p>
                                </div>
                            </div>

                            {/* User Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <User className="h-6 w-6 text-primary" />
                                    <h3 className="text-lg font-semibold">Passenger Details</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Name:</strong> {selectedBooking.userData.name}</p>
                                    <p><strong>Email:</strong> {selectedBooking.userData.email}</p>
                                    <p><strong>Phone:</strong> {selectedBooking.userData.phoneNo}</p>
                                </div>
                            </div>

                            {/* Status Overview */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <BadgeInfo className="h-6 w-6 text-primary" />
                                    <h3 className="text-lg font-semibold">Current Status</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Driver Assignment:</span>
                                        <Badge variant="outline">
                                            {selectedBooking.status.driver}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Vendor Assignment:</span>
                                        <Badge variant="outline">
                                            {selectedBooking.status.vendor}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Trip Status:</span>
                                        <Badge variant="outline">
                                            {selectedBooking.status.trip}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedBooking(null)}
                            >
                                Close
                            </Button>
                            {selectedBooking.status === "completed" &&
                                <Button onClick={generateReceipt}>
                                    View Receipt
                                </Button>
                            }
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    )
}

export default BookingHistory