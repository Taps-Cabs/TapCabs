"use client";

import InnerLayout from "@/components/dashboard/layout/InnerLayout";
import { Loader, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { getAllPickupCities } from "@/lib/firebase/admin/pickupCity";
import { useEffect, useState } from "react";
import { createVendor } from "@/lib/firebase/admin/vendor";
import { useRouter } from "next/navigation";
import VehicleDetails from "./components/VehicleDetails";
import useAuthStore from "@/store/useAuthStore";
import { createNewDriver } from "@/lib/firebase/vendor/driver";
// import { useSearchParams } from "next/navigation";

export default function Page() {
    // const searchParams = useSearchParams();
    // const updateProductId = searchParams.get('id');

    const router = useRouter();
    const { userData } = useAuthStore();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleCreateDriver = async (data) => {
        setLoading(true);

        data = {
            ...data,
            vendor: userData?.id
        }
        // console.log(data);

        const result = await createNewDriver({ data });
        if (result)
            router.push('/vendor/drivers');

        setLoading(false);
    };


    return (
        <InnerLayout heading={'Add new Driver'}>
            {
                // isLoading
                false
                    ? <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex items-center justify-center">
                        <Loader />
                    </section>
                    : <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-fit min-h-full">
                        <form
                            onSubmit={handleSubmit(handleCreateDriver)}
                            className="h-full flex flex-col gap-5 p-5">

                            {/* Personal Details */}
                            <div className='flex gap-4 flex-col sm:flex-row'>

                                {/* Name */}
                                <div className="grow">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        {...register("name", {
                                            required: true,
                                        })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                                        required
                                    />
                                </div>

                                {/* Email  */}
                                <div className='grow'>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Delhi, Noida"
                                        {...register("email", {
                                            required: true,
                                        })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className='flex gap-4 flex-col sm:flex-row'>
                                {/* Phone No  */}
                                <div className='grow'>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone No <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="1234567890"
                                        {...register("phoneNo", {
                                            required: true,
                                        })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                                        required
                                    />
                                </div>

                                {/* Password  */}
                                <div className='grow'>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pssword <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>


                            {/* Vehicle Details */}
                            <VehicleDetails register={register} />

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 cursor-pointer transition-colors font-medium disabled:opacity-50"
                            >
                                {false ? (
                                    <Loader className="" color='white' size={10} height={6} />
                                ) : false ? (
                                    "Update Driver"
                                ) : (
                                    "Create Driver"
                                )}
                            </button>
                        </form>
                    </section>
            }
        </InnerLayout>
    );
}