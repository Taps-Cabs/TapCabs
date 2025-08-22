import { CalendarDays } from 'lucide-react';
import React from 'react';

function ReturnDate({ register, pickupDate, pickupTime }) {
    // Convert 12-hour time to 24-hour format
    const convertTo24Hour = (timeStr) => {
        if (!timeStr) return "00:00";
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };

    const time24 = convertTo24Hour(pickupTime);
    const pickupDateTimeStr = `${pickupDate}T${time24}`;
    const pickupDateTime = new Date(pickupDateTimeStr);

    // Calculate default return date (next day)
    const returnDate = new Date(pickupDateTime);
    returnDate.setDate(returnDate.getDate() + 1);

    // Format dates as yyyy-mm-dd for input field
    const minDateStr = pickupDateTime.toISOString().split("T")[0];
    const defaultDateStr = returnDate.toISOString().split("T")[0];

    return (
        <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <CalendarDays size={16} className="text-primary" />
                Return Date
            </label>
            <input
                type="date"
                {...register('returnDate', { required: true })}
                className="w-full px-4 py-1 rounded-lg border border-gray-300"
                min={minDateStr}
                defaultValue={defaultDateStr}
            />
        </div>
    );
}

export default ReturnDate;
