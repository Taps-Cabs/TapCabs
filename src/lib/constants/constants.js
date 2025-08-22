export const VENDORS = [
    {
        name: "Vendor 1",
        contactNo: "87589665696",
        email: "vendor1@gmail.com",
        address: "ABC Colony, Delhi",
        cabs: [
            {
                vehicleName: "Verna",
                vehicleType: "Sedan",
                driverName: "Harjeet Singh",
                driverContact: "8965896589",
                driverEmail: "harjeetsingh@gmail.com",
            },
            {
                vehicleName: "Swift",
                vehicleType: "Hatchback",
                driverName: "Rajeev Kumar",
                driverContact: "7865123456",
                driverEmail: "rajeevk@gmail.com",
            },
        ],
    },
    {
        name: "Vendor 2",
        contactNo: "9856231458",
        email: "vendor2@gmail.com",
        address: "MG Road, Gurugram",
        cabs: [
            {
                vehicleName: "Innova Crysta",
                vehicleType: "SUV",
                driverName: "Aman Tiwari",
                driverContact: "9988776655",
                driverEmail: "amant@gmail.com",
            },
            {
                vehicleName: "Dzire",
                vehicleType: "Sedan",
                driverName: "Suresh Pal",
                driverContact: "9876543210",
                driverEmail: "sureshp@gmail.com",
            },
        ],
    },
    {
        name: "Vendor 3",
        contactNo: "7896541230",
        email: "vendor3@gmail.com",
        address: "Rajendra Nagar, Ghaziabad",
        cabs: [
            {
                vehicleName: "XUV500",
                vehicleType: "SUV",
                driverName: "Vinod Mehra",
                driverContact: "9801234567",
                driverEmail: "vinodm@gmail.com",
            },
            {
                vehicleName: "Etios",
                vehicleType: "Sedan",
                driverName: "Naresh Kumar",
                driverContact: "9874501236",
                driverEmail: "nareshk@gmail.com",
            },
        ],
    },
    {
        name: "Vendor 4",
        contactNo: "8076543210",
        email: "vendor4@gmail.com",
        address: "Sector 22, Noida",
        cabs: [
            {
                vehicleName: "Ertiga",
                vehicleType: "MUV",
                driverName: "Deepak Yadav",
                driverContact: "9123456789",
                driverEmail: "deepaky@gmail.com",
            },
            {
                vehicleName: "Brezza",
                vehicleType: "SUV",
                driverName: "Ravi Shankar",
                driverContact: "9090909090",
                driverEmail: "ravis@gmail.com",
            },
        ],
    },
    {
        name: "Vendor 5",
        contactNo: "8123456789",
        email: "vendor5@gmail.com",
        address: "Vikas Puri, Delhi",
        cabs: [
            {
                vehicleName: "Ciaz",
                vehicleType: "Sedan",
                driverName: "Pankaj Sharma",
                driverContact: "8787878787",
                driverEmail: "pankajs@gmail.com",
            },
            {
                vehicleName: "Alto",
                vehicleType: "Hatchback",
                driverName: "Ramesh Kumar",
                driverContact: "8585858585",
                driverEmail: "rameshk@gmail.com",
            },
        ],
    },
    {
        name: "Vendor 6",
        contactNo: "7012345678",
        email: "vendor6@gmail.com",
        address: "Laxmi Nagar, Delhi",
        cabs: [
            {
                vehicleName: "Scorpio",
                vehicleType: "SUV",
                driverName: "Manoj Verma",
                driverContact: "7878787878",
                driverEmail: "manojv@gmail.com",
            },
            {
                vehicleName: "WagonR",
                vehicleType: "Hatchback",
                driverName: "Ashok Rana",
                driverContact: "7676767676",
                driverEmail: "ashokr@gmail.com",
            },
        ],
    },
];

export const LOCAL_TRIPS = [
    {
        city: "Delhi",
        cabType: "Sedan",
        hours: "4",
        kms: "40",
        price: "1200",
        cabs: [
            {
                vehicleName: "Verna",
                vehicleType: "Sedan",
                driverName: "Harjeet Singh",
                driverContact: "8965896589",
                driverEmail: "harjeetsingh@gmail.com",
            },
            {
                vehicleName: "Swift",
                vehicleType: "Hatchback",
                driverName: "Rajeev Kumar",
                driverContact: "7865123456",
                driverEmail: "rajeevk@gmail.com",
            },
        ],
    },
    {
        city: "Delhi",
        cabType: "Sedan",
        hours: "8",
        kms: "80",
        price: "2400",
        cabs: [
            {
                vehicleName: "Verna",
                vehicleType: "Sedan",
                driverName: "Harjeet Singh",
                driverContact: "8965896589",
                driverEmail: "harjeetsingh@gmail.com",
            },
            {
                vehicleName: "Swift",
                vehicleType: "Hatchback",
                driverName: "Rajeev Kumar",
                driverContact: "7865123456",
                driverEmail: "rajeevk@gmail.com",
            },
        ],
    },
    {
        city: "Delhi",
        cabType: "Sedan",
        hours: "12",
        kms: "120",
        price: "5200",
        cabs: [
            {
                vehicleName: "Verna",
                vehicleType: "Sedan",
                driverName: "Harjeet Singh",
                driverContact: "8965896589",
                driverEmail: "harjeetsingh@gmail.com",
            },
            {
                vehicleName: "Swift",
                vehicleType: "Hatchback",
                driverName: "Rajeev Kumar",
                driverContact: "7865123456",
                driverEmail: "rajeevk@gmail.com",
            },
        ],
    },
]

export const BOOKINGS_LIST = [
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

export const cities = [
    "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai",
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat",
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane",
    "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ludhiana"
];

export const ROLE = {
    ADMIN: 'admin',
    VENDOR: 'vendor',
    CUSTOMER: 'user',
}

export const TRIP_TYPES = {
    oneWay: "One Way",
    roundTrip: "Round Trip",
    local: "Local",
    airport: "Airport",
}

export const TRIP_STATUS = {
    started: "Started",
    notStarted: "Not Started",
    completed: "Completed"
}