"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CategoryCard from './CategoryCard';
import { getCategory } from '@/lib/firebase/blogs/blogCategories';

export function PostCard({ blog }) {
    const [category, setCategory] = useState(false);

    async function getCategoryFullDetails() {
        const categoryDetail = await getCategory(blog?.categoryId);
        setCategory(categoryDetail);
    }

    useEffect(() => {
        getCategoryFullDetails();
    }, []);

    return (
        <Link href={`/blogs/${blog?.id}`}>
            <div className="flex flex-col gap-3 h-full p-4 rounded-lg border border-gray-300 hover:border-purple-400 bg-white shadow-sm hover:shadow-md transition duration-300">
                <div className="relative flex-1">
                    <img
                        className="h-48 w-full object-cover rounded-md"
                        src={blog?.imageURL?.imageURL || "/header2.jpg"}
                        alt={blog?.title}
                    />
                    <h1 className="font-bold mt-2 text-lg text-gray-800">{blog?.title}</h1>
                    <p className="text-gray-600 mt-2 text-sm">
                        {blog?.description?.substring(0, 100)}...
                    </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <CategoryCard category={category} />
                    <h5 className="text-xs text-gray-500">
                        {new Date(blog?.timestamp?.seconds * 1000).toLocaleDateString()}
                    </h5>
                </div>
            </div>
        </Link>
    );
}
