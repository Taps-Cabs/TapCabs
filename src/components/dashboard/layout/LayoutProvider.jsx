'use client'

import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { IoClose } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import Image from 'next/image';

function LayoutProvider({ children, sidebarLinks }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main className='flex flex-col sm:flex-row h-screen'>

            <div className="flex p-5 justify-between items-center bg-white shadow-md gap-3 sm:hidden">
                <Image height={100} width={300} src="/logo.png" alt="logo" className="max-h-5 w-auto" />
                <div onClick={() => setSidebarOpen(prev => !prev)} className="cursor-pointer">
                    {sidebarOpen
                        ? <IoClose className="text-2xl ease-in-out transition-all duration-300 focus:rotate-90" />
                        : <FiMenu className="text-2xl" />
                    }
                </div>
            </div>

            <div className=''>
                <Sidebar isOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen} sidebarLinks={sidebarLinks} />
            </div>

            <div className='grow h-screen overflow-auto'>
                {children}
            </div>
        </main>
    )
}

export default LayoutProvider;
