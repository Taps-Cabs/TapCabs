import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase-client";

export const createNewBooking = async ({ data }) => {
    try {
        const collectionRef = collection(db, "bookings");

        // Add document
        const docRef = await addDoc(collectionRef, {
            ...data,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        });

        // Update document with its ID
        await updateDoc(docRef, { id: docRef.id });
        const bookingData = await getBookingDetails(docRef.id);

        return { success: true, message: "Booking Added Successfully.", data: docRef.id, bookingData };
    } catch (error) {
        console.error("Error adding Booking:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};

// get one booking all details
export const getBookingDetails = async (id) => {
    return await getDoc(doc(db, `bookings/${id}`)).then((snap) => snap.data());
}

// get all bookings
export const getAllBookings = async () => {
    return await getDocs(query(
        collection(db, 'bookings'),
        orderBy("createdAt", "desc")
    )).then((snaps) => snaps.docs.map((d) => d.data()))
}

// update booking
export const updateBooking = async (data) => {
    try {
        const bookingRef = doc(db, 'bookings', data.id);
        await updateDoc(bookingRef, data);
        return { success: true, message: 'Booking updated successfully.' };
    } catch (error) {
        console.error('Error updating booking:', error);
        throw new Error(error.message || 'Something went wrong.');
    }
};

// Helper to get date range
export const getDateRange = (filter) => {
    const now = new Date();
    let startDate, endDate;

    const startOfDay = (d) => new Date(d.setHours(0, 0, 0, 0));
    const endOfDay = (d) => new Date(d.setHours(23, 59, 59, 999));

    switch (filter) {
        case "today":
            startDate = startOfDay(new Date());
            endDate = endOfDay(new Date());
            break;
        case "yesterday":
            const yesterday = new Date();
            yesterday.setDate(now.getDate() - 1);
            startDate = startOfDay(new Date(yesterday));
            endDate = endOfDay(new Date(yesterday));
            break;
        case "upcoming":
            const upcoming = new Date();
            upcoming.setDate(now.getDate() + 1);
            startDate = startOfDay(new Date(upcoming));
            endDate = endOfDay(new Date(upcoming));
            break;
        case "tomorrow":
            const tomorrow = new Date();
            tomorrow.setDate(now.getDate() + 1);
            startDate = startOfDay(new Date(tomorrow));
            endDate = endOfDay(new Date(tomorrow));
            break;
        case "last7days":
            startDate = new Date();
            startDate.setDate(now.getDate() - 7);
            endDate = now;
            break;
        case "lastMonth":
            startDate = new Date();
            startDate.setMonth(now.getMonth() - 1);
            endDate = now;
            break;
        case "lastYear":
            startDate = new Date();
            startDate.setFullYear(now.getFullYear() - 1);
            endDate = now;
            break;
        default:
            return null;
    }

    return {
        start: Timestamp.fromDate(startDate),
        end: Timestamp.fromDate(endDate),
    };
};

export const getBookingsByDate = async (filter) => {
    const range = getDateRange(filter);
    if (!range) throw new Error("Invalid date filter");

    const bookingsRef = collection(db, "bookings");

    const q = filter === "upcoming"
        ? query(
            bookingsRef,
            where("pickupDate", ">=", range.start),
            orderBy("pickupDate", "desc")
        )
        : query(
            bookingsRef,
            where("pickupDate", ">=", range.start),
            where("pickupDate", "<=", range.end),
            orderBy("pickupDate", "desc")
        );

    const snaps = await getDocs(q);
    return snaps.docs.map((d) => ({ id: d.id, ...d.data() }));
};


export async function getBookingsByCustomRange(startDate, endDate) {
    try {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        const startTimestamp = Timestamp.fromDate(start);
        const endTimestamp = Timestamp.fromDate(end);

        const bookingsRef = collection(db, 'bookings');
        const q = query(
            bookingsRef,
            where('pickupDate', '>=', startTimestamp),
            where('pickupDate', '<=', endTimestamp),
            orderBy("pickupDate", "desc")
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching bookings by custom range:', error);
        return [];
    }
}

export const getBookingsByUser = async (userId) => {
    try {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const bookings = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return bookings;
    } catch (error) {
        console.error("Error fetching bookings by user:", error);
        throw error;
    }
};