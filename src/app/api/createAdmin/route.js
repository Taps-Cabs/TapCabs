import { NextResponse } from 'next/server';
import admin from '../../../lib/firebase/firebase-admin';
import { ROLE } from '@/lib/constants/constants';

const db = admin.firestore();

export async function POST(req) {
    try {
        const { email, phoneNo, password, name } = await req.json();

        if (!email || !phoneNo || !password || !name) {
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
            role: ROLE.ADMIN
        });

        // Set custom claims to make the user an admin
        await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' });

        // Store admin details in Firestore
        await db.collection('Users').doc(userRecord.uid).set({
            email,
            phoneNo,
            name,
            role: ROLE.ADMIN,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return NextResponse.json({
            success: true,
            message: 'Admin created successfully',
            uid: userRecord.uid,
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating admin:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to create admin',
            error: error.message,
        }, { status: 500 });
    }
}
