import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request) {
    try {
        const { phone } = await request.json()

        if (!/^\d{10}$/.test(phone)) {
            return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
        }

        // const apiKey = process.env.TWOFAC_API_KEY
        const otpResponse = await axios.get(
            `https://2factor.in/API/V1/84433d92-321e-11f0-8b17-0200cd936042/SMS/${phone}/AUTOGEN`
        )

        return NextResponse.json({ sessionId: otpResponse.data.Details })
    } catch (error) {
        console.error('Error sending OTP:', error.message)
        return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
    }
}
