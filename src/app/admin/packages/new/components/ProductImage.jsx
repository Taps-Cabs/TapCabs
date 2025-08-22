import React from 'react'
import Loader from "@/components/Loader";
import { ArrowUpTrayIcon, TrashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useProductForm } from '../contexts/ProductFormContext';

function ProductImage({ updateProductId }) {
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
        sizes, setSizes,
        size, setSize,
        creating,
        deleting
    } = useProductForm();

    return (
        <div className="space-y-6 sticky top-8">

            {/* Image Section */}
            <div className="space-y-6">
                {/* Image Preview */}
                {(data?.iconURL?.imageURL || image) ? (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Product Image
                        </label>
                        <div className="relative group">
                            <img
                                className="w-full h-64 object-cover rounded-xl"
                                src={image ? URL.createObjectURL(image) : data?.iconURL?.imageURL}
                                alt="Preview"
                            />
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                            <button
                                type="button"
                                onClick={() => setImage(null)}
                                className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-red-600 p-1.5 rounded-full shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <label
                                htmlFor="fileInput"
                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer transition-colors"
                            >
                                <ArrowUpTrayIcon className="w-4 h-4" />
                                Replace Image
                            </label>
                            <input
                                type="file"
                                className="hidden"
                                id="fileInput"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Product Image
                        </label>
                        <label
                            htmlFor="fileInput"
                            className="flex flex-col items-center justify-center h-48 cursor-pointer rounded-xl border-2 border-dashed border-gray-300 hover:border-green-500 bg-gray-50/50 hover:bg-gray-100/50 transition-all group"
                        >
                            <div className="text-center p-6">
                                <div className="mx-auto h-10 w-10 text-gray-400 mb-3 group-hover:text-green-500 transition-colors">
                                    <ArrowUpTrayIcon className="w-full h-full" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600 group-hover:text-green-600 transition-colors">
                                        Click to upload Image
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Recommended: 800x800px (JPEG, PNG, WEBP)
                                    </p>
                                </div>
                                <span className="mt-3 inline-block px-4 py-2 text-sm font-medium text-green-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                                    Select File
                                </span>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                id="fileInput"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </label>
                    </div>
                )}

                {/* Status Messages */}
                {error && (
                    <div className="text-red-500 text-sm mt-2 text-center">
                        {error}
                    </div>
                )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col gap-3 pt-6">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 cursor-pointer transition-colors font-medium disabled:opacity-50"
                >
                    {creating ? (
                        <Loader className="" color='white' size={10} height={6} />
                    ) : updateProductId ? (
                        "Update Product"
                    ) : (
                        "Create Product"
                    )}
                </button>
                {updateProductId && (
                    <button
                        type="button"
                        onClick={() => handleDelete(updateProductId)}
                        disabled={deleting || isDone}
                        className="w-full cursor-pointer flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-2.5 rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50"
                    >
                        {deleting ?
                            <Loader className="" color='white' size={10} height={6} />
                            : <span className='flex gap-2 items-center justify-center'> <TrashIcon className="w-4 h-4" />
                                Delete Product
                            </span>
                        }
                    </button>
                )}
            </div>

            {/* Status Messages */}
            {error && (
                <div className="text-red-500 text-sm mt-4 text-center">
                    {error}
                </div>
            )}
            {isDone && (
                <div className="text-green-500 text-sm mt-4 text-center">
                    <CheckCircleIcon className="w-4 h-4 inline-block mr-2" />
                    Successfully {updateProductId ? "updated" : "created"}!
                </div>
            )}
        </div>
    )
}

export default ProductImage
