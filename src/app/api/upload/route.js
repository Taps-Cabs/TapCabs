import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json({ error: "Image is required" }, { status: 400 });
        }

        console.log("Received image data:", image.slice(0, 100));

        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "matchbest",
            resource_type: "auto",
        });

        console.log("Cloudinary Response:", uploadResponse);

        return NextResponse.json({ imageURL: uploadResponse.secure_url }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}