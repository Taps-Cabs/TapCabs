import React from 'react'
import BlogData from '../components/BlogData';
import { getBlog } from '@/lib/firebase/blogs/blogs';
import Navbar from '@/components/main/navbar/Navbar';
import Footer from '@/components/main/Footer';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getBlog(slug);

    return {
        title: post?.title,
        openGraph: {
            images: [post?.imageURL?.imageURL],
        },
    }
}

export default async function page({ params }) {
    const { slug } = await params;
    const post = await getBlog(slug);

    // console.log(post)

    return (
        <div className="">
            <div className="sticky w-full top-0 z-[100]">
                <Navbar />
            </div>
            <main className="flex flex-col lg:flex-row justify-center mt-6">
                <BlogData post={post} />
            </main>
            <Footer />
        </div>
    )
}