import { db } from "../firebase-client";
import { collection, addDoc, updateDoc, query, where, getDocs, getDoc, doc, Timestamp, deleteDoc } from "firebase/firestore";

// Add Pickup City
export const createNewAirportTrip = async ({ data }) => {

    try {
        const collectionRef = collection(db, "airportTrips");

        const docRef = await addDoc(collectionRef, {
            ...data,
            timestamp: Timestamp.now(),
        });

        await updateDoc(docRef, { id: docRef.id });

        return { success: true, message: "Airport Trip Added Successfully." };
    } catch (error) {
        console.error("Error adding airport Trip:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};


// fetch details of all pickup cities
export const getAllAirportTrips = async () => {
    return await getDocs(collection(db, 'airportTrips')).then((snaps) => snaps.docs.map((d) => d.data()))
}

// fetch details of all pickup cities
export const getAirportTripsByCity = async (cityName) => {
    return await getDocs(
        query(collection(db, 'airportTrips'), where('cityName', '==', cityName))
    ).then((snaps) => snaps.docs.map((d) => d.data()))
}

// fetch the pickup city
export const getAirportTripDetails = async (id) => {
    return await getDoc(doc(db, `airportTrips/${id}`));
}

// Update Airport trip
export const updateAirportTrip = async ({ data }) => {
    try {
        const collectionRef = doc(db, `airportTrips/${data?.id}`);
        await updateDoc(collectionRef, data);
        return { success: true, message: "Airport Trip Updated Successfully." };

    } catch (error) {
        console.error("Error updating Airport Trip:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};

// delete airport trip
export const deleteAirportTrip = async (id) => {
    if (!id) {
        throw new Error("Id is required");
    }
    await deleteDoc(doc(db, `airportTrips/${id}`));
}