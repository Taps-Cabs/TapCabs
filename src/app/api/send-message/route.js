import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
    try {

        const { campaign, destination, templateParams, paramsFallbackValue } = await req.json();
        // console.log(campaign, templateParams)

        const response = await axios.post('https://backend.aisensy.com/campaign/t1/api/v2',
            {
                apiKey: process.env.WHATSAPP_API_KEY,
                campaignName: campaign, // Can be any name
                destination: destination, // e.g. "91XXXXXXXXXX"
                userName: "TAPS CABS", // from AiSensy
                templateParams,
                source: "new-landing-page form",
                media: {},
                buttons: [],
                carouselCards: [],
                location: {},
                attributes: {},
                paramsFallbackValue,
            }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response)
            return NextResponse.json({
                success: false,
                message: 'Failed to Send vendor notification',
                error: error.message,
            }, { status: 404 });

        return NextResponse.json({
            success: true,
            message: 'Vendor Notification sent Successfully',
            data: { data: response?.data },
        }, { status: 201 });

    } catch (error) {
        console.error('Error Sending Vendor notification:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to sned vendor notification',
            error: error.message,
        }, { status: 500 });
    }
}