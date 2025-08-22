import React from 'react'
import { Loader2, Pencil, MapPin, Clock, Route, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function LocalTripList({ loading, localTrips }) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4'>
            {loading ? (
                <div className="col-span-full flex flex-col items-center py-12 space-y-3">
                    <Loader2 className="animate-spin w-10 h-10 text-primary" />
                    <p className="text-muted-foreground">Loading trips...</p>
                </div>
            ) : localTrips.length === 0 ? (
                <div className="col-span-full flex flex-col items-center py-12 space-y-3">
                    <MapPin className="w-12 h-12 text-muted-foreground" />
                    <p className="text-xl text-muted-foreground font-medium">No local trips found</p>
                    <p className="text-muted-foreground text-sm">Create your first trip to get started</p>
                </div>
            ) : (
                localTrips.map((trip) => (
                    <div key={trip.id} className="group bg-white p-6 border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-out">
                        <div className='flex justify-between items-start gap-3 mb-4'>
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    {trip.cityName}
                                </h2>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Route className="w-4 h-4" />
                                        <span>{trip.tripDistance} km</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{trip.tripHours} hours</span>
                                    </div>
                                </div>
                            </div>
                            <Link href={`/admin/localTrips/form?id=${trip.id}`}>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="rounded-lg hover:bg-primary/10 transition-colors"
                                >
                                    <Pencil className="w-4 h-4 text-muted-foreground" />
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {trip.variantList.map((variant, index) => (
                                <div
                                    key={index}
                                    className="p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/2 border-l-4 border-primary relative"
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-gray-900">{variant.cabType}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm line-through text-rose-500">
                                                ₹{variant.variantAcutalPrice}
                                            </span>
                                            <span className="text-lg font-bold text-primary flex items-center">
                                                <IndianRupee className="w-4 h-4" />
                                                {variant.variantDiscountedPrice}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Price for {trip.tripDistance}km / {trip.tripHours}hrs
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default LocalTripList