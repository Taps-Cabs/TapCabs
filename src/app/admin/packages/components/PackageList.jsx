'use client'
import InnerLayout from '@/components/dashboard/layout/InnerLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export const PackageList = ({ packages }) => {

    return (
        <div>
            <ScrollArea className={'h-full'}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {packages?.map((pkg, idx) => (
                        <Card key={idx}>
                            <CardContent className="p-4 py-0 space-y-2">
                                <div className='flex justify-between items-center gap-2'>
                                    <div>
                                        <Badge className={'mb-2 rounded-sm'}>{pkg?.tripType}</Badge>
                                        <h3 className="text-lg font-semibold text-purple-700">Package {idx + 1}</h3>
                                    </div>
                                    <Link href={`/admin/packages/form?id=${pkg.id}`}>
                                        <Button size="icon" variant="outline" className='cursor-pointer'>
                                            <Pencil size={16} />
                                        </Button>
                                    </Link>
                                </div>

                                <div className="text-sm">
                                    <p><strong>Pick Up:</strong> {pkg?.pickupCity}</p>
                                    {pkg?.dropCity &&
                                        <p><strong>Drop City:</strong> {pkg?.dropCity}</p>
                                    }
                                    {pkg?.dropOffs && pkg?.dropOffs?.length > 0 &&
                                        <div className='flex gap-3'>
                                            <strong>Drop Offs:</strong>
                                            <div className='flex flex-col gap-0'>
                                                {pkg?.dropOffs?.map((city, i) => (
                                                    <div key={i}>{i + 1}. {city}</div>
                                                ))}</div>
                                        </div>
                                    }
                                    {pkg?.noOfDays &&
                                        <p><strong>No Of Days:</strong> {pkg?.noOfDays}</p>
                                    }
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Cabs:</p>
                                    {pkg.variantList.map((cab, cabIndex) => (
                                        <div key={cabIndex} className="border rounded-md p-2 bg-muted/30">
                                            <div className="flex flex-wrap justify-between items-center mb-1">
                                                <span className="font-semibold">Cab {cabIndex + 1}</span>
                                                <Badge className="text-xs" variant={'outline'}>
                                                    {cab.cabType}
                                                </Badge>
                                            </div>
                                            <p className="text-sm">Actual Price: ₹{cab?.variantAcutalPrice}</p>
                                            <p className="text-sm">Discounted Price: ₹{cab?.variantDiscountedPrice}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}
