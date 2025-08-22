"use client"

import { createNewCategory, deleteCategory, getCategory, updateCategory } from "@/lib/firebase/blogs/blogCategories";
// import { getCategory } from "@/lib/firebase/category/read";
// import { createNewCategory, deleteCategory, updateCategory } from "@/lib/firebase/category/write";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const CategoryFormContext = createContext();

export default function CategoryFormContextProvider({ children }) {
    const router = useRouter();

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [creating, setCreating] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);

    const handleData = (key, value) => {
        setData({
            ...data,
            [key]: value,
        })
    }

    const handleCreate = async () => {
        setError(null)
        setCreating(true)
        try {
            await createNewCategory({ data: data, image: image });
            router.push("/admin/blogs/categories")
        } catch (error) {
            setError(error?.message)
        }
        setCreating(false)
    }

    const handleUpdate = async () => {
        setError(null)
        setCreating(true)
        try {
            await updateCategory({ data: data, image: image ? image : null })
            router.push("/admin/blogs/categories")
        } catch (error) {
            setError(error?.message)
        }
        setCreating(false)
    }

    const handleDelete = async (id) => {
        setError(null)
        setDeleting(true)
        try {
            await deleteCategory(id);
            router.push("/admin/blogs/categories");
        } catch (error) {
            setError(error?.message)
        }
        setDeleting(false)
    }

    const fetchData = async (id) => {
        setError(null)
        setIsLoading(true)
        try {
            const res = await getCategory(id);
            if (res) {
                setData(res);
            } else {
                throw new Error(`No Category found from id ${id}`)
            }

        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }


    return <CategoryFormContext.Provider
        value={{
            data,
            isLoading,
            error,
            handleData,
            handleCreate,
            handleUpdate,
            handleDelete,
            image,
            setImage,
            fetchData,
            creating,
            deleting
        }}
    >{children}</CategoryFormContext.Provider>
}

export const useCategoryForm = () => useContext(CategoryFormContext);