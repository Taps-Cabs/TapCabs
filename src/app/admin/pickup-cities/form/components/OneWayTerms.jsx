import React from 'react'
import { usePickupCityForm } from '../context/PickupCityContext';

function OneWayTerms() {

    const { tempOneWayTerm, setOneWayTempTerm, oneWayTermsArray, setOneWayTermsArray, } = usePickupCityForm()

    const handleAddTerm = () => {
        if (tempOneWayTerm.trim() !== '') {
            setOneWayTermsArray(!oneWayTermsArray ? [tempOneWayTerm.trim()] : [...oneWayTermsArray, tempOneWayTerm.trim()])
            setOneWayTempTerm('');
        }
    };

    const handleRemoveTerm = (index) => {
        setOneWayTermsArray(oneWayTermsArray.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor='terms' className="text-sm font-medium">For One Way</label>

            <div className="flex gap-2">
                <input
                    type="text"
                    id="terms"
                    placeholder='eg. Your Trip has a KM limit.'
                    value={tempOneWayTerm}
                    onChange={(e) => setOneWayTempTerm(e.target.value)}
                    className="border p-2 rounded-md w-full"
                />
                <button
                    type="button"
                    onClick={handleAddTerm}
                    className="bg-green-600 text-white px-3 rounded hover:bg-green-700"
                >
                    +
                </button>
            </div>

            {/* Display List of Terms */}
            <ul className="list-disc list-inside text-sm text-gray-700">
                {oneWayTermsArray?.map((term, index) => (
                    <li key={index} className="flex justify-between items-center">
                        {index + 1}. {term}
                        <button
                            type="button"
                            onClick={() => handleRemoveTerm(index)}
                            className="text-red-500 hover:text-red-700 ml-2 text-xs cursor-pointer"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OneWayTerms