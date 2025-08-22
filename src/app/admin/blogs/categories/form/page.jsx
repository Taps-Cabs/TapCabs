"use client"

import { useSearchParams } from "next/navigation";
import { useCategoryForm } from "./contexts/CategoryFormContext";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import InnerLayout from "@/components/dashboard/layout/InnerLayout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Page() {
    const searchParams = useSearchParams();
    const updateCategoryId = searchParams.get('id')

    const {
        data,
        isLoading,
        error,
        isDone,
        handleData,
        handleCreate,
        handleUpdate,
        handleDelete,
        image,
        setImage,
        fetchData,
        creating, deleting
    } = useCategoryForm();

    useEffect(() => {
        if (updateCategoryId) {
            fetchData(updateCategoryId);
        }
    }, [updateCategoryId])

    console.log(data)

    if (isLoading) {
        return <Loader2 />
    }

    return <InnerLayout heading={'Update Blog Category'}>
        <main className="w-full sm:px-6 sm:pt-3 flex flex-col gap-3">
            <Breadcrumb className='mb-3'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/blogs">Blogs</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/blogs/categories">Categories</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{updateCategoryId ? "Update Category" : "Add New Category"}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-5 items-center">
                {updateCategoryId && <div className="flex">
                    <h3 className="text-white bg-orange-500 px-4 py-2 rounded-full text-xs font-bold">Update</h3>
                </div>}
                {!updateCategoryId && <div className="flex">
                    <h3 className="text-white bg-green-500 px-4 py-2 rounded-full text-xs font-bold">Create</h3>
                </div>}
                <h1 className="font-bold">Category | Form</h1>
            </div>
            <section className="flex">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (updateCategoryId) {
                            handleUpdate();
                        } else {
                            handleCreate();
                        }
                    }}
                    className="flex flex-col gap-2 bg-white border rounded-xl p-7">
                    {/* name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-500">Category Name <span className="text-red-500">*</span> </label>
                        <input
                            className="px-4 py-2 rounded-full border bg-gray-50"
                            placeholder="Enter Category Name"
                            type="text"
                            onChange={(e) => {
                                handleData('name', e.target.value)
                            }}
                            value={data?.name ?? ''}
                            required
                        />
                    </div>
                    {/* slug */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-500">Category Slug <span className="text-red-500">*</span> </label>
                        <input
                            className="px-4 py-2 rounded-full border bg-gray-50"
                            placeholder="Enter Category Slug"
                            type="text"
                            onChange={(e) => {
                                handleData('slug', e.target.value)
                            }}
                            disabled={updateCategoryId}
                            value={data?.slug ?? ''}
                            required
                        />
                    </div>

                    {data?.imageURL
                        && <div>
                            <img className="h-40" src={data?.imageURL?.imageURL} alt="" />
                        </div>
                    }

                    {image
                        && <div>
                            <img className="h-40" src={URL.createObjectURL(image)} alt="" />
                        </div>
                    }

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-500">Image  </label>
                        <input
                            className="px-4 py-2 rounded-full border bg-gray-50"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                e.preventDefault();
                                const file = e.target.files[0];

                                if (file) {
                                    const maxSize = 100 * 1024;
                                    if (file.size > maxSize) {
                                        alert("Image size should be less than or equal to 100KB.");
                                        e.target.value = "";
                                        return;
                                    }
                                    setImage(file);
                                }
                            }}
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading || isDone}
                        className="bg-blue-500 rounded-full px-4 py-2 text-white">
                        {creating ? "Loading..." : updateCategoryId ? "Update" : "Create"}
                    </button>

                    {updateCategoryId && <button
                        onClick={(e) => {
                            e.preventDefault();
                            window.confirm("Do you want to delete this category?")
                            handleDelete(updateCategoryId);
                        }}
                        disabled={isLoading}
                        className="bg-red-500 rounded-full px-4 py-2 text-white">
                        {deleting ? "Loading..." : "Delete"}
                    </button>}

                    {isDone && <h3 className="text-green-500 font-bold text-center">
                        Successfully {updateCategoryId ? "Updated" : "Created"} !
                    </h3>}

                </form>
            </section>
        </main>
    </InnerLayout>
}