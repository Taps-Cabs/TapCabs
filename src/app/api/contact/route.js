import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
    try {
        const body = await request.json()

        // Validate required fields
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: 'orders.tapscabs@gmail.com',
            // to: 'maverickit123@gmail.com',
            subject: 'New Contact Form Submission',
            html: `
                <h3>New Message from ${body.name}</h3>
                <p>Email: ${body.email}</p>
                ${body.phoneNo ? `<p>Contact: ${body.phoneNo}</p>` : ''}
                <p>Message: ${body.message}</p>
            `,
        })

        if (error) {
            return NextResponse.json({ error }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}