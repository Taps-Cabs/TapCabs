import React, { Suspense } from 'react'
import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import LocalTripForm from './components/LocalTripForm';

export const dynamic = "force-dynamic";

const SkeletonLoader = () => {
    return (
        <div className="w-full max-w-2xl animate-pulse space-y-6">
            {/* Form Heading Skeleton */}
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>

            {/* Input Field Skeletons */}
            <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>

                <div className="h-4 bg-gray-200 rounded w-1/4 mt-6"></div>
                <div className="h-10 bg-gray-200 rounded"></div>

                <div className="h-4 bg-gray-200 rounded w-1/4 mt-6"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            {/* Variants Section Skeleton */}
            <div className="mt-8">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-8 bg-gray-200 rounded"></div>
                            <div className="h-8 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit Button Skeleton */}
            <div className="h-10 bg-gray-200 rounded w-1/4 mt-8"></div>
        </div>
    )
}

export default function page() {
    return (
        <div>
            <InnerLayout heading={"Add New Package"}>
                <div className='flex justify-center w-full pb-6'>
                    <Suspense fallback={<SkeletonLoader />}>
                        <LocalTripForm />
                    </Suspense>
                </div>
            </InnerLayout>
        </div>
    )
}