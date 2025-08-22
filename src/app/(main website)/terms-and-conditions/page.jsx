import Footer from '@/components/main/Footer'
import Navbar from '@/components/main/navbar/Navbar'
import React from 'react'

function TermsAndConditions() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 max-w-4xl mx-auto px-4 py-10">
                <div className='bg-primary text-white mb-6 px-4 sm:px-8 py-5 sm:py-10 rounded-xl flex items-center justify-center'>
                    <h1 className="text-3xl font-bold">Terms and Conditions</h1>
                </div>

                <p className="mb-6">
                    These Terms and Conditions govern your use of the services provided by <strong>Taps Cabs</strong> through our website, mobile app, or any other platform. By using our services, you agree to be bound by these terms.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">1. Service Usage</h2>
                <p className="mb-6">
                    Taps Cabs provides cab booking services for personal and business use. You must be at least 18 years old or have the consent of a legal guardian to use our services.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">2. Booking and Cancellation</h2>
                <ul className="list-disc list-inside mb-6">
                    <li>All bookings must be made through our official platforms.</li>
                    <li>Bookings can be canceled as per our <a href="/refund-policy" className="text-blue-600 underline">Refund Policy</a>.</li>
                    <li>We reserve the right to cancel or modify bookings in case of emergencies or unforeseen circumstances.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-3">3. User Responsibilities</h2>
                <ul className="list-disc list-inside mb-6">
                    <li>Provide accurate pickup and drop-off details.</li>
                    <li>Behave respectfully with drivers and staff.</li>
                    <li>Do not use our services for illegal or prohibited activities.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-3">4. Payments</h2>
                <p className="mb-6">
                    All payments must be made in accordance with the pricing provided at the time of booking. Prices may vary based on distance, location, time, and availability.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">5. Liability</h2>
                <p className="mb-6">
                    Taps Cabs is not liable for delays, missed rides, or losses due to circumstances beyond our control (e.g., traffic, weather, roadblocks). We do not guarantee availability at all times.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">6. Intellectual Property</h2>
                <p className="mb-6">
                    All content on our website and mobile app, including logos, text, and graphics, are the property of Taps Cabs and may not be used without permission.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">7. Changes to Terms</h2>
                <p className="mb-6">
                    We reserve the right to update or change these terms at any time. Updated terms will be posted on our website with the new effective date.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">8. Governing Law</h2>
                <p className="mb-6">
                    These Terms and Conditions are governed by and construed in accordance with the laws of India.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">9. Contact Us</h2>
                <p className="mb-6">
                    If you have any questions about these Terms and Conditions, please contact us:
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

export default TermsAndConditions
