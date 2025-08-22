"use client"

import { useSearchParams } from "next/navigation";
import { useBlogForm } from "./contexts/BlogFormContext";
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
import SelectCategoryField from "./components/SelectCategoryField";
import RTEField from "./components/RTEField";

export default function Page() {
    const searchParams = useSearchParams();
    const updateId = searchParams.get('id')

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
    } = useBlogForm();

    useEffect(() => {
        if (updateId) {
            fetchData(updateId);
        }
    }, [updateId])

    useEffect(() => {
        if (data?.title && !updateId) {
            const slug = data.title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            handleData('slug', slug);
        }
    }, [data?.title, updateId])

    if (isLoading) {
        return <Loader2 />
    }

    return <InnerLayout heading={updateId ? "Update Blog" : 'Create New Blog'}>
        <main className="w-full sm:px-2 sm:pt-1 flex flex-col gap-3">

            <Breadcrumb className='mb-2'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/blogs">Blogs</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{updateId ? "Update Blog " : "Create New Blog"}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (updateId) {
                        handleUpdate();
                    } else {
                        handleCreate();
                    }
                }}
                className="flex flex-col gap-5 bg-white border rounded-xl p-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700 font-semibold">Title<span className="text-red-500">*</span> </label>
                        <input
                            className="px-4 py-2 rounded-sm border bg-gray-50"
                            placeholder="New Generation Cars"
                            type="text"
                            onChange={(e) => {
                                handleData('title', e.target.value)
                            }}
                            value={data?.title ?? ''}
                            required
                        />
                    </div>
                    {/* slug */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700 font-semibold">Slug <span className="text-red-500">*</span> </label>
                        <input
                            className="px-4 py-2 rounded-sm border bg-gray-50"
                            placeholder="new-generation-cars"
                            type="text"
                            value={data?.slug ?? ''}
                            required
                            onChange={(e) => {
                                handleData('slug', e.target.value)
                            }}
                        />
                    </div>
                </div>

                {/* description */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700 font-semibold">Description (Max 20-25 words) <span className="text-red-500">*</span> </label>
                    <input
                        className="px-4 py-2 rounded-sm border bg-gray-50"
                        placeholder="The car of this generation have so much features..."
                        type="text"
                        onChange={(e) => {
                            handleData('description', e.target.value)
                        }}
                        value={data?.description ?? ''}
                        required
                    />
                </div>

                {/* category */}
                <SelectCategoryField />

                {/* Image */}
                <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Upload Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Upload Image
                        </label>

                        <div className="flex items-center gap-4">
                            <label className="flex flex-col items-center justify-center w-full cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        if (file.size > 400 * 1024) {
                                            alert("Image size should be less than 400KB");
                                            e.target.value = "";
                                            return;
                                        }
                                        setImage(file);
                                    }}
                                />

                                <div className="flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors w-full">
                                    <svg
                                        className="w-8 h-8 text-gray-400 mb-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-600 font-medium">
                                        Click to upload
                                    </span>
                                    <span className="text-xs text-gray-500 mt-1">
                                        PNG, JPG (Max 400KB)
                                    </span>
                                </div>
                            </label>
                        </div>

                        {image && (
                            <p className="text-sm text-gray-600 mt-2">
                                Selected file: {image.name}
                            </p>
                        )}
                    </div>
                    {data?.imageURL && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">Current Image</p>
                            <div className="border rounded-lg overflow-hidden p-2">
                                <img
                                    className="h-40 w-full object-contain rounded-md"
                                    src={data.imageURL.imageURL}
                                    alt="Current content"
                                />
                            </div>
                        </div>
                    )}

                    {image && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">New Preview</p>
                            <div className="border rounded-lg overflow-hidden p-2 relative">
                                <img
                                    className="h-40 w-full object-contain rounded-md"
                                    src={URL.createObjectURL(image)}
                                    alt="Selected content"
                                />
                                <button
                                    type="button"
                                    onClick={() => setImage(null)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Rich text editor */}
                <RTEField />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex gap-3 items-center justify-end">
                    <button
                        type="submit"
                        disabled={isLoading || isDone}
                        className="bg-blue-800 rounded-sm px-4 py-2 text-white">
                        {creating ? "Loading..." : updateId ? "Update" : "Create"}
                    </button>

                    {updateId && <button
                        onClick={(e) => {
                            e.preventDefault();
                            window.confirm("Do you want to delete this Blog?")
                            handleDelete(updateId);
                        }}
                        disabled={isLoading}
                        className="bg-red-600 rounded-sm px-4 py-2 text-white">
                        {deleting ? "Loading..." : "Delete"}
                    </button>}
                </div>
                {isDone && <h3 className="text-green-500 font-bold text-center">
                    Successfully {updateId ? "Updated" : "Created"} !
                </h3>}

            </form>
        </main>
    </InnerLayout>
}