import uploadImage from "@/lib/services/uploadImage";
import { Timestamp, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-client";

export const createNewBlog = async ({ data, image }) => {
    if (!data?.title) {
        throw new Error("Name is undefined");
    }
    if (!data?.slug) {
        throw new Error("Slug is undefined");
    }
    // if (!image) {
    //     throw new Error("Image is not selected");
    // }

    const firestoreRef = doc(db, `blogs/${data.slug}`);

    // Check if the slug already exists
    const existingDoc = await getDoc(firestoreRef);
    if (existingDoc.exists()) {
        throw new Error("Slug already exists. Please choose a unique slug.");
    }

    const createPayload = {
        ...data,
        timestamp: Timestamp.now(),
    }

    if (image) {
        const imageURL = await uploadImage(image);
        createPayload.imageURL = imageURL;
    }

    await setDoc(firestoreRef, createPayload);

    await updateDoc(firestoreRef, { id: firestoreRef.id });

};

export const updateBlog = async ({ data, image }) => {
    if (!data?.title) {
        throw new Error("Name is undefined");
    }
    if (!data?.slug) {
        throw new Error("Slug is undefined");
    }

    const firestoreRef = doc(db, `blogs/${data.id}`);

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

export const deleteBlog = async (id) => {
    if (!id) {
        throw new Error("Id is required");
    }
    await deleteDoc(doc(db, `blogs/${id}`));
}

export const getBlog = async (id) => {
    return await getDoc(doc(db, `blogs/${id}`)).then((snap) => snap.data());
}

export const getAllBlogs = async () => {
    // build a query that orders by timestamp descending
    const q = query(
        collection(db, "blogs"),
        orderBy("timestamp", "desc")
    );

    // execute the query
    const snaps = await getDocs(q);

    // map to data objects
    return snaps.docs.map((doc) => doc.data());
};