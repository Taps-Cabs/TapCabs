import isTimestampLike, { formatFirestoreDate } from "@/lib/firebase/services/formatDate";
import { Loader2, ReceiptIndianRupee, FileDown } from "lucide-react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { MAIN_WEBSITE } from "@/lib/assets/assets";
import { TRIP_TYPES } from "@/lib/constants/constants";
import { toWords } from "number-to-words";

export default function BookingList({ bookings, loading }) {
    const router = useRouter();

    const parseFirestoreTimestamp = ({ seconds, nanoseconds }) => {
        return new Date(seconds * 1000 + nanoseconds / 1000000);
    };

    const formatDate = (dateString) => {
        // console.log(dateString, dateString instanceof Timestamp)
        if (isTimestampLike(dateString)) {
            return formatFirestoreDate(dateString);
        }

        const options = { day: 'numeric', month: 'long', year: 'numeric' }
        return new Date(dateString).toLocaleDateString('en-IN', options)
    }

    const formatFirestoreCreatedDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = parseFirestoreTimestamp(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const StatusBadge = ({ label, value, colorClass }) => (
        <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">{label}:</span>
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${colorClass}`}>
                {value}
            </span>
        </div>
    );

    const generateInvoice = (selectedBooking) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        let yPosition = 15;

        // Company Header
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.setFont('helvetica', 'bold');
        doc.text("TAX INVOICE", pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;

        // Add logo
        try {
            doc.addImage(MAIN_WEBSITE.logo, 'PNG', 15, 15, 30, 15);
        } catch (e) {
            // if image fails, continue silently
        }
        yPosition = 30;

        // Company Details
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text("C 23 Malviya Nagar | Moradabad Uttar Pradesh 244001", 15, yPosition + 5);
        doc.text("GSTIN 09BEWPG1107F12K | 7248772488 | INFO@TAPSCABS.COM", 15, yPosition + 15);
        doc.text("Email: apoorvg30@gmail.com | www.tapscabs.com", 15, yPosition + 20);
        yPosition += 30;

        // Invoice Details
        const invoiceDate = formatDate(selectedBooking?.createdAt) ||
            (selectedBooking?.createdAt ? formatFirestoreDate(selectedBooking?.createdAt) : 'N/A');

        const createdAt = selectedBooking?.createdAt;
        const mobile = selectedBooking?.userData?.phoneNumber ||
            selectedBooking?.userData?.phoneNo || "NA";

        let invoiceId = "INV-UNKNOWN";
        if (createdAt && createdAt.seconds != null) {
            const date = new Date(createdAt.seconds * 1000 + (createdAt.nanoseconds || 0) / 1e6);
            const pad = (n) => n.toString().padStart(2, "0");
            invoiceId = `INV-${mobile}-${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        }

        doc.text(`Invoice No: TC/${invoiceId}`, 15, yPosition);
        doc.text(`Invoice Date: ${invoiceDate}`, pageWidth - 15, yPosition, { align: 'right' });
        yPosition += 10;

        // Customer Details
        doc.setFont('helvetica', 'bold');
        doc.text(`${selectedBooking?.userData?.name || 'N/A'}`, 15, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(`${selectedBooking?.userData?.email || ''}`, 15, yPosition + 5);
        doc.text(`${selectedBooking?.userData?.phoneNo || ''}`, 15, yPosition + 10);
        doc.text(`Pickup City: ${selectedBooking?.pickupCity || ''}`, pageWidth - 15, yPosition, { align: 'right' });
        yPosition += 20;

        // Drop info
        let dropText = "";
        if (selectedBooking?.tripType === TRIP_TYPES.roundTrip && selectedBooking?.dropOffs?.length) {
            dropText = `Drops: ${selectedBooking.dropOffs.join(', ')}`;
        } else if (selectedBooking?.dropCity && selectedBooking.dropCity !== "-") {
            dropText = `Drop: ${selectedBooking.dropCity}`;
        } else if (selectedBooking?.dropOffs?.length) {
            dropText = `Drop: ${selectedBooking.dropOffs[0]}`;
        }
        doc.text(dropText, 15, yPosition);
        yPosition += 10;

        // --- Line items: base price, driver allowance, extra charges ---
        const toNum = (v) => {
            if (v === undefined || v === null || v === '') return 0;
            const n = Number(v);
            return Number.isFinite(n) ? n : 0;
        };

        const basePrice = toNum(selectedBooking?.basePrice ?? selectedBooking?.price);
        const driverAllowance = toNum(selectedBooking?.driverAllowance ?? selectedBooking?.cab?.driverAllowance);
        const extraCharge = toNum(selectedBooking?.extraCharge);

        const items = [];
        let index = 1;

        const TAX_RATE = 0.05; // 5%

        const pushLine = (desc, rate) => {
            if (rate <= 0) return;
            const qty = 1.0;
            const gst = +(rate * TAX_RATE);
            const amount = +(rate + gst);
            items.push([
                index++,
                desc,
                qty.toFixed(2),
                rate.toFixed(2),
                gst.toFixed(2),
                amount.toFixed(2)
            ]);
            return { rate, gst, amount };
        };

        const partsSummary = []; // store each line's numeric values for totals
        if (basePrice > 0) {
            const res = pushLine(`${selectedBooking?.pickupCity || ''} ${String(selectedBooking?.tripType || '')}\nCar: ${selectedBooking?.cab?.name || ''}`, basePrice);
            if (res) partsSummary.push(res);
        }

        if (driverAllowance > 0) {
            const res = pushLine('Driver Allowance', driverAllowance);
            if (res) partsSummary.push(res);
        }

        if (extraCharge > 0) {
            const res = pushLine('Extra Charges', extraCharge);
            if (res) partsSummary.push(res);
        }

        // If no items were pushed, add a fallback line (to avoid empty table)
        if (items.length === 0) {
            const res = pushLine('Service Charges', toNum(selectedBooking?.totalAmount) || 0);
            if (res) partsSummary.push(res);
        }

        // Draw the items table
        autoTable(doc, {
            startY: yPosition + 1,
            head: [['#', 'Description', 'Qty', 'Rate', 'IGST (5%)', 'Amount']],
            body: items,
            theme: 'grid',
            styles: { fontSize: 10 },
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255]
            },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 50 },
                2: { cellWidth: 20, halign: 'right' },
                3: { cellWidth: 30, halign: 'right' },
                4: { cellWidth: 30, halign: 'right' },
                5: { cellWidth: 30, halign: 'right' },
            }
        });

        // Totals calculation
        const subtotal = partsSummary.reduce((s, p) => s + (p.rate || 0), 0);
        const igstSum = partsSummary.reduce((s, p) => s + (p.gst || 0), 0);
        const totalSum = subtotal + igstSum;

        // Summary table
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            body: [
                ["Sub Total", subtotal.toFixed(2)],
                ["IGST (5%)", igstSum.toFixed(2)],
                ["Total", totalSum.toFixed(2)],
            ],
            theme: 'plain',
            styles: { fontSize: 12, fontStyle: 'bold' },
            columnStyles: {
                0: { halign: 'right', cellWidth: 120 },
                1: { cellWidth: 50, halign: 'right' }
            }
        });

        // Convert total to words with paise
        const rupeeToWords = (value) => {
            const fixed = Number(value || 0).toFixed(2);
            const [intPart, decPart] = fixed.split('.');
            const intNum = Number(intPart);
            const paiseNum = Number(decPart);
            const rupeesWords = toWords(intNum);
            if (paiseNum > 0) {
                return `Indian Rupee ${rupeesWords} and ${paiseNum}/100 Only`;
            } else {
                return `Indian Rupee ${rupeesWords} Only`;
            }
        };

        doc.setFont('helvetica', 'bold');
        doc.text(`Total in Words: ${rupeeToWords(totalSum)}`, 15, doc.lastAutoTable.finalY + 15);

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


    if (loading)
        return (
            <div className='w-full min-h-[30vh] flex justify-center items-center'>
                <div className="w-fit flex flex-col justify-center items-center gap-2">
                    <Loader2 size={30} className="animate-spin text-primary" />
                    <p className="flex gap-2 items-center">
                        <ReceiptIndianRupee className="h-6 w-6 text-primary" />
                        Fetching bookings
                    </p>
                </div>
            </div>
        );

    if (bookings?.length <= 0)
        return (
            <div className='w-full min-h-[30vh] flex justify-center items-center'>
                <p className="text-muted-foreground">No bookings yet</p>
            </div>
        );

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl">
                <div className="space-y-3 w-full">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="w-full group rounded-lg bg-white p-4 transition-all duration-200 hover:shadow-lg "
                        >
                            <div
                                onClick={() => router.push(`/admin/bookings/bookingDetails?id=${booking.id}`)}
                                className="cursor-pointer grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                            >
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        {booking.userData.name}
                                        <span className="inline-block rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                                            {booking.tripType}
                                        </span>
                                    </h3>
                                    <p className="text-sm text-blue-700 font-bold">
                                        Scheduled On {formatDate(booking?.pickupDate)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Booked on {formatFirestoreCreatedDate(booking?.createdAt)}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-500">From:</span>
                                        <span className="text-sm text-gray-900">{booking.pickupCity}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-500">Vendor:</span>
                                        <span className={`text-sm ${(booking?.status?.vendor && booking?.status?.vendor !== "not assigned") ? 'text-green-600' : 'text-red-600'}`}>
                                            {(booking?.status?.vendor && booking?.status?.vendor !== "not assigned") ? "Assigned" : "Not Assigned"}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <StatusBadge
                                        label="Booking"
                                        value={booking?.status?.booking || 'Processing'}
                                        colorClass={
                                            booking?.status?.booking === 'Accepted' ? 'bg-green-100 text-green-800' :
                                                booking?.status?.booking === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                        }
                                    />
                                    <StatusBadge
                                        label="Trip"
                                        value={booking?.status?.trip || 'Not Started'}
                                        colorClass={
                                            booking?.status?.trip === 'Completed' ? 'bg-purple-100 text-purple-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <StatusBadge
                                        label="Payment"
                                        value={booking?.status?.isFullPaymemt ? 'Paid' : 'Pending'}
                                        colorClass={booking?.status?.isFullPaymemt ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                                    />
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-500">Total:</span>
                                        <span className="text-lg font-bold text-gray-900">
                                            ₹{booking.totalAmount}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Button */}
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => generateInvoice(booking)}
                                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                                >
                                    <FileDown className="h-4 w-4" />
                                    Download Invoice
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
