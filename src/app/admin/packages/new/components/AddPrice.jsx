import React from 'react'

export const AddPrice = () => {

    const tripType = [
        {
            index: 1,
            tripType: "One Way"
        },
        {
            index: 2,
            tripType: "Round Trip"
        },
        {
            index: 3,
            tripType: "Local"
        },
    ]

    return (
        tripType &&
        tripType.map(tr => (
            <div key={tr?.index} className='flex items-center gap-2'>
                {/* Trip Type */}
                <div className='w-1/4 flex items-center gap-1 grow'>
                    <input
                        type="checkbox"
                        // value={data?.name ?? ""}
                        value={false}
                        // onChange={(e) => handleData('name', e.target.value)}
                        className="border-8 border-gray-600 rounded-lg"
                        required
                    />

                    <label className="text-sm text-gray-600">
                        {tr?.tripType}
                    </label>
                </div>

                {/* Price */}
                <div className='flex gap-2 w-fit'>
                    {/* <div className="flex flex-col"> */}
                    <input
                        type="number"
                        min={0}
                        value={''}
                        // value={variant?.actualPrice ?? ''}
                        // onChange={(e) => handleVariant('actualPrice', e.target.value)}
                        id="actual-price"
                        placeholder="Actual Price"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary w-full"
                    />
                    {/* </div> */}

                    {/* <div className="flex flex-col"> */}
                    <input
                        type="number"
                        min={0}
                        value={''}
                        // value={variant?.discountedPrice ?? ''}
                        // onChange={(e) => handleVariant('discountedPrice', e.target.value)}
                        id="discounted-price"
                        placeholder="Discounted Price"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary w-full"
                    />
                    {/* </div> */}
                </div>
            </div>
        ))
    )
}
