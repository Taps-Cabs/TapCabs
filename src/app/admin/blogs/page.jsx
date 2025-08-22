"use client"

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import BlogListView from './components/BlogListView'
import { getAllBlogs } from '@/lib/firebase/blogs/blogs'

function page() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [blogs, setBlogs] = useState(null)

    async function fetchCategories() {
        setLoading(true)
        try {
            const res = await getAllBlogs()
            setBlogs(res)
        } catch (error) {
            setError(error)
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <div>
            <InnerLayout heading={'Manage Blogs'}>
                <div className="flex justify-between w-full items-center gap-3">
                    <Link href={'/admin/blogs/categories'}>
                        <Button variant={'outline'}>View Categories</Button>
                    </Link>
                    <Link href={'/admin/blogs/form'}>
                        <Button>Add Blog</Button>
                    </Link>
                </div>

                <div className="mt-3">
                    <BlogListView blogs={blogs} loading={loading} error={error} />
                </div>
            </InnerLayout>
        </div>
    )
}

export default page
