'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Navigate = ({ to }) => {
    const router = useRouter();

    useEffect(() => {
        router.push(to);
    }, [to, router]);

    return null; // or a loading spinner
};

export default Navigate;