import { db } from "../firebase-client";
import { collection, addDoc, updateDoc, query, where, getDocs, getDoc, doc, Timestamp, deleteDoc } from "firebase/firestore";

// fetch details of all cab types
export const getAllCabTypes = async () => {
    return await getDocs(collection(db, 'cabTypes')).then((snaps) => snaps.docs.map((d) => d.data()))
}

// fetch the cab type details
export const getCabTypeDetails = async (id) => {
    return await getDoc(doc(db, `cabTypes/${id}`));
}

// create new cab type
export const createNewCabType = async ({ data }) => {
    if (!data?.name) throw new Error("Cab Type Name is undefined!");
    if (!data?.seatingCapacity) throw new Error("Seating Capacity is undefined!");
    if (!data?.luggageCapacity) throw new Error("Luggage Capacity is undefined!");

    try {
        const collectionRef = collection(db, "cabTypes");

        // Check if a cabType with the same name already exists (case-insensitive match)
        const q = query(collectionRef, where("name_lower", "==", data.name.trim().toLowerCase()));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            throw new Error("Cab Type with this name already exists.");
        }

        // Proceed to add new cab type
        const docRef = await addDoc(collectionRef, {
            ...data,
            name_lower: data.name.trim().toLowerCase(),
            timestamp: Timestamp.now(),
        });

        await updateDoc(docRef, { id: docRef.id });

        return { success: true, message: "Cab Type Added Successfully." };
    } catch (error) {
        console.error("Error adding Cab Type:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};

// delete cab type
export const deleteCabType = async (id) => {
    if (!id) {
        throw new Error("Id is required");
    }
    await deleteDoc(doc(db, `cabTypes/${id}`));
}

// Update cab type
export const updateCabType = async ({ data }) => {
    if (!data?.name) throw new Error("Cab Type Name is undefined!");
    if (!data?.seatingCapacity) throw new Error("Seating Capacity is undefined!");
    if (!data?.luggageCapacity) throw new Error("Luggage Capacity is undefined!");

    try {
        const collectionRef = doc(db, `cabTypes/${data?.id}`);
        await updateDoc(collectionRef, data);
        return { success: true, message: "Cab Type Updated Successfully." };

    } catch (error) {
        console.error("Error updating Cab Type:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};
