import Footer from '@/components/main/Footer'
import Navbar from '@/components/main/navbar/Navbar'
import React from 'react'

function RefundPolicy() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 max-w-4xl mx-auto px-4 py-10">
                <div className='bg-primary text-white mb-6 px-4 sm:px-8 py-5 sm:py-10 rounded-xl flex items-center justify-center'>
                    <h1 className="text-3xl font-bold">Refund Policy</h1>
                </div>

                <p className="mb-6">
                    At <strong>Taps Cabs</strong>, we strive to offer reliable and satisfactory cab services. We understand that sometimes plans change, and you may need to cancel your booking. This Refund Policy outlines the conditions under which refunds may be provided.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">1. Booking Cancellations</h2>
                <ul className="list-disc list-inside mb-6">
                    <li><strong>Customer-Initiated Cancellations: </strong>
                        Full refund will be provided if the ride is cancelled at least 30 minutes before the scheduled pickup time.
                    </li>
                    <li>
                        Cancellations made less than 30 minutes before pickup time may be subject to a cancellation fee.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-3">2. Driver No-Show</h2>
                <p className="mb-6">
                    If your driver fails to arrive at the pickup location without prior notice or reason, a full refund will be issued.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">3. Delays or Service Failures</h2>
                <p className="mb-6">
                    If the service is not provided due to technical issues, severe delays, or other operational failures on our end, we may issue a full or partial refund depending on the situation.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">4. Non-Refundable Situations</h2>
                <ul className="list-disc list-inside mb-6">
                    <li>Refunds are not applicable for completed rides.</li>
                    <li>No refund will be issued for cancellations after the driver has arrived at the pickup location.</li>
                    <li>No-shows by the customer may result in full charge with no refund.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-3">5. How to Request a Refund</h2>
                <p className="mb-6">
                    To request a refund, please email us at <strong>help@tapscabs.com</strong> with your booking ID, contact details, and reason for the request. Refunds are typically processed within 7–10 business days.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">6. Contact Us</h2>
                <p className="mb-6">
                    For any questions related to our refund policy, feel free to contact us:
                    <br />
                    <strong>Email:</strong> help@tapscabs.com
                    <br />
                    <strong>Phone:</strong> 7248772488
                </p>
            </main>
            <Footer />
        </div>
    )
}

export default RefundPolicy
