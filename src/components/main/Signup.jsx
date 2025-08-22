// components/auth/Signup.js
"use client";
import useAuthStore from "@/store/useAuthStore";
import React, { useState } from "react";

export default function Signup({ onSuccess, onClose }) {
    const { handleSignup, isLoading, error } = useAuthStore();
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSignup(name, email, phoneNo, password, "user");
            onSuccess?.();
            onClose?.();
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-3xl font-bold text-[#007BFF] mb-1">Join Us Now</h2>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
                Create an Account
            </h1>

            {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                    className="w-full border rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full border rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#007BFF] hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
                >
                    {isLoading ? "Creating Account…" : "Get Started"}
                </button>
            </form>
        </div>
    );
}
