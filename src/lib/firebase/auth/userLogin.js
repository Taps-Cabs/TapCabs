import { db } from "../firebase-client";
import {
    addDoc,
    collection,
    getDoc,
    getDocs,
    doc,
    query,
    updateDoc,
    where,
} from "firebase/firestore";

export const addLocalUser = async (data) => {
    if (!data?.phone) {
        throw new Error("Phone number is missing");
    }

    try {
        const collectionRef = collection(db, 'Users');
        const q = query(collectionRef, where('phoneNo', "==", data.phone.trim()));
        const snapshot = await getDocs(q);

        // If user already exists, return that user’s data
        if (!snapshot.empty) {
            const existingUserDoc = snapshot.docs[0];
            return {
                success: true,
                userDetails: { id: existingUserDoc.id, ...existingUserDoc.data() }
            };
        }

        data = { ...data, phoneNo: data?.phone };

        // Add new user
        const docRef = await addDoc(collectionRef, {
            ...data,
            role: 'user'
        });
        await updateDoc(docRef, { id: docRef.id });

        // Fetch newly added user
        const newUserDoc = await getDoc(docRef);

        return {
            success: true,
            userDetails: { id: newUserDoc.id, ...newUserDoc.data() }
        };

    } catch (error) {
        throw new Error(error.message || "Failed to add or fetch user.");
    }
};
