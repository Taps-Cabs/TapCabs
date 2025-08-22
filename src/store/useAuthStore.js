import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth, db } from "@/lib/firebase/firebase-client";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { signup as firebaseSignup } from "@/lib/firebase/services/auth";
import toast from "react-hot-toast";

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            userData: null,
            isLoading: false,
            error: null,

            setUserData: (data) => {
                set({ userData: data });
            },

            initAuth: () => {
                set({ isLoading: true });
                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const snap = await getDoc(doc(db, "Users", user.uid));
                        set({
                            user,
                            userData: snap.exists() ? snap.data() : null,
                            isLoading: false,
                            error: null,
                        });
                    } else {
                        // ✅ Only clear userData if it's a Firebase-auth user
                        const currentUserData = get().userData;
                        const isFirebaseUser = currentUserData?.role === "admin" || currentUserData?.role === "vendor";

                        if (isFirebaseUser) {
                            set({ user: null, userData: null, isLoading: false });
                        } else {
                            // Keep lightweight user's data intact
                            set({ user: null, isLoading: false });
                        }
                    }
                });
                return unsubscribe;
            },

            handleSignInWithEmail: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                    toast.success("Login Successful");
                } catch (err) {
                    toast.error("Login Failed");
                    set({ error: "Invalid email or password" });
                    return;
                } finally {
                    set({ isLoading: false });
                }
            },

            handleSignup: async (name, email, phoneNo, password, role) => {
                set({ isLoading: true, error: null });
                try {
                    const user = await firebaseSignup(name, email, phoneNo, password, role);
                    set({ user });
                } catch (err) {
                    set({ error: err.message || "Signup failed" });
                    throw err;
                } finally {
                    set({ isLoading: false });
                }
            },

            handleLogout: async () => {
                set({ isLoading: true, error: null });
                try {
                    await signOut(auth);
                    set({ user: null, userData: null });
                } catch (err) {
                    set({ error: err.message });
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: "auth-local-user",
            partialize: (state) => ({ userData: state.userData }),
        }
    )
);

export default useAuthStore;