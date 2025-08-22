import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-client";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";

// Utility functions for validations
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phoneNo) => /^[0-9]{10,15}$/.test(phoneNo); // accepts 10 to 15 digit numbers
const isStrongPassword = (password) => password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);

export const signup = async (name, email, phoneNo, password, role) => {

    try {
        // Validation checks
        if (!name || !email || !phoneNo || !password || !role) {
            throw new Error("All fields are required.");
        }

        if (!isValidEmail(email)) {
            throw new Error("Invalid email format.");
        }

        if (!isValidPhone(phoneNo)) {
            throw new Error("Invalid phone number. Must be 10 to 15 digits.");
        }

        if (!isStrongPassword(password)) {
            throw new Error("Password must be at least 8 characters long and include both letters and numbers.");
        }

        const allowedRoles = ["user", "admin", "vendor"];
        if (!allowedRoles.includes(role.toLowerCase())) {
            throw new Error(`Invalid role. Allowed roles: ${allowedRoles.join(", ")}`);
        }

        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user info to Firestore
        if (user) {
            await setDoc(doc(db, "Users", user.uid), {
                name,
                email: user.email,
                phoneNo,
                role: role.toLowerCase(),
            });
        }

        return user;

    } catch (err) {
        console.error("Signup error:", err.message || err);
        throw new Error(err.message || "Signup failed. Please try again.");
    }
};

export const handleUserDetails = async (name, email, phoneNo) => {

    try {
        // Validation checks
        if (!name || !email || !phoneNo) {
            throw new Error("All fields are required.");
        }

        if (!isValidEmail(email)) {
            throw new Error("Invalid email format.");
        }

        if (!isValidPhone(phoneNo)) {
            throw new Error("Invalid phone number. Must be 10 to 15 digits.");
        }

        //get user doc by phone number
        // const q = ;
        let snaps = await getDocs(
            query(collection(db, 'Users'), where('phoneNo', '==', phoneNo), where('role', '==', "user"))
        );
        let user = snaps.docs[0];
        // console.log("User Check", )
        // return;
        //  snapshot.docs.map((doc) => doc.data());
        console.log("User", user);
        // return;

        // Save user info to Firestore
        if (user) {
            console.log("User found");
            user = await setDoc(doc(db, "Users", user.uid), {
                name,
                // email: user.email,
                // phoneNo,
                // role: role.toLowerCase(),
            });
        } else {
            console.log("New User");
            const collectionRef = collection(db, "Users");
            const docRef = await addDoc(collectionRef, {
                name,
                email,
                phoneNo,
                role: "User",
                timestamp: Timestamp.now(),
            });
            user = await updateDoc(docRef, { id: docRef.id });
        }


        return user;

    } catch (err) {
        console.error("Signup error:", err);
        // throw new Error(err.message || "Signup failed. Please try again.");
    }
};