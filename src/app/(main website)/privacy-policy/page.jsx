import Footer from '@/components/main/Footer'
import Navbar from '@/components/main/navbar/Navbar'
import React from 'react'

function PrivacyPolicy() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 max-w-4xl mx-auto px-4 py-10">
                <div className='bg-primary text-white mb-6 px-4 sm:px-8 py-5 sm:py-10 rounded-xl flex items-center justify-center'>
                    <h1 className="text-3xl font-bold">Privacy Policy</h1>
                </div>

                <p className="mb-6">
                    At <strong>Taps Cabs</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our cab booking services, website, or mobile applications.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
                <ul className="list-disc list-inside mb-6">
                    <li><strong>Personal Information:</strong> Name, phone number, email address, pickup and drop-off locations.</li>
                    <li><strong>Payment Details:</strong> We collect billing and payment information when you make a booking.</li>
                    <li><strong>Usage Data:</strong> We collect data about how you use our services to improve your experience.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside mb-6">
                    <li>To confirm bookings and provide transport services.</li>
                    <li>To communicate updates or issues regarding your ride.</li>
                    <li>To improve our app/website and customer service.</li>
                    <li>To process payments securely.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-3">3. Sharing of Information</h2>
                <p className="mb-4">
                    We do not sell your personal data. However, we may share your information with:
                </p>
                <ul className="list-disc list-inside mb-6">
                    <li>Drivers to fulfill your ride request.</li>
                    <li>Payment gateways for transaction processing.</li>
                    <li>Law enforcement if required by law.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-3">4. Data Security</h2>
                <p className="mb-6">
                    We use industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">5. Your Choices</h2>
                <p className="mb-6">
                    You may opt out of receiving marketing messages or delete your account at any time by contacting us at <strong>support@tapscabs.com</strong>.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">6. Changes to This Policy</h2>
                <p className="mb-6">
                    We may update this Privacy Policy from time to time. All changes will be posted on this page with a new effective date.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">7. Contact Us</h2>
                <p className="mb-6">
                    If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy
