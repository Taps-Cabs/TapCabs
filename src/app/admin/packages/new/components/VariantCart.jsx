"use client"
import React, { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react';
import { useProductForm } from '../contexts/ProductFormContext';
import { EditDrawer } from './EditDrawer';

function VariantCart({ item, idx }) {
    const { updateVariant, deleteVariant } = useProductForm();
    const [open, setOpen] = useState(false);
    const [editedVariant, setEditedVariant] = useState(item)

    function handleEditVariant() {
        updateVariant(idx, editedVariant)
        setOpen(false);
    }

    return (
        <div className='flex items-center justify-between bg-gray-50 p-4 border border-gray-200 rounded-lg '        >
            <div className="flex justify-between items-center"            >
                <div>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Variant Name:</span> {item?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Actual:</span> ₹{item?.actualPrice}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Discount:</span> ₹{item?.discountedPrice}
                    </p>
                </div>
            </div>
            <div className="flex gap-2 items-center ml-4">
                <div
                    title="Edit"
                    className="p-2 rounded-full cursor-pointer bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    onClick={() => {
                        setEditedVariant(item)
                        setOpen(true)
                    }}
                >
                    <Edit size={18} />
                </div>
                <div
                    title="Delete"
                    className="p-2 rounded-full cursor-pointer bg-red-100 text-red-600 hover:bg-red-200 transition"
                    onClick={() => deleteVariant(idx)}
                >
                    <Trash2 size={18} />
                </div>
            </div>

            <EditDrawer
                open={open}
                onOpenChange={setOpen}
                variant={item}
                editedVariant={editedVariant}
                setEditedVariant={setEditedVariant}
                onSave={handleEditVariant}
            />
        </div>
    )
}

export default VariantCart
