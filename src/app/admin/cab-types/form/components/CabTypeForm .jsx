"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CircleCheckBig, Loader2, LucideDelete, PlusCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
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
import { useCabTypeForm } from '../context/CabTypeContext';

const CabTypeForm = () => {
    const searchParams = useSearchParams();
    const updateCabTypeId = searchParams.get('id');

    const {
        otherError,
        isLoading,
        creating,
        deleting,
        fetchData,
        handleCreate,
        handleUpdate,
        handleDelete,
    } = useCabTypeForm();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    // Initially Fetch Product Details if we got Id in URL
    useEffect(() => {
        if (updateCabTypeId) {
            (async () => {
                const cabTypeData = await fetchData(updateCabTypeId);
                if (cabTypeData) {
                    setValue('name', cabTypeData.name);
                    setValue('seatingCapacity', cabTypeData.seatingCapacity);
                    setValue('luggageCapacity', cabTypeData.luggageCapacity);
                }
            })();
        }
    }, [updateCabTypeId]);


    const onSubmit = async (data) => {
        console.log('Cab Type Data:', data);
        if (updateCabTypeId) {
            handleUpdate({ ...data, id: updateCabTypeId });
        } else {
            handleCreate(data);
        }
    };

    return (
        <div className='w-full'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-xl shadow-md space-y-6 w-full max-w-xl"
            >
                {/* Cab Type Name */}
                <div className="flex flex-col">
                    <label htmlFor='name' className="text-sm font-medium mb-1">Type Name </label>
                    {isLoading
                        ? <Skeleton className="h-10 w-full" />
                        : <input
                            type="text"
                            id="name"
                            placeholder='eg. Hatchback / Sedan / SUV'
                            {...register('name', { required: 'Cab Type Name is required' })}
                            className="border p-2 rounded-md"
                        />
                    }
                    {errors.name && (
                        <span className="text-red-500 text-xs">{errors.name.message}</span>
                    )}
                </div>

                {/* Cab Seating Capacity */}
                <div className="flex flex-col">
                    <label htmlFor='seatingCapacity' className="text-sm font-medium mb-1">Seating Capacity </label>
                    {isLoading
                        ? <Skeleton className="h-10 w-full" />
                        : <input
                            type="text"
                            id="seatingCapacity"
                            placeholder='4 / 5 '
                            {...register('seatingCapacity', { required: 'Seating Capcity is required' })}
                            className="border p-2 rounded-md"
                        />
                    }
                    {errors.seatingCapacity && (
                        <span className="text-red-500 text-xs">{errors.seatingCapacity.message}</span>
                    )}
                </div>

                {/* Cab Luggage Capacity */}
                <div className="flex flex-col">
                    <label htmlFor='luggageCapacity' className="text-sm font-medium mb-1">Luggage Capacity </label>
                    {isLoading
                        ? <Skeleton className="h-10 w-full" />
                        : <input
                            type="text"
                            id="luggageCapacity"
                            placeholder='4 Small Bags / 2 Big Bags'
                            {...register('luggageCapacity', { required: 'Luggage Capcity is required' })}
                            className="border p-2 rounded-md"
                        />
                    }
                    {errors.luggageCapacity && (
                        <span className="text-red-500 text-xs">{errors.luggageCapacity.message}</span>
                    )}
                </div>

                {otherError
                    && <p className="text-red-500 text-base">Error: {otherError}</p>
                }

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={creating}
                    className="bg-primary w-full flex gap-2 items-center justify-center text-white py-2 px-4 rounded-md hover:bg-blue-800 cursor-pointer transition"
                >
                    {creating ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            {!updateCabTypeId ?
                                <div className='flex justify-center items-center gap-2'> <PlusCircle size={20} /> Create Cab Type</div>
                                : <div className='flex justify-center items-center gap-2'> <CircleCheckBig size={20} /> Update Cab Type </div>
                            }
                        </>
                    )}
                </button>

                {/* Delete Button */}
                {updateCabTypeId && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                type="button"
                                className="bg-red-600 w-full flex gap-2 items-center justify-center text-white py-2 px-4 rounded-md hover:bg-red-800 cursor-pointer transition"
                            >
                                <LucideDelete size={20} /> Delete
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Delete Cab Type</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this Cab Type?
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    onClick={() => handleDelete(updateCabTypeId)}
                                    disabled={deleting === updateCabTypeId}
                                    className="bg-red-600 w-full flex gap-2 items-center justify-center text-white py-2 px-4 rounded-md hover:bg-red-800 cursor-pointer transition"
                                >
                                    {deleting ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            <LucideDelete size={20} /> Delete Cab Type
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}

            </form>
        </div>
    )
};

export default CabTypeForm;