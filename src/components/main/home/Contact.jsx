'use client';
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPhoneAlt, FaFax, FaEnvelope } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                toast.success(
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Message sent successfully!</span>
                    </div>
                )
                reset()
            } else {
                toast.error('Failed to send message. Please try again.')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="pb-16 pt-12 w-11/12">
            <div className="w-full lg:w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Content Container */}
                <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    {/* Form Section */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="text-center mb-7">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
                                >
                                    Get in <span className="text-[#2f1889]">Touch</span>
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="text-gray-600 text-lg"
                                >
                                    We're here to help you with your transportation needs
                                </motion.p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <Input
                                        placeholder="Full Name *"
                                        {...register('name', { required: 'Name is required' })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2f1889] focus:border-transparent"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <Input
                                        type="email"
                                        placeholder="Email Address *"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2f1889] focus:border-transparent"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <Input
                                        placeholder="Phone Number *"
                                        {...register('phoneNo', {
                                            required: 'Contact Number is required',
                                            pattern: {
                                                value: /^\+?[1-9]\d{1,14}$/,
                                                message: 'Invalid phone number format'
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2f1889] focus:border-transparent"
                                    />
                                    {errors.phoneNo && <p className="text-red-500 text-sm mt-1">{errors.phoneNo.message}</p>}
                                </div>

                                <div>
                                    <Textarea
                                        rows={4}
                                        placeholder="Your Message *"
                                        {...register('message', { required: 'Message is required' })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                                </div>
                            </div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#2f1889] text-white py-4 rounded-lg font-semibold transition-all"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </motion.div>
                        </form>

                        {/* Contact Info */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="p-2 bg-blue-100 rounded-full">
                                    <FaPhoneAlt className="text-[#2f1889]" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="font-medium text-gray-900">+917248772488</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="p-2 bg-blue-100 rounded-full">
                                    <FaEnvelope className="text-[#2f1889]" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium text-gray-900">help@tapscabs.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Map Section */}
                    <motion.div
                        className="w-full lg:w-1/2 h-[500px] rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <iframe
                            title="Office Location"
                            className="w-full h-full"
                            loading="lazy"
                            allowFullScreen
                            src="https://www.google.com/maps?q=Ghaziabad,+Uttar+Pradesh&output=embed"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
