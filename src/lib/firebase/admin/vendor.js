import axios from "axios";
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../firebase-client";

// Add Pickup City
export const createVendor = async (data) => {
    const toastId = toast.loading("Creating Vendor...");
    try {
        const response = await axios.post("/api/createVendor", data);
        if (!response?.data?.success)
            throw new Error(response?.data?.message);

        toast.dismiss(toastId);
        // console.log("CREATE VENDOR RESPONSE", response?.data?.data);
        toast.success("Vendor Created Successfully.");
        return response?.data?.data;

    } catch (error) {
        toast.dismiss(toastId);
        // console.log("CREATE VENDOR ERROR", error);
        toast.error(error?.response?.data?.message || error?.message);
        return null;
    }
};

// Update Vendor
export const updateVendor = async (data) => {
    const toastId = toast.loading("Updating Vendor...");
    try {
        const response = await axios.put("/api/editVendor", data);
        if (!response?.data?.success)
            throw new Error(response?.data?.message);

        toast.dismiss(toastId);
        // console.log("EDIT VENDOR RESPONSE", response?.data?.data);
        toast.success("Vendor Updated Successfully.");
        return response?.data?.success;

    } catch (error) {
        toast.dismiss(toastId);
        // console.log("EDIT VENDOR ERROR", error);
        toast.error(error?.response?.data?.message || error?.message);
        return null;
    }
};

// Delete Vendor
export const deleteVendor = async (data) => {
    const toastId = toast.loading("Deleting Vendor...");
    try {
        const response = await axios.post("/api/deleteVendor", data);
        if (!response?.data?.success)
            throw new Error(response?.data?.message);

        toast.dismiss(toastId);
        // console.log("DELETE VENDOR RESPONSE", response?.data?.data);
        toast.success("Vendor Deleted Successfully.");
        return response?.data?.success;

    } catch (error) {
        toast.dismiss(toastId);
        // console.log("DELETE VENDOR ERROR", error);
        toast.error(error?.response?.data?.message || error?.message);
        return null;
    }
};

export const addDriverToVendor = async (vendorId, driverId) => {
    try {
        const vendorRef = doc(db, `Users/${vendorId}`);
        await updateDoc(vendorRef, {
            drivers: arrayUnion(driverId),
        });
        return { success: true, message: "Driver added to vendor successfully." };
    } catch (error) {
        console.error("Error adding driver to vendor:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};

// get details of all vendors
export const getAllVendors = async () => {
    const q = query(collection(db, 'Users'), where('role', '==', 'vendor'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
};

export const getVendorsByCity = async (cityName) => {
    const q = query(
        collection(db, "Users"),
        where("role", "==", "vendor"),
        where("city", "==", cityName)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
};

// get details of one vendor
export const getVendorDetails = async (id) => {
    return await getDoc(doc(db, `Users/${id}`)).then((snap) => snap.data());
}