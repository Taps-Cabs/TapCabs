"use client"

import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Login from './Login'
import Signup from './Signup'
import { useRouter, usePathname } from 'next/navigation'
import { useFullUrl } from './useFullUrl'
import { toast } from 'react-hot-toast';

export default function LoginDialog({ open, onOpenChange }) {
    const router = useRouter()
    const path = usePathname()

    const fullUrl = useFullUrl()

    // close + redirect back
    const handleSuccess = () => {
        onOpenChange(false)
        toast.success("Login Successful")
        router.push(fullUrl)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle></DialogTitle>
                <Tabs defaultValue="login" className="w-full mt-4">
                    <TabsList className="grid grid-cols-2 bg-blue-100 rounded-lg p-1 mb-4">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Signup</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <Login onSuccess={handleSuccess} onClose={() => onOpenChange(false)} />
                    </TabsContent>
                    <TabsContent value="signup">
                        <Signup onSuccess={handleSuccess} onClose={() => onOpenChange(false)} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
