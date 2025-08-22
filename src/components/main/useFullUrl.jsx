'use client'

import { usePathname, useSearchParams } from 'next/navigation'

export function useFullUrl() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const fullUrl = `${pathname}?${searchParams?.toString()}`
    return fullUrl
}
