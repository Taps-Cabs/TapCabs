"use client"
import { Button } from '@/components/ui/button'
import { CircleChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

function PageHeader({ heading }) {

    const router = useRouter()

    return (
        <header className="bg-primary py-5 text-white text-center flex items-center justify-between w-full px-4 lg:px-6">
            <h1 className="sm:text-3xl text-xl font-bold">{heading}</h1>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            // variant={'outline'}
                            className='text-white border border-transparent hover:border-white cursor-pointer'
                            onClick={() => router.back()}
                        >
                            <CircleChevronLeft className='inline-block' />
                            Go Back
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className={'shadow-lg'}>
                        <p>Go to last page</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </header>
    )
}

export default PageHeader
