'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowBigRightDashIcon, Trash, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteEnquiry } from '@/lib/firebase/admin/enquiry';

function EnquiriesList({ enquiries, fetchAllEnquiries }) {
    const [loadingId, setLoadingId] = useState(null);

    const handleDeleteEnquiry = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this enquiry?");
        if (!confirmed) return;

        try {
            setLoadingId(id);
            await deleteEnquiry(id);
            // fetchAllEnquiries();
        } catch (error) {
            console.error("Error deleting enquiry:", error);
            alert("Failed to delete enquiry. Please try again.");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div>
            <ScrollArea className="h-full sm:pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
                    {enquiries?.map((enquiry, index) => (
                        <Dialog key={index}>
                            <DialogTrigger asChild>
                                <div
                                    className="p-4 cursor-pointer hover:shadow-lg transition duration-200 bg-white rounded-xl shadow-md space-y-2"
                                >
                                    <div className="text-lg font-semibold text-purple-700">{enquiry?.tripType}</div>
                                    {enquiry?.tripType !== "Round Trip" && (
                                        <div className="flex items-center gap-1 text-sm">
                                            <span className="p-1 px-2 rounded-2xl bg-yellow-300">{enquiry?.pickupCity}</span>
                                            {enquiry?.dropCity && (
                                                <div className='flex items-center gap-1'>
                                                    <ArrowBigRightDashIcon />
                                                    <span className="p-1 px-2 rounded-2xl bg-yellow-300">{enquiry?.dropCity}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {enquiry?.tripType === 'Round Trip' && enquiry?.dropOffs?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-2 items-stretch">
                                            <div className="flex items-center gap-1 text-sm p-1 px-2 rounded-2xl bg-yellow-300">
                                                <span>{enquiry?.pickupCity}</span>
                                                <ArrowBigRightDashIcon />
                                            </div>
                                            {enquiry?.dropOffs?.map((city, index) => (
                                                <div key={index} className="flex items-center gap-1 text-sm p-1 px-2 rounded-2xl bg-yellow-300">
                                                    <span>{city}</span>
                                                    <ArrowBigRightDashIcon />
                                                </div>
                                            ))}
                                            <span className="text-sm flex items-center bg-yellow-300 p-1 px-2 rounded-2xl">
                                                {enquiry?.pickupCity}
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-sm text-gray-600">Estimated Distance: {enquiry?.totalDistance} kms</div>
                                    <div className="text-sm text-gray-500">Pick-up: {enquiry?.pickupTime}</div>
                                    {enquiry?.returnDate && (
                                        <div className="text-sm text-gray-500">Return: {enquiry?.returnDate}</div>
                                    )}
                                    <div className="text-sm">Customer Phone No: {enquiry?.mobileNumber}</div>
                                </div>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Enquiry Details</DialogTitle>
                                    <DialogDescription />
                                </DialogHeader>

                                <div className="space-y-2">
                                    <p><strong>Trip Type:</strong> {enquiry?.tripType}</p>
                                    <p><strong>Estimated Distance:</strong> {enquiry?.totalDistance} kms</p>
                                    <p><strong>Pick-up Date & Time:</strong> {enquiry?.pickupTime}</p>
                                    {enquiry?.returnDate && <p><strong>Return:</strong> {enquiry?.returnDate}</p>}
                                    <p><strong>Phone:</strong> {enquiry?.mobileNumber}</p>
                                </div>

                                <DialogFooter>
                                    <Button
                                        onClick={() => handleDeleteEnquiry(enquiry?.id)}
                                        className="border-red-600 text-red-600 hover:text-white hover:bg-red-600 transition-all ease-in-out duration-200"
                                        variant="outline"
                                        disabled={loadingId === enquiry?.id}
                                    >
                                        {loadingId === enquiry?.id ? (
                                            <>
                                                <Loader2 className="animate-spin w-4 h-4 mr-2" /> Deleting...
                                            </>
                                        ) : (
                                            <>
                                                Delete <Trash className="ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

export default EnquiriesList;
