
import uploadImage, { deleteImage } from "@/lib/services/uploadImage";
import { Timestamp, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-client";

export const createNewCategory = async ({ data, image }) => {
    if (!data?.name) {
        throw new Error("Name is undefined");
    }
    if (!data?.slug) {
        throw new Error("Slug is undefined");
    }
    if (!image) {
        throw new Error("Image is not selected");
    }

    const firestoreRef = doc(db, `blogCategories/${data.slug}`);

    // Check if the slug already exists
    const existingDoc = await getDoc(firestoreRef);
    if (existingDoc.exists()) {
        throw new Error("Slug already exists. Please choose a unique slug.");
    }

    const imageURL = await uploadImage(image);

    await setDoc(firestoreRef, {
        ...data,
        imageURL: imageURL,
        timestamp: Timestamp.now(),
    });

    await updateDoc(firestoreRef, { id: firestoreRef.id });

};

export const updateCategory = async ({ data, image }) => {
    if (!data?.name) {
        throw new Error("Name is undefined");
    }
    if (!data?.slug) {
        throw new Error("Slug is undefined");
    }

    const firestoreRef = doc(db, `blogCategories/${data.id}`);

    const updatePayload = {
        ...data,
        timestamp: Timestamp.now(),
    };

    if (image) {
        const imageURL = await uploadImage(image);
        updatePayload.imageURL = imageURL;
    }

    await updateDoc(firestoreRef, updatePayload);
}

export const deleteCategory = async (id) => {
    if (!id) {
        throw new Error("Id is required");
    }
    await deleteDoc(doc(db, `blogCategories/${id}`));
}

export const getCategory = async (id) => {
    return await getDoc(doc(db, `blogCategories/${id}`)).then((snap) => snap.data());
}

export const getAllCategories = async () => {
    // build a query that orders by timestamp descending
    const q = query(
        collection(db, "blogCategories"),
        orderBy("timestamp", "desc")
    );

    // execute the query
    const snaps = await getDocs(q);

    // map to data objects
    return snaps.docs.map((doc) => doc.data());
};