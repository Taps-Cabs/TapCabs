"use client";

import InnerLayout from "@/components/dashboard/layout/InnerLayout";
import { Loader, Loader2 } from "lucide-react";
import ProductName from "./components/ProductName";
import { useForm } from "react-hook-form";
import { getAllPickupCities } from "@/lib/firebase/admin/pickupCity";
import { useEffect, useState } from "react";
import { createVendor, deleteVendor, getVendorDetails, updateVendor } from "@/lib/firebase/admin/vendor";
import { useRouter, useSearchParams } from "next/navigation";
// import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const updateVendorId = searchParams.get('id');

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [pickupCities, setPickupCities] = useState([]);
    const [vendorDetails, setVendorDetails] = useState(null);

    const {
        register,
        reset,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleCreateVendor = async (data) => {
        setLoading(true);
        const result = await (updateVendorId ? updateVendor({ ...data, id: updateVendorId }) : createVendor(data));
        if (result)
            router.push('/admin/vendors');

        setLoading(false);
    };

    const handleDeleteVendor = async () => {
        setLoading(true);
        const result = await deleteVendor({ id: updateVendorId });
        if (result)
            router.push('/admin/vendors');

        setLoading(false);
    }

    const fetchVendorDetails = async () => {
        setLoading(true);

        const result = await getVendorDetails(updateVendorId);
        if (result)
            setVendorDetails(result);

        setLoading(false);
    };

    useEffect(() => {
        const fetchPickupCities = async () => {
            setLoading(true);
            try {
                const res = await getAllPickupCities();
                setPickupCities(res || []);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchPickupCities();

        if (updateVendorId) {
            fetchVendorDetails();
        }

    }, []);

    useEffect(() => {
        if (vendorDetails) {
            setValue('name', vendorDetails?.name);
            setValue('email', vendorDetails?.email);
            setValue('phoneNo', vendorDetails?.phoneNo);
            setValue('city', vendorDetails?.city);
            setValue('location', vendorDetails?.location);
        }
    }, [vendorDetails])

    if (!pickupCities)
        return <Loader2 className="w-10 h-10 text-gray-500 animate-spin" />

    return (
        <InnerLayout heading={`${updateVendorId ? "Update" : "Add"} new Vendor`}>
            {
                false
                    ? <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex items-center justify-center">
                        <Loader />
                    </section>
                    : <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-fit min-h-full">
                        <form
                            onSubmit={handleSubmit(handleCreateVendor)}
                            className="h-full flex flex-col gap-5 p-5">
                            {
                                pickupCities?.length > 0 &&
                                <ProductName register={register} editVendor={updateVendorId} pickupCities={pickupCities} />
                            }
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 cursor-pointer transition-colors font-medium disabled:opacity-50"
                            >
                                {
                                    loading ? (
                                        <Loader className="" color='white' size={10} height={6} />
                                    ) :
                                        updateVendorId ? (
                                            "Update Vendor"
                                        ) : (
                                            "Create Vendor"
                                        )}
                            </button>
                            {
                                updateVendorId &&
                                <button
                                    type="button"
                                    onClick={() => handleDeleteVendor()}
                                    disabled={loading}
                                    className="flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-2.5 rounded-lg hover:bg-red-600 cursor-pointer transition-colors font-medium disabled:opacity-50"
                                >
                                    {
                                        loading ? (
                                            <Loader className="" color='white' size={10} height={6} />
                                        ) : "Delete Vendor"
                                    }
                                </button>
                            }
                        </form>
                    </section>
            }
        </InnerLayout>
    );
}