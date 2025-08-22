"use client"
import { useEffect } from "react"
import useAuthStore from "@/store/useAuthStore"

export default function AuthProvider({ children }) {
    const initAuth = useAuthStore((s) => s.initAuth)

    useEffect(() => {
        const unsubscribe = initAuth()
        return () => unsubscribe()
    }, [initAuth])

    return <>{children}</>
}
