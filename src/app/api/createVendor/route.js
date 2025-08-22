import { NextResponse } from 'next/server';
import admin from '../../../lib/firebase/firebase-admin';
import { ROLE } from '@/lib/constants/constants';
import { Resend } from 'resend';

const db = admin.firestore();
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
    try {
        const { email, phoneNo, password, name, city, location } = await req.json();

        if (!email || !phoneNo || !password || !name || !city || !location) {
            // return res.status(400).json({ message: 'Missing required fields' });
            return NextResponse.json({
                success: false,
                message: 'Missing required fields',
            }, { status: 400 });
        }

        // Create a new user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            phoneNo,
            password,
            name,
            role: ROLE.VENDOR
        });
        console.log("New auth User", userRecord);

        // Set custom claims to make the user an admin
        await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' });

        // Store admin details in Firestore
        const newUser = await db.collection('Users').doc(userRecord.uid).set({
            id: userRecord.uid,
            email,
            phoneNo,
            name,
            role: ROLE.VENDOR,
            city,
            location,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log("New db User", newUser);

        // const mailResponse = await mailSender(
        //     newUser?.email,
        //     'Vendor Account Created',
        //     `
        //         <h3>Hi ${newUser?.name}</h3>
        //         <p>A Vendor account has been created. Find your account credentials below:</p>
        //         <p>Email: ${newUser?.email}</p>
        //         <p>Password: ${password}</p>
        //     `
        // );
        // console.log("Email", mailResponse);

        // if (!mailResponse) {
        //     return NextResponse.json({
        //         success: false,
        //         message: 'Failed to Send email to vendor',
        //         error: error.message,
        //     }, { status: 500 });
        // }

        return NextResponse.json({
            success: true,
            message: 'Vendor created successfully',
            data: { userId: userRecord?.uid },
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating Vendor:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to create vendor',
            error: error.message,
        }, { status: 500 });
    }
}
