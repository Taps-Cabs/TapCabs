"use client"
import { PostCard } from './PostCard';
import { useEffect, useState } from 'react';
import PostCardSkeleton from './PostCardSkeleton';
import { getAllBlogs } from '@/lib/firebase/blogs/blogs';

export default function BlogsList() {
    const [loading, setLoading] = useState(false)
    const [blogs, setBlogs] = useState(false)

    async function getBlogs() {
        setLoading(true)
        const res = await getAllBlogs();
        setBlogs(res)
        setLoading(false)
    }
    useEffect(() => {
        getBlogs();
    }, [])

    console.log(blogs)

    if (!loading && !blogs) {
        return (
            <div className="text-center text-lg text-gray-600 h-[50vh] flex items-center justify-center pb-20">
                <h3>Posts Not Available!</h3>
            </div>
        );
    }

    return (
        <section className="pb-28 pt-10 sm:pt-0 px-4">
            <div
                className="relative rounded-2xl w-full h-28 md:h-32 flex text-primary mb-1 items-center justify-center text-center "
            >
                <div className="relative px-1">
                    <h1 className="text-4xl md:text-5xl font-bold pb-2 ">Read our Blogs</h1>
                </div>
            </div>

            {loading
                && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <PostCardSkeleton
                            key={idx} />
                    ))}
                </div>
            }

            {blogs
                && <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {blogs.map((blog) => (
                            <PostCard blog={blog} key={blog.id} />
                        ))}
                    </div>
                </div>
            }


        </section >
    );
}
