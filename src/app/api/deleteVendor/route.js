import { NextResponse } from 'next/server';
import admin from '../../../lib/firebase/firebase-admin';

const db = admin.firestore();
export async function POST(req) {
  try {
    const { id } = await req.json();

    console.log("userId", id);
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Vendor ID is required',
      }, { status: 400 });
    }

    // Delete user from Firebase Auth
    await admin.auth().deleteUser(id);

    // Delete user from Firestore
    await db.collection('Users').doc(id).delete();

    return NextResponse.json({
      success: true,
      message: 'Vendor deleted successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('Error deleting vendor:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete vendor',
      error: error.message,
    }, { status: 500 });
  }
}