"use client"

import { createNewPickupCity, deletePickupCity, getPickupCityDetails, updatePickupCity } from "@/lib/firebase/admin/pickupCity";
// import { createNewCabType, deleteCabType, getCabTypeDetails, updateCabType } from "@/lib/firebase/admin/cabType";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import toast from 'react-hot-toast';

const PickupCityFormContext = createContext();

export default function PickupCityFormContexttProvider({ children }) {
    const router = useRouter();
    const [data, setData] = useState({});
    const [variantList, setVariantList] = useState([])
    const [otherError, setOtherError] = useState(null);

    // while fetching the data
    const [isLoading, setIsLoading] = useState(false);

    // while adding or updating
    const [creating, setCreating] = useState(false);

    // while deleting
    const [deleting, setDeleting] = useState(false);

    const [variant, setVariant] = useState({
        name: '',
        minKilometers: '',
        minKilometersRoundTrip: '',
        minKilometersOneWay: '',
        actualPriceRoundTrip: '',
        discountedPriceRoundTrip: '',
        actualPriceOneWay: '',
        discountedPriceOneWay: '',
        extraKilometersLocal: '',
        extraHoursLocal: '',
        extraKilometersAirport: '',
        extraHoursAirport: '',
        driverAllowance: '',
    })
    const [editVariant, setEditVariant] = useState(null);
    const [deleteVariant, setDeleteVariant] = useState(null);

    function handleVariant(key, value) {
        setVariant(prev => ({
            ...prev,
            [key]: value
        }))
    }

    function handleEditVariantList() {
        // const alreadyPresent = variantList?.filter((vr, idx) => vr?.name === variant?.name && vr?.id !== idx);
        // if (alreadyPresent && alreadyPresent?.length > 0) {
        //     toast.error('Variant Already Present');
        //     return;
        // }

        const updatedVariantList = variantList?.map(vr => (
            vr?.name === editVariant?.name ? variant : vr
        ));
        setVariantList(updatedVariantList);
    }

    function handleDeleteVariantList() {

        const updatedVariantList = variantList?.filter(vr => vr?.name !== deleteVariant?.name);
        setVariantList(updatedVariantList);
    }

    // terms
    const [tempTerm, setTempTerm] = useState('');
    const [termsArray, setTermsArray] = useState([]);
    const [tempOneWayTerm, setOneWayTempTerm] = useState('');
    const [oneWayTermsArray, setOneWayTermsArray] = useState([]);
    const [tempRoundTripTerm, setRoundTripTempTerm] = useState('');
    const [roundTripTermsArray, setRoundTripTermsArray] = useState([]);

    const handleData = (key, value) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    // fetch data
    const fetchData = async (id) => {
        setOtherError(null)
        setIsLoading(true)
        try {
            // console.log(id)
            const res = await getPickupCityDetails(id);
            if (res.exists()) {
                return res.data();
            } else {
                throw new Error(`No Pickup City found with id ${id}`);
            }
        } catch (error) {
            setOtherError(error?.message);
            toast.error(error?.message || 'Error fetching pickup city');
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
            await createNewPickupCity({ data });
            toast.success('Pickup City Added Successfully!');
            router.push('/admin/pickup-cities');
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
            // console.log(data);
            await updatePickupCity({ data });
            toast.success('Pickup City Updated Successfully!');
            router.push('/admin/pickup-cities');
        } catch (error) {
            setOtherError(error?.message);
            toast.error(error?.message || 'Error updating pickup city');
        }
        setCreating(false)
    }

    // delete cab type
    const handleDelete = async (id) => {
        setOtherError(null)
        setDeleting(true)
        try {
            await deletePickupCity(id);
            toast.success('Pickup City Deleted Successfully!');
            router.push('/admin/pickup-cities');
        } catch (error) {
            setOtherError(error?.message);
            toast.error(error?.message || 'Error deleting pickup city');
        }
        setDeleting(false)
    }

    return <PickupCityFormContext.Provider
        value={{
            otherError,
            isLoading,
            creating,
            deleting,
            fetchData,
            handleCreate,
            handleUpdate,
            handleDelete,
            data, setData, handleData,
            handleVariant, handleEditVariantList, handleDeleteVariantList,
            editVariant, setEditVariant, deleteVariant, setDeleteVariant,
            variant, setVariant, variantList, setVariantList,
            tempTerm, setTempTerm, termsArray, setTermsArray,
            tempOneWayTerm, setOneWayTempTerm, oneWayTermsArray, setOneWayTermsArray,
            tempRoundTripTerm, setRoundTripTempTerm, roundTripTermsArray, setRoundTripTermsArray
        }}
    >
        {children}
    </PickupCityFormContext.Provider>
}

export const usePickupCityForm = () => useContext(PickupCityFormContext);
