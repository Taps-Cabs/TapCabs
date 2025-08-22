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
import CityName from './CityName';
import TripVariant from './TripVariant';
import TripHours from './TripHours';
import TripDistance from './TripDistance';
import { useAirportTripForm } from '../context/airportTripContext';
import Terms from './Terms';

const AirportTripForm = () => {
    const searchParams = useSearchParams();
    const updateAirportTripId = searchParams.get('id');

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
        tempTerm, setTempTerm, termsArray, setTermsArray,
    } = useAirportTripForm();


    // Initially Fetch Product Details if we got Id in URL
    useEffect(() => {
        if (updateAirportTripId) {
            (async () => {
                const resp = await fetchData(updateAirportTripId);
                setData(resp)
                setVariantList(resp?.variantList)
                setTermsArray(resp?.terms);
            })();
        }
    }, [updateAirportTripId]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const finalData = {
            ...data,
            terms: [...termsArray],
            variantList: variantList
        }
        if (updateAirportTripId) {
            handleUpdate(finalData);
        } else {
            handleCreate(finalData);
        }
    };

    return (
        <div className='w-full max-w-4xl mx-auto p-4'>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='bg-white shadow-sm rounded-2xl p-6 border border-gray-100'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-5'>
                        {/* City Name */}
                        <CityName updateAirportTripId={updateAirportTripId} />

                        {/* Hours */}
                        <TripHours updateAirportTripId={updateAirportTripId} />

                        {/* Kilometers */}
                        <TripDistance updateAirportTripId={updateAirportTripId} />
                    </div>

                    {/* LocalTrip Variants in city */}
                    <div className='space-y-6 mb-5'>
                        <TripVariant updateAirportTripId={updateAirportTripId} />
                    </div>

                    <div>
                        <Terms updateAirportTripId={updateAirportTripId} />
                    </div>
                </div>

                {otherError && (
                    <div className="p-4 bg-red-50 rounded-lg">
                        <p className="text-red-600 font-medium">Error: {otherError}</p>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={creating}
                        className="h-12 bg-gradient-to-r flex-grow from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {creating ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                        ) : !updateAirportTripId ? (
                            <>
                                <PlusCircle className="w-5 h-5" />
                                Create Airport Trip
                            </>
                        ) : (
                            <>
                                <CircleCheckBig className="w-5 h-5" />
                                Update Airport Trip
                            </>
                        )}
                    </button>

                    {updateAirportTripId && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <button
                                    type="button"
                                    className="h-12 flex-grow bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <LucideDelete className="w-5 h-5" />
                                    Delete Airport Trip
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

export default AirportTripForm;