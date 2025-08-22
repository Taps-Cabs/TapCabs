'use client'

import React, { useState } from 'react'
import { signup } from '@/lib/firebase/services/auth'
import { useRouter } from 'next/navigation'

function SignupPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        const response = await signup(name, email, 8700381153, password, "User")
        if (response) {
            router.push('/')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row font-sans">
            {/* Left Side Form */}
            <div className="md:w-1/2 bg-white flex flex-col justify-center px-10 py-20">
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-3xl font-bold text-[#007BFF] mb-1">Join Us Now</h2>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Create an Account</h1>

                    <form onSubmit={handleSignup} className="space-y-5">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="8"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#007BFF] hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"
                        >
                            {loading ? "Loading..." : "GET STARTED"}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        Already have an account? <a href="/login" className="text-[#007BFF] font-medium hover:underline">LOGIN HERE</a>
                    </p>
                </div>
            </div>

            {/* Right Side Image */}
            <div
                className="md:w-1/2 hidden md:block bg-cover bg-center"
                style={{
                    backgroundImage: "url('/signup.jpg')", // replace with your path or use next/image if you want optimization
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            ></div>
        </div>
    )
}

export default SignupPage
