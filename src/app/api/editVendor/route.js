import { NextResponse } from 'next/server';
import admin from '../../../lib/firebase/firebase-admin';

const db = admin.firestore();
export async function PUT(req) {
    try {
        const { id, email, phoneNo, name, city, location } = await req.json();

        if (!id || !email || !phoneNo || !name || !city || !location) {
            return NextResponse.json({
                success: false,
                message: 'Missing required fields',
            }, { status: 400 });
        }

        // Update user in Firebase Auth
        await admin.auth().updateUser(id, {
            email,
            phoneNo,
            name,
        });

        // Update Firestore record
        await db.collection('Users').doc(id).update({
            email,
            phoneNo,
            name,
            city,
            location,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return NextResponse.json({
            success: true,
            message: 'Vendor updated successfully',
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating vendor:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to update vendor',
            error: error.message,
        }, { status: 500 });
    }
}
