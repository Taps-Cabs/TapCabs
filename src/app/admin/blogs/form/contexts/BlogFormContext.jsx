"use client"

import { createNewBlog, deleteBlog, getBlog, updateBlog } from "@/lib/firebase/blogs/blogs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const BlogFormContext = createContext();

export default function BlogFormContextProvider({ children }) {
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
            await createNewBlog({ data: data, image: image });
            router.push("/admin/blogs")
        } catch (error) {
            setError(error?.message)
        }
        setCreating(false)
    }

    const handleUpdate = async () => {
        setError(null)
        setCreating(true)
        try {
            await updateBlog({ data: data, image: image ? image : null })
            router.push("/admin/blogs")
        } catch (error) {
            setError(error?.message)
        }
        setCreating(false)
    }

    const handleDelete = async (id) => {
        setError(null)
        setDeleting(true)
        try {
            await deleteBlog(id);
            router.push("/admin/blogs");
        } catch (error) {
            setError(error?.message)
        }
        setDeleting(false)
    }

    const fetchData = async (id) => {
        setError(null)
        setIsLoading(true)
        try {
            const res = await getBlog(id);
            if (res) {
                setData(res);
            } else {
                throw new Error(`No Blog found from id ${id}`)
            }
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }


    return <BlogFormContext.Provider
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
    >{children}</BlogFormContext.Provider>
}

export const useBlogForm = () => useContext(BlogFormContext);