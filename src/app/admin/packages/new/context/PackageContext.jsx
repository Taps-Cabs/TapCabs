"use client"
import { createContext, useContext, useState } from "react";

const PackageFormContext = createContext();

export const PackageFormProvider = ({ children }) => {
    const [data, setData] = useState({
        name: "",
        pickupCity: "",
        dropCity: "",
        includeTollTax: false,
        tripType: "One Way", // or "Round Trip"
        variants: [], // e.g., cab types
    });

    const handleData = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const addVariant = (variant) => {
        setData(prev => ({
            ...prev,
            variants: [...prev.variants, variant],
        }));
    };

    const removeVariant = (index) => {
        setData(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index),
        }));
    };

    return (
        <PackageFormContext.Provider value={{
            data,
            handleData,
            addVariant,
            removeVariant,
        }}>
            {children}
        </PackageFormContext.Provider>
    );
};

export const usePackageForm = () => useContext(PackageFormContext);
