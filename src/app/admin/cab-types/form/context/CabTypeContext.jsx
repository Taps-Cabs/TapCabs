"use client"

import { createNewCabType, deleteCabType, getCabTypeDetails, updateCabType } from "@/lib/firebase/admin/cabType";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import toast from 'react-hot-toast';

const CabTypeFormContext = createContext();

export default function CabTypeFormContextProvider({ children }) {
    const router = useRouter();

    const [otherError, setOtherError] = useState(null);

    // while fetching the data
    const [isLoading, setIsLoading] = useState(false);

    // while adding or updating
    const [creating, setCreating] = useState(false);

    // while deleting
    const [deleting, setDeleting] = useState(false);

    // fetch data
    const fetchData = async (id) => {
        setOtherError(null)
        setIsLoading(true)
        try {
            const res = await getCabTypeDetails(id);
            if (res.exists()) {
                return res.data();
            } else {
                throw new Error(`No Cab Type found with id ${id}`);
            }
        } catch (error) {
            setOtherError(error?.message);
            toast.error(error?.message || 'Error fetching cab type');
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    // create new cab type
    const handleCreate = async (data) => {
        setOtherError(null)
        setCreating(true)
        try {
            await createNewCabType({ data });
            toast.success('Cab Type Added Successfully!');
            router.push('/admin/cab-types');
        } catch (error) {
            setOtherError(error?.message);
            toast.error(error?.message || 'Error adding cab type');
        }
        setCreating(false)
    }

    // update cab type
    const handleUpdate = async (data) => {
        setOtherError(null)
        setCreating(true)
        try {
            await updateCabType({ data });
            toast.success('Cab Type Updated Successfully!');
            router.push('/admin/cab-types');
        } catch (error) {
            setOtherError(error?.message);
            toast.error(error?.message || 'Error updating cab type');
        }
        setCreating(false)
    }

    // delete cab type
    const handleDelete = async (id) => {
        setOtherError(null)
        setDeleting(true)
        try {
            await deleteCabType(id);
            toast.success('Cab Type Deleted Successfully!');
            router.push('/admin/cab-types');
        } catch (error) {
            setOtherError(error?.message);
            toast.error(error?.message || 'Error deleting cab type');
        }
        setDeleting(false)
    }

    return <CabTypeFormContext.Provider
        value={{
            otherError,
            isLoading,
            creating,
            deleting,
            fetchData,
            handleCreate,
            handleUpdate,
            handleDelete,
        }}
    >{children}</CabTypeFormContext.Provider>
}

export const useCabTypeForm = () => useContext(CabTypeFormContext);
