'use client'

import InnerLayout from "@/components/dashboard/layout/InnerLayout";
import ProductName from "./components/ProductName";
import ProductDescription from "./components/ProductDescription";
import PriceDetails from "./components/PriceDetails";
import { PackageFormProvider } from './context/PackageContext';

export default function Page() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Use context to access data and handle submission
    };

    return (
        <PackageFormProvider>
            <InnerLayout heading={'Add new Package'}>
                <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-fit min-h-full">
                    <form onSubmit={handleSubmit} className="h-full flex flex-col gap-5 p-5">
                        <ProductName />
                        <ProductDescription />
                        <PriceDetails />
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 cursor-pointer transition-colors font-medium"
                        >
                            Create Package
                        </button>
                    </form>
                </section>
            </InnerLayout>
        </PackageFormProvider>
    );
}
