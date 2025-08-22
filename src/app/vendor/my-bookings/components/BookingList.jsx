
import { useRouter } from "next/navigation";

export default function BookingList({ bookings }) {

    const router = useRouter()
    function abc(id) {
        router.push(`/vendor/my-bookings/bookingDetails?id=${id}`)
    }

    return (
        <div className="">
            <div className="space-y-4">
                {bookings?.map((booking) => (
                    <div
                        key={booking.id}
                        onClick={() => {
                            abc(booking?.id)
                        }}
                        className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{booking.userData.name}</h3>
                                <p className="text-sm text-gray-600">{booking.pickupCity} to {booking.dropCity}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">₹{booking.totalAmount}</p>
                                <p className="text-sm text-gray-600">{booking.tripType}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}