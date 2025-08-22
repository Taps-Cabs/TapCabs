import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Edit2, Edit2Icon, Edit3, Loader2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { getVendorAllDrivers } from '@/lib/firebase/vendor/driver'
import {
    Car,
    Phone,
    Mail,
    User,
    Calendar,
    Hash
} from 'lucide-react'
import Link from 'next/link'

function VendorsList({ vendorLoading, vendors }) {
    const [vendorDrivers, setVendorDrivers] = useState(null)
    const [cabTypeColors, setCabTypeColors] = useState({})

    // Available color classes
    const colorClasses = [
        'bg-blue-100 text-blue-800',
        'bg-green-100 text-green-800',
        'bg-red-100 text-red-800',
        'bg-purple-100 text-purple-800',
        'bg-teal-100 text-teal-800',
        'bg-orange-100 text-orange-800',
        'bg-pink-100 text-pink-800',
        'bg-yellow-100 text-yellow-800'
    ]

    const handleViewDrivers = async (vendorId) => {
        try {
            const drivers = await getVendorAllDrivers(vendorId)
            setVendorDrivers(drivers)
        } catch (error) {
            console.error('Error fetching drivers:', error)
            setVendorDrivers(null)
        }
    }

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'N/A'
        const date = new Date(timestamp.seconds * 1000)
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    // Shuffle function for colors
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    useEffect(() => {
        if (vendorDrivers?.length) {
            // Get unique cab types
            const uniqueCabTypes = [...new Set(vendorDrivers.map(d => d.cabType))].filter(Boolean)

            // Create color mapping
            const shuffledColors = shuffleArray([...colorClasses])
            const colorMapping = {}

            uniqueCabTypes.forEach((type, index) => {
                colorMapping[type] = shuffledColors[index % shuffledColors.length]
            })

            setCabTypeColors(colorMapping)
        }
    }, [vendorDrivers])

    if (vendorLoading)
        return (
            <div className='w-full min-h-[30vh] flex justify-center items-center'>
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
        )

    if (vendors?.length <= 0)
        return (
            <div className='w-full min-h-[30vh] flex justify-center items-center'>
                <p className="text-muted-foreground">No vendors present in this city yet</p>
            </div>
        )

    return (
        <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vendors?.map((vendor, idx) => (

                    // Vendor Details
                    <Card key={idx} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 space-y-3">
                            <div className="space-y-1.5">
                                <div className='w-full flex items-center justify-between gap-2 text-primary'>
                                    <h3 className="text-lg font-semibold">{vendor?.name}</h3>
                                    <Link href={`/admin/vendors/new?id=${vendor?.id}`} >
                                        <Edit2 className="h-4 w-4" />
                                    </Link>
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {vendor?.location}
                                </p>
                            </div>

                            <div className="space-y-1.5 text-sm">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{vendor?.phoneNo}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{vendor?.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>{vendor?.drivers?.length} Drivers</span>
                                </div>
                            </div>

                            {vendor?.drivers?.length > 0 && (
                                <Button
                                    onClick={() => handleViewDrivers(vendor?.id)}
                                    className="w-full mt-2"
                                    variant="outline"
                                >
                                    View Drivers
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Driver Details */}
            <Dialog
                open={!!vendorDrivers?.length}
                onOpenChange={(open) => !open && setVendorDrivers(null)}
            >
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Driver Details</DialogTitle>

                        {/* Available Cabs section */}
                        <div className="mt-2">
                            <h4 className="text-sm font-medium text-muted-foreground">
                                Available Cab Types
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {Object.keys(cabTypeColors).map((cabType) => (
                                    <Badge
                                        key={cabType}
                                        className={`${cabTypeColors[cabType]} rounded-md px-3 py-1 text-sm`}
                                    >
                                        {cabType}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto p-2">
                        {vendorDrivers?.map((driver, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4 space-y-3">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                <User className="h-5 w-5 text-primary" />
                                                {driver?.name}
                                            </h3>
                                            <Badge variant="outline" className="capitalize">
                                                {driver?.cabType}
                                            </Badge>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <span>{driver?.phoneNo}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <span>{driver?.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-2">
                                        <h4 className="font-medium flex items-center gap-2">
                                            <Car className="h-5 w-5 text-primary" />
                                            Vehicle Details
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Hash className="h-4 w-4 text-muted-foreground" />
                                                <span>{driver?.vehicleNumber}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Car className="h-4 w-4 text-muted-foreground" />
                                                <span>{driver?.vehicleName}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span>Year: {driver?.vehicleYear}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span>Registered: {formatTimestamp(driver?.timestamp)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default VendorsList