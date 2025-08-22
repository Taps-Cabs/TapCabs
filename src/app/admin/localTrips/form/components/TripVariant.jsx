"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import VariantCard from './VariantCard'
import CabType from './variant/CabType'
import { useLocalTripFromForm } from '../context/localTripContext'
import VariantPrice from './variant/VariantPrice'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlusCircle } from 'lucide-react'

function TripVariant({ updateLocalTripId }) {
    const { variant, setVariant, variantList, setVariantList, data } = useLocalTripFromForm();

    // 🗑 Delete dialog state
    const [deleteIndex, setDeleteIndex] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)

    // ✏️ Edit dialog state
    const [editIndex, setEditIndex] = useState(null)
    const [openEdit, setOpenEdit] = useState(false)
    const [editVariant, setEditVariant] = useState({
        cabType: '',
        variantAcutalPrice: '',
        variantDiscountedPrice: ''
    })

    // When “Edit” clicked, populate `editVariant` and open dialog
    function handleEdit(idx) {
        setEditIndex(idx)
        setEditVariant(variantList[idx])
        setOpenEdit(true)
    }

    // Save changes from Edit dialog
    function confirmEdit() {
        if (editIndex === null) return
        setVariantList(prev =>
            prev.map((v, i) => i === editIndex ? editVariant : v)
        )
        setEditIndex(null)
        setOpenEdit(false)
    }

    function handleAddVariant() {
        const requiredFields = [
            'cabType',
            'variantAcutalPrice',
        ];

        if (requiredFields.some(field => !variant[field])) {
            alert("Please fill all the fields before adding the variant.")
            return
        }

        setVariantList(prev => [...prev, variant])

        setVariant({
            cabType: '',
            variantAcutalPrice: '',
            variantDiscountedPrice: ''
        })
    }

    const handleDelete = (index) => {
        setDeleteIndex(index);
        setOpenDialog(true);
    }

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            setVariantList(prev => prev.filter((_, i) => i !== deleteIndex));
            setDeleteIndex(null);
        }
        setOpenDialog(false);
    }

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Cab Types & Pricing</h2>
            <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-4">
                    <div className="space-y-4">
                        <CabType />
                        <VariantPrice />
                    </div>
                    <button
                        type="button"
                        onClick={handleAddVariant}
                        className="w-full h-12 bg-primary hover:bg-blue-950 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Add Cab Type
                    </button>
                </div>

                {variantList.length > 0 && (
                    <div className="space-y-4 bg-gray-50 border p-3 rounded-xl">
                        <h3 className="text-lg font-bold text-blue-900">Added Cab Types</h3>
                        <div className="grid gap-3">
                            {variantList.map((v, idx) => (
                                <VariantCard
                                    key={idx}
                                    variant={v}
                                    onEdit={() => handleEdit(idx)}
                                    onDelete={() => handleDelete(idx)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Variant</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this variant? This action cannot be undone.</p>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setOpenDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Yes, Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ―― Edit Confirmation ―― */}
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Variant</DialogTitle>
                    </DialogHeader>

                    {/* Re-use your form inputs but tied to `editVariant` */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <CabType
                            // override hook to local editVariant
                            value={editVariant.cabType}
                            onChange={(val) => setEditVariant(prev => ({ ...prev, cabType: val }))}
                        />
                        <VariantPrice
                            valueActual={editVariant.variantAcutalPrice}
                            valueDiscount={editVariant.variantDiscountedPrice}
                            onChangeActual={(val) =>
                                setEditVariant(prev => ({ ...prev, variantAcutalPrice: val }))
                            }
                            onChangeDiscount={(val) =>
                                setEditVariant(prev => ({ ...prev, variantDiscountedPrice: val }))
                            }
                        />
                    </div>

                    <DialogFooter className="mt-6 space-x-2">
                        <Button variant="outline" onClick={() => setOpenEdit(false)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmEdit}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TripVariant
