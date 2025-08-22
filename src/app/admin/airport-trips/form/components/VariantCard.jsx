import { Pencil, Trash } from 'lucide-react'
import React from 'react'

function VariantCard({ variant, onEdit, onDelete }) {
    return (
        <div className="group relative p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-100 hover:bg-gradient-to-br from-blue-50/20 to-white transition-all">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {variant.cabType}
                    </h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 line-through">₹{variant.variantAcutalPrice}</span>
                            <span className="text-2xl font-bold text-green-600">
                                ₹{variant.variantDiscountedPrice}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 ml-4">
                    <button
                        type='button'
                        onClick={onEdit}
                        className="p-2 hover:bg-blue-50 rounded-lg text-gray-500 hover:text-blue-600"
                    >
                        <Pencil className="w-5 h-5" />
                    </button>
                    <button
                        type='button'
                        onClick={onDelete}
                        className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600"
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VariantCard