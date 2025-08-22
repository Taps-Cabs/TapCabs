// app/api/verify-payment/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createNewBooking } from '@/lib/firebase/admin/booking';

export async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch (e) {
        console.error('[verify-payment] invalid JSON:', e);
        return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
    }

    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        bookingData,
        isFullPayment,
    } = body;

    const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    if (generatedSignature !== razorpay_signature) {
        console.error('[verify-payment] ❌ signature mismatch');
        return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
    }

    try {
        const finalBookingData = {
            ...bookingData,
            payment: {
                paymentId: razorpay_payment_id,
                amount: isFullPayment ? bookingData.totalAmount : bookingData.bookingAmount,
                status: isFullPayment ? 'completed' : "pending",
                isFullPayment,
                timestamp: new Date().toISOString(),
            },
            status: {
                trip: 'not started',
                booking: 'accepted',
                vendor: 'not assigned',
                driver: 'not assigned',
            },
        }

        const bookingResult = await createNewBooking({ data: finalBookingData });

        ; return NextResponse.json(
            { success: true, bookingId: bookingResult.data, updatedBookingData: bookingResult.bookingData },
            { status: 200 }
        );
    } catch (err) {
        console.error('[verify-payment] createNewBooking error:', err);
        return NextResponse.json(
            { success: false, error: err.message || 'Unknown error' },
            { status: 500 }
        );
    }
}
