import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request) {
    try {
        const { sessionId, otp } = await request.json()

        // const apiKey = process.env.TWOFAC_API_KEY
        const verifyResponse = await axios.get(
            `https://2factor.in/API/V1/84433d92-321e-11f0-8b17-0200cd936042/SMS/VERIFY/${sessionId}/${otp}`
        )

        if (verifyResponse.data.Details === 'OTP Matched') {
            return NextResponse.json({ success: true })
        } else {
            return NextResponse.json({ success: false })
        }
    } catch (error) {
        console.error('Error verifying OTP:', error.message)
        return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })
    }
}
