import { db } from "../firebase-client";
import { collection, addDoc, updateDoc, query, where, getDocs, getDoc, doc, Timestamp, deleteDoc } from "firebase/firestore";

// Add Pickup City
export const createNewLocalTrip = async ({ data }) => {

    try {
        const collectionRef = collection(db, "localTrips");

        // Proceed to add new pickup city
        const docRef = await addDoc(collectionRef, {
            ...data,
            timestamp: Timestamp.now(),
        });

        await updateDoc(docRef, { id: docRef.id });

        return { success: true, message: "Local Trip Added Successfully." };
    } catch (error) {
        console.error("Error adding Local Trip:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};


// fetch details of all pickup cities
export const getAllLocalTrips = async () => {
    return await getDocs(collection(db, 'localTrips')).then((snaps) => snaps.docs.map((d) => d.data()))
}

// fetch details of all pickup cities
export const getLocalTripsByCity = async (cityName) => {
    return await getDocs(
        query(collection(db, 'localTrips'), where('cityName', '==', cityName))
    ).then((snaps) => snaps.docs.map((d) => d.data()))
}

// fetch the pickup city
export const getLocalTripDetails = async (id) => {
    return await getDoc(doc(db, `localTrips/${id}`));
}

// Update local trip
export const updateLocalTrip = async ({ data }) => {
    try {
        const collectionRef = doc(db, `localTrips/${data?.id}`);
        await updateDoc(collectionRef, data);
        return { success: true, message: "Local Trip Updated Successfully." };

    } catch (error) {
        console.error("Error updating Local Trip:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};

// delete local trip
export const deleteLocalTrip = async (id) => {
    if (!id) {
        throw new Error("Id is required");
    }
    await deleteDoc(doc(db, `localTrips/${id}`));
}