"use client"
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

function BookingSkeleton() {
    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                    {/* Location Card Skeleton */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                        </div>
                    </div>

                    {/* User Info Skeleton */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, idx) => (
                                <div key={idx} className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing Skeleton */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, idx) => (
                                <div key={idx} className="flex justify-between">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-5 w-20" />
                                </div>
                            ))}
                            <div className="pt-4 mt-4 border-t border-gray-200">
                                <div className="flex justify-between">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-6 w-24" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Summary Skeleton */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((_, idx) => (
                                <div key={idx}>
                                    <Skeleton className="h-4 w-20 mb-1" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cab Info Skeleton */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((_, idx) => (
                                <div key={idx}>
                                    <Skeleton className="h-4 w-20 mb-1" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Status Skeleton */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((_, idx) => (
                                <div key={idx}>
                                    <Skeleton className="h-4 w-20 mb-1" />
                                    <Skeleton className="h-8 w-24 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BookingSkeleton
