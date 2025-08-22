'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { addLocalUser } from '@/lib/firebase/auth/userLogin'
import useAuthStore from '@/store/useAuthStore'
import axios from 'axios'

// ShadCN OTP input
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from '@/components/ui/input-otp'
import toast from 'react-hot-toast'

function UserLogin({ open, onOpenChange }) {
    const [loading, setLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [sessionId, setSessionId] = useState('')
    const { setUserData } = useAuthStore()

    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm()

    // 1️⃣ Send OTP via 2Factor
    async function handleSendOtp() {
        const phone = getValues('phone')
        // console.log(phone)

        if (!/^\d{10}$/.test(phone)) {
            setErrorMessage('Enter a valid 10-digit phone number')
            return
        }

        setLoading(true)
        setErrorMessage('')
        setSuccessMessage('')
        try {
            const response = await axios.post('/api/send-otp', { phone })
            setSessionId(response.data.sessionId)
            setOtpSent(true)
            setSuccessMessage('You will receive a call for OTP. Please enter the OTP and verify.')
        } catch (err) {
            console.error(err)
            setErrorMessage('Failed to send OTP. Please try again.')
        }
        setLoading(false)
    }

    // 2️⃣ Verify OTP and then login
    async function verifyOtpAndLogin(data) {
        setLoading(true)
        setErrorMessage('')
        setSuccessMessage('')
        try {
            const verifyRes = await axios.post('/api/verify-otp', {
                sessionId,
                otp,
            })

            if (verifyRes.data.success) {
                const res = await addLocalUser(data)
                setOtp('')

                if (res.success && res.userDetails) {
                    toast.success("Login Successful")
                    setUserData(res.userDetails)
                    setOtpSent(false);
                    onOpenChange(false);
                } else {
                    toast.error("Login failed. Please try again.");
                    setErrorMessage('Login failed. Please try again.')
                }
            } else {
                toast.error("Incorrect OTP. Please try again.");
                setErrorMessage('Incorrect OTP. Please try again.')
            }
        } catch (err) {
            console.error(err)
            toast.error("Verification failed. Please try again.");
            setErrorMessage('Verification failed. Please try again.')
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Login</DialogTitle>

                <form
                    onSubmit={handleSubmit(otpSent ? verifyOtpAndLogin : handleSendOtp)}
                    className="space-y-4"
                >
                    <div>
                        <input
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Enter a valid 10-digit phone number',
                                },
                            })}
                            type="tel"
                            className="w-full border border-gray-300 rounded p-2"
                            placeholder="Enter your Phone Number"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {otpSent && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Enter OTP
                            </label>
                            <InputOTP
                                maxLength={6}
                                value={otp}
                                onChange={(value) => setOtp(value)}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    )}

                    {/* ✅ Feedback Messages */}
                    {successMessage && (
                        <p className="text-green-600 text-sm">{successMessage}</p>
                    )}
                    {errorMessage && (
                        <p className="text-red-600 text-sm">{errorMessage}</p>
                    )}

                    <div className='flex gap-2 items-center'>
                        {
                            otpSent &&
                            <Button type="button" onClick={() => handleSendOtp()} disabled={loading}>
                                {
                                    loading
                                        ? 'Processing...'
                                        : 'Resend OTP'
                                }
                            </Button>
                        }

                        <Button type="submit" disabled={loading}>
                            {loading
                                ? 'Processing...'
                                : otpSent
                                    ? 'Verify & Login'
                                    : 'Send OTP'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UserLogin
