import React from 'react'
import BlogsList from './components/BlogsList'
import Navbar from '@/components/main/navbar/Navbar'
import Footer from '@/components/main/Footer'

export default function page() {
    return (
        <div className='bg-gray-100'>
            <div className='sticky top-0 w-screen z-[100]'>
                <Navbar />
            </div>

            <BlogsList />

            <Footer />
        </div>
    )
}
