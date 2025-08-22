"use client";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";

import { Save } from "lucide-react";

export function EditDrawer({ open, onOpenChange, editedVariant, setEditedVariant, onSave, }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <div className="mx-auto w-full max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit Variant Details</DialogTitle>
                        <DialogDescription>Make changes to your item variant here.</DialogDescription>
                    </DialogHeader>
                    <div className="p-4 pb-10 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-600 font-medium">Variant Name</label>
                            <input
                                type="text"
                                value={editedVariant?.name}
                                onChange={(e) =>
                                    setEditedVariant({ ...editedVariant, name: e.target.value })
                                }
                                placeholder="e.g. Small / Red / 250g"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-600 font-medium">Actual Price (₹)</label>
                            <input
                                type="number"
                                value={editedVariant.actualPrice}
                                onChange={(e) =>
                                    setEditedVariant({ ...editedVariant, actualPrice: e.target.value })
                                }
                                placeholder="e.g. 500"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-600 font-medium">Discounted Price (₹)</label>
                            <input
                                type="number"
                                value={editedVariant.discountedPrice}
                                onChange={(e) =>
                                    setEditedVariant({ ...editedVariant, discountedPrice: e.target.value })
                                }
                                placeholder="e.g. 450"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant={'secondary'} onClick={onSave} className="text-white flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}