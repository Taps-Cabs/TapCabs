import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
    CalendarCheck,
    ClipboardList,
    UserRound,
    Coins,
    BadgeCheck,
    CreditCard,
    MapPin,
    Car,
    Clock,
    Wallet,
} from "lucide-react";

export const BookingDialog = ({ booking, open, onOpenChange }) => {
    if (!booking) return null;

    const statusColor = {
        accepted: "bg-green-100 text-green-800",
        notassigned: "bg-yellow-100 text-yellow-800",
        cancelled: "bg-red-100 text-red-800",
        completed: "bg-blue-100 text-blue-800",
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CalendarCheck className="w-5 h-5" />
                        Booking Details
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-4">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {/* Booking Summary Card */}
                        <div className="bg-muted/40 p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-3">
                                <ClipboardList className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-lg">Booking Summary</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-muted-foreground text-xs">Booking ID</p>
                                    <p className="font-medium">#{booking.id}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Trip Type</p>
                                    <Badge variant="outline" className="border-primary">
                                        {booking.tripType}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Distance</p>
                                    <p className="font-medium">{booking.totalDistance} km</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Created</p>
                                    <p className="font-medium">
                                        {/* {format(new Date(booking.createdAt), "dd MMM, yyyy")} */}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* User Information Card */}
                        <div className="bg-muted/40 p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-3">
                                <UserRound className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-lg">User Information</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <p className="text-muted-foreground text-xs">Name</p>
                                    <p className="font-medium">{booking.userData?.name}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Contact</p>
                                    <p className="font-medium">{booking.userData?.phoneNo}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Email</p>
                                    <p className="font-medium break-all">{booking.userData?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="bg-muted/40 p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-lg">Location Details</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                {/* Pickup City remains the same */}
                                <div>
                                    <p className="text-muted-foreground text-xs">Pickup City</p>
                                    <p className="font-medium">{booking.pickupCity}</p>
                                </div>

                                {/* Updated Drop City/Drop-offs section */}
                                {booking.tripType === "Round Trip" && booking.dropOffs?.length ? (
                                    <div>
                                        <p className="text-muted-foreground text-xs">Drop-off Points</p>
                                        <div className="space-y-1">
                                            {booking.dropOffs.map((dropOff, index) => (
                                                <div key={index} className="font-medium flex items-center gap-1">
                                                    <span className="text-muted-foreground text-xs">{index + 1}.</span>
                                                    {dropOff}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : booking.dropCity ? (
                                    <div>
                                        <p className="text-muted-foreground text-xs">Drop City</p>
                                        <p className="font-medium">{booking.dropCity}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-muted-foreground text-xs">Drop Point</p>
                                        <p className="font-medium text-muted-foreground">N/A</p>
                                    </div>
                                )}

                                {/* Distance remains the same */}
                                <div>
                                    <p className="text-muted-foreground text-xs">Distance</p>
                                    <p className="font-medium">{booking.totalDistance} km</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        {/* Pricing Card */}
                        <div className="bg-muted/40 p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-3">
                                <Coins className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-lg">Pricing Details</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Base Price</span>
                                    <span className="font-medium">₹{booking.basePrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">GST</span>
                                    <span className="font-medium">₹{booking.gstAmount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total Amount</span>
                                    <span className="font-medium text-primary">₹{booking.totalAmount}</span>
                                </div>
                                <div className="pt-2 mt-2 border-t">
                                    <div className="flex justify-between font-semibold">
                                        <span>Paid Amount</span>
                                        <span>₹{booking.payment?.isFullPayment ? booking?.payment?.amount : booking.bookingAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cab Details Card */}
                        <div className="bg-muted/40 p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-3">
                                <Car className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-lg">Cab Information</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-muted-foreground text-xs">Cab Name</p>
                                    <p className="font-medium">{booking.cab?.name}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Min Kilometers</p>
                                    <p className="font-medium">{booking.cab?.minKilometers} km</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Driver Allowance</p>
                                    <p className="font-medium">₹{booking.cab?.driverAllowance}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Price</p>
                                    <p className="font-medium">
                                        ₹{booking.tripType === "One Way"
                                            ? booking.cab?.actualPriceOneWay
                                            : booking.cab?.actualPriceRoundTrip}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Status & Payment Card */}
                        <div className="bg-muted/40 p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-3">
                                <BadgeCheck className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-lg">Status Overview</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                {Object.entries(booking.status || {}).map(([key, value]) => (
                                    <div key={key}>
                                        <p className="text-muted-foreground text-xs capitalize">{key}</p>
                                        <Badge className={`capitalize ${statusColor[value] || "bg-gray-600"} text-xs`}>
                                            {value}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Card */}
                        <div className="bg-muted/40 p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-3">
                                <CreditCard className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-lg">Payment Information</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Payment ID</span>
                                    <span className="font-medium">{booking.payment?.paymentId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Status</span>
                                    <Badge className={statusColor[booking.payment?.status]}>
                                        {booking.payment?.status}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Payment Type</span>
                                    <Badge variant="outline">
                                        {booking.payment?.isFullPayment ? "Full" : "Partial"}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Update Button */}
                </div>
            </DialogContent>
        </Dialog>
    );
};