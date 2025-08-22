// components/auth/Login.js
"use client";
import React, { useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function Login({ onSuccess, onClose }) {
    const { handleSignInWithEmail, isLoading, error } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword((v) => !v);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSignInWithEmail(email, password);
            // toast.success("Login Successful");
            onSuccess?.();
            onClose?.();
        } catch (err) {
            // toast.error("Login Failed");
            console.error(err);
        }
    };

    return (
        <div className="w-full mx-auto">
            <h2 className="text-3xl font-bold text-[#007BFF] mb-1">Welcome Back</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                Log In to Your Account
            </h1>

            {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

            <form onSubmit={onSubmit} className="space-y-5">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Password input with eye toggle */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
                    />
                    <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#007BFF] hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
                >
                    {isLoading ? "Logging in..." : "LOG IN"}
                </button>
            </form>
        </div>
    );
}
