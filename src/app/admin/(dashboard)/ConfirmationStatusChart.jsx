'use client';

import { getAllBookings, getDateRange } from '@/lib/firebase/admin/booking';
import React, { useEffect, useMemo, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

const BOOKINGS_LIST = [
    {
        tripType: 'Round Trip',
        vehicleType: 'Sedan',
        pickUpLocation: "Delhi",
        dropLocation: 'Meerut',
        pickUpDate: '20 Apr 2025',
        pickUpTime: '12:30 AM',
        returnDate: "22 Apr 2025",
        confirmationStatus: "Pending",
        tripStatus: 'Pending',
        customer: {
            name: "Raghav",
            mobileNo: 9844587856,
            email: 'raghav@gmail.com'
        },
        assignedVendor: null
    },
    {
        tripType: 'One Way',
        vehicleType: 'Sedan',
        pickUpLocation: "Delhi",
        dropLocation: 'Meerut',
        pickUpDate: '20 Apr 2025',
        pickUpTime: '12:30 AM',
        confirmationStatus: "Pending",
        tripStatus: 'Pending',
        customer: {
            name: "Anju",
            mobileNo: 9856987856,
            email: 'anju@gmail.com'
        },
        assignedVendor: "PtkcL4WAoSWLFUxAN8sHwGAkNY73"
    },
    {
        tripType: 'One Way',
        vehicleType: 'SUV',
        pickUpLocation: "Noida",
        dropLocation: 'Agra',
        pickUpDate: '21 Apr 2025',
        pickUpTime: '9:00 AM',
        confirmationStatus: "Confirmed",
        tripStatus: 'Scheduled',
        customer: {
            name: "Sohail",
            mobileNo: 9876543210,
            email: 'sohail@gmail.com'
        },
        assignedVendor: "AbcdEfGh123456"
    },
    {
        tripType: 'Round Trip',
        vehicleType: 'Hatchback',
        pickUpLocation: "Gurgaon",
        dropLocation: 'Jaipur',
        pickUpDate: '22 Apr 2025',
        pickUpTime: '7:30 AM',
        returnDate: "24 Apr 2025",
        confirmationStatus: "Rejected",
        tripStatus: 'Cancelled',
        customer: {
            name: "Pooja",
            mobileNo: 9123456789,
            email: 'pooja@yahoo.com'
        },
        assignedVendor: null
    },
    {
        tripType: 'One Way',
        vehicleType: 'Sedan',
        pickUpLocation: "Chandigarh",
        dropLocation: 'Delhi',
        pickUpDate: '23 Apr 2025',
        pickUpTime: '4:00 PM',
        confirmationStatus: "Confirmed",
        tripStatus: 'Completed',
        customer: {
            name: "Vikram",
            mobileNo: 9988776655,
            email: 'vikram@outlook.com'
        },
        assignedVendor: "VendorUID09876"
    },
    {
        tripType: 'Round Trip',
        vehicleType: 'SUV',
        pickUpLocation: "Lucknow",
        dropLocation: 'Varanasi',
        pickUpDate: '25 Apr 2025',
        pickUpTime: '10:00 AM',
        returnDate: "28 Apr 2025",
        confirmationStatus: "Pending",
        tripStatus: 'Pending',
        customer: {
            name: "Neha",
            mobileNo: 9001122334,
            email: 'neha@rediffmail.com'
        },
        assignedVendor: null
    },
    {
        tripType: 'One Way',
        vehicleType: 'Hatchback',
        pickUpLocation: "Pune",
        dropLocation: 'Mumbai',
        pickUpDate: '26 Apr 2025',
        pickUpTime: '6:45 AM',
        confirmationStatus: "Confirmed",
        tripStatus: 'Ongoing',
        customer: {
            name: "Arjun",
            mobileNo: 8899776655,
            email: 'arjun@gmail.com'
        },
        assignedVendor: "VendorXyz789"
    },
    {
        tripType: 'Round Trip',
        vehicleType: 'Sedan',
        pickUpLocation: "Hyderabad",
        dropLocation: 'Vizag',
        pickUpDate: '27 Apr 2025',
        pickUpTime: '3:15 PM',
        returnDate: "29 Apr 2025",
        confirmationStatus: "Confirmed",
        tripStatus: 'Scheduled',
        customer: {
            name: "Sneha",
            mobileNo: 9876547890,
            email: 'sneha@gmail.com'
        },
        assignedVendor: "VendorUID12345"
    }
];

const ConfirmationStatusChart = () => {

    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState({
        today: 0,
        yesterday: 0,
        lastSevenDays: 0,
        lastMonth: 0,
    });
    const [chartColors, setChartColors] = useState([]);

    async function fetchAllBookings() {
        setLoading(true)
        try {
            const res = await getAllBookings();
            // console.log(res);
            if (res) {
                setChartData({
                    ...chartData,
                    today: res?.filter(item => {
                        const range = getDateRange("today");
                        return item?.createdAt >= range.start && item?.createdAt <= range.end
                    })?.length,

                    yesterday: res?.filter(item => {
                        const range = getDateRange("yesterday");
                        return item?.createdAt >= range.start && item?.createdAt <= range.end
                    })?.length,

                    lastSevenDays: res?.filter(item => {
                        const range = getDateRange("last7days");
                        return item?.createdAt >= range.start && item?.createdAt <= range.end
                    })?.length,

                    lastMonth: res?.filter(item => {
                        const range = getDateRange("lastMonth");
                        return item?.createdAt >= range.start && item?.createdAt <= range.end
                    })?.length
                })
            }

        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAllBookings()
    }, [])

    const data = [
        { range: 'Today', value: chartData?.today },
        { range: 'Yesterday', value: chartData?.yesterday },
        { range: 'Past 7 Days', value: chartData?.lastSevenDays },
        { range: 'Past 1 Month', value: chartData?.lastMonth },
    ];


    // Define base colors (add one more color for 4 categories)
    const BASE_COLORS = useMemo(() => [
        "oklch(0.627 0.194 149.214)",
        "oklch(0.45 0.085 224.283)",
        "#d61828",
        "#00C49F"  // Added a new color
    ], []);

    // Shuffle function
    const shuffleColors = (colors) => {
        const shuffled = [...colors];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        // Shuffle colors whenever chart data updates
        setChartColors(shuffleColors(BASE_COLORS));
    }, [chartData, BASE_COLORS]);

    return (
        <div className="w-full h-[400px] bg-white rounded-xl p-4 pb-12">
            <h2 className="text-xl font-semibold mb-4">Bookings Received</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value) => [value, 'Bookings']}
                        labelFormatter={(label) => `Period: ${label}`}
                    />
                    <Bar dataKey="value">
                        {data?.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={chartColors[index % chartColors.length]}  // Change here
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ConfirmationStatusChart;
