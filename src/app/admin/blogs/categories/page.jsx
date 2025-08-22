"use client"
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import InnerLayout from "@/components/dashboard/layout/InnerLayout";
import { Button } from "@/components/ui/button";
import CategoriesListView from "./components/CategoriesListView";
import { getAllCategories } from "@/lib/firebase/blogs/blogCategories";
import { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Page() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [categories, setCategories] = useState(null)

    async function fetchCategories() {
        setLoading(true)
        try {
            const res = await getAllCategories()
            setCategories(res)
        } catch (error) {
            setError(error)
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <InnerLayout heading={'Manage Blog Categories'}>
            <div className="">
                <Breadcrumb className='mb-3'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin/blogs">Blogs</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Categories</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex justify-between items-center mb-4 mt-4">
                    <Button variant={'outline'}>
                        Categories: {categories?.length}
                    </Button>
                    <Link href="categories/form">
                        <Button>
                            <CirclePlus />
                            Add New
                        </Button>
                    </Link>
                </div>
                <CategoriesListView loading={loading} categories={categories} error={error} />
            </div>
        </InnerLayout>
    );
}
