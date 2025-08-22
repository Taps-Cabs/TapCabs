import { db } from "../firebase-client";
import { collection, addDoc, updateDoc, query, where, getDocs, getDoc, doc, Timestamp, deleteDoc } from "firebase/firestore";

// Add Package
export const createTripPackage = async ({ data }) => {

    try {
        const collectionRef = collection(db, "package");

        // Proceed to add new pickup city
        const docRef = await addDoc(collectionRef, {
            ...data,
            timestamp: Timestamp.now(),
        });

        await updateDoc(docRef, { id: docRef.id });

        return { success: true, message: "Package Added Successfully." };
    } catch (error) {
        console.error("Error adding Package:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};


// fetch details of all pickup cities
export const getAllTripPackages = async () => {
    return await getDocs(collection(db, 'package')).then((snaps) => snaps.docs.map((d) => d.data()))
}

// fetch local trips by trip type
export const getPackageTripsByTripType = async (tripType) => {
    return await getDocs(
        query(collection(db, 'package'), where('tripType', '==', tripType))
    ).then((snaps) => snaps.docs.map((d) => d.data()))
}

// fetch the pickup city
export const getPackageDetails = async (id) => {
    return await getDoc(doc(db, `package/${id}`));
}

// Update local trip
export const updatePackage = async ({ data }) => {
    try {
        const collectionRef = doc(db, `package/${data?.id}`);
        await updateDoc(collectionRef, data);
        return { success: true, message: "package Updated Successfully." };

    } catch (error) {
        console.error("Error updating package:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};

// delete local trip
export const deletePackage = async (id) => {
    if (!id) {
        throw new Error("Id is required");
    }
    await deleteDoc(doc(db, `package/${id}`));
}