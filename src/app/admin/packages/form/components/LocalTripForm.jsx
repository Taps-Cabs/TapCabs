"use client";

import React, { useEffect, useState } from 'react';
import { CircleCheckBig, Loader2, LucideDelete, PlusCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import TripVariant from './TripVariant';
import { useLocalTripFromForm } from '../context/localTripContext';
import { useForm } from 'react-hook-form';
import Pickup from '@/components/main/home/bookingForm/Pickup';
import { TRIP_TYPES } from '@/lib/constants/constants';
import PickupCityName from './PickupCityName';
import LocationSearch from '@/components/main/home/bookingForm/DropSuggestionForm';
import toast from 'react-hot-toast';
import Terms from './Terms';

const LocalTripForm = () => {
    const searchParams = useSearchParams();
    const updatePackageId = searchParams.get('id');

    const [dropOffs, setDropOffs] = useState([]);
    const [query, setQuery] = useState("");

    const {
        otherError,
        isLoading,
        creating,
        deleting,
        fetchData,
        handleCreate,
        handleUpdate,
        handleDelete,
        data, setData, handleData,
        handleVariant, variant, setVariant, variantList, setVariantList,
        termsArray, setTermsArray,
    } = useLocalTripFromForm();

    const {
        setValue,
        getValues,
        register,
        unregister,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const tripType = watch('tripType');
    const dropCity = watch('dropCity');

    // Initially Fetch local trip Details if we got Id in URL
    useEffect(() => {
        if (updatePackageId) {
            (async () => {
                const resp = await fetchData(updatePackageId);
                setData(resp)
                setValue('tripType', resp?.tripType)
                setValue('dropCity', resp?.dropCity)
                setTermsArray(resp?.terms);
                setQuery(resp?.dropCity)
                setDropOffs(resp?.dropOffs)
                setVariantList(resp?.variantList)
            })();
        }
    }, [updatePackageId]);

    // console.log(data)

    useEffect(() => {
        handleData("dropOffs", dropOffs);
    }, [dropOffs])

    useEffect(() => {
        handleData("dropCity", dropCity);
    }, [dropCity])

    const handlePackageSubmit = async (e) => {
        e.preventDefault();

        let finalData = {
            ...data,
            terms: [...termsArray],
            tripType,
            variantList: variantList
        }
        // console.log(finalData);

        if (!finalData?.tripType || !!finalData?.PickupCity || !finalData?.variantList?.length)
            return toast.error("Please fill complete details")

        if (tripType === TRIP_TYPES.oneWay && !finalData?.dropCity)
            return toast.error("Please fill complete details")

        // console.log(finalData);
        if (tripType === TRIP_TYPES.roundTrip) {

            if (finalData?.dropOffs?.length <= 0 && !query)
                return toast.error('Please fill complete details');

            finalData = {
                ...finalData,
                dropCity: finalData?.dropCity ? finalData?.dropCity : "",
                dropOffs: finalData?.dropOffs?.length > 0
                    ? finalData?.dropOffs : [...dropOffs, query]
            }
        }
        // console.log(finalData);
        if (updatePackageId) {
            handleUpdate(finalData);
        } else {
            handleCreate(finalData);
        }
    };

    return (
        <div className='w-full max-w-4xl mx-auto p-4'>
            <form
                onSubmit={handlePackageSubmit}
                className="space-y-4">
                <div className='bg-white shadow-sm rounded-2xl p-6 border border-gray-100'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-5'>

                        {/* Trip Type */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Trip Type <span className="text-red-500">*</span></label>
                            <select
                                {...register('tripType', { required: 'Trip type is required' })}
                                className="border p-2 py-1 rounded-md"
                                value={data?.tripType}
                            >
                                <option value={TRIP_TYPES.oneWay}>{TRIP_TYPES.oneWay}</option>
                                <option value={TRIP_TYPES.roundTrip}>{TRIP_TYPES.roundTrip}</option>
                            </select>
                            {errors.tripType && (
                                <span className="text-red-500 text-xs">{errors.tripType.message}</span>
                            )}
                        </div>

                        <PickupCityName
                            updateLocalTripId={updatePackageId}
                        />

                        <LocationSearch
                            register={register}
                            unregister={unregister}
                            setValue={setValue}
                            dropOffs={dropOffs}
                            setDropOffs={setDropOffs}
                            tripType={tripType}
                            query={query}
                            setQuery={setQuery}
                        />
                    </div>

                    <div className='flex items-center gap-6'>
                        {
                            tripType === TRIP_TYPES.roundTrip &&
                            <div className="flex flex-col my-4">
                                <label className="text-sm font-medium text-gray-700 mb-1">No of Days</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={data?.noOfDays}
                                    onChange={(e) => handleData('noOfDays', e.target.value)}
                                    placeholder="Eg. 4"
                                    className="input-field"
                                />
                            </div>
                        }
                        {/* Terms and Conditions */}
                        <Terms />
                    </div>

                    {/* LocalTrip Variants in city */}
                    <div className='space-y-6'>
                        <TripVariant updateLocalTripId={updatePackageId} />
                    </div>
                </div>

                {otherError && (
                    <div className="p-4 bg-red-50 rounded-lg">
                        <p className="text-red-600 font-medium">Error: {otherError}</p>
                    </div>
                )}

                <div className="grid grid-cols-2 items-center gap-4">
                    <button
                        type="submit"
                        disabled={creating}
                        className="h-12 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {creating ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                        ) : !updatePackageId ? (
                            <>
                                <PlusCircle className="w-5 h-5" />
                                Create New Package
                            </>
                        ) : (
                            <>
                                <CircleCheckBig className="w-5 h-5" />
                                Update Package
                            </>
                        )}
                    </button>

                    {updatePackageId && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <button
                                    type="button"
                                    className="h-12 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <LucideDelete className="w-5 h-5" />
                                    Delete Package
                                </button>
                            </DialogTrigger>
                            <DialogContent className="rounded-2xl max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-bold text-gray-900">
                                        Confirm Deletion
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-600">
                                        This action cannot be undone. All associated data will be permanently removed.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        onClick={() => handleDelete(data.id)}
                                        disabled={deleting}
                                        className="h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl w-full"
                                    >
                                        {deleting ? (
                                            <Loader2 className="animate-spin w-5 h-5" />
                                        ) : (
                                            'Confirm Delete'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </form>
        </div>
    )
};

export default LocalTripForm;