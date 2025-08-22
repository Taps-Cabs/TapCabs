import { Edit2Icon, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

function PickupCityCards({ pickupCities }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pickupCities.map((city) => (
                <div
                    key={city.id}
                    className="bg-white shadow-sm border rounded-xl p-4 flex flex-col gap-4"
                >
                    {/* City Name */}
                    <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                            <MapPin className="text-primary" size={20} />
                            <h2 className="text-xl font-semibold text-primary">{city.name}</h2>
                        </div>
                        <Link href={`/admin/pickup-cities/form?id=${city?.id}`}>
                            <Edit2Icon size={20} className="text-primary" />
                        </Link>
                    </div>

                    {/* Terms & Conditions */}
                    <div>
                        <h3 className="text-sm text-gray-700 mb-1 font-semibold">
                            Terms and Conditions
                        </h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {city.terms?.map((term, index) => (
                                <li key={index}>{term}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Cab Variants */}
                    <div className="grid gap-3">
                        {city.variantList?.map((variant, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-3 bg-gray-50 flex flex-col gap-2"
                            >
                                <Badge className="w-fit text-sm">{variant.name}</Badge>
                                <div className="text-sm text-muted-foreground space-y-1">
                                    <p><strong>Min. Kilometers:</strong> {variant.minKilometers}</p>
                                    <Separator />
                                    <p><strong>Actual Price (One Way):</strong> ₹{variant.actualPriceOneWay}</p>
                                    <p><strong>Discounted Price (One Way):</strong> ₹{variant.discountedPriceOneWay}</p>
                                    <Separator />
                                    <p><strong>Actual Price (Round Trip):</strong> ₹{variant.actualPriceRoundTrip}</p>
                                    <p><strong>Discounted Price (Round Trip):</strong> ₹{variant.discountedPriceRoundTrip}</p>
                                    <Separator />
                                    <p><strong>Driver Allowance/Day:</strong> ₹{variant.driverAllowance}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PickupCityCards
