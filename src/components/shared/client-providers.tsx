'use client'

import useCartSidebar from "@/hooks/use-cart-sidebar"
import React from "react"
import CartSideBar from "./cart-sidebar"

import { Toaster } from "sonner"

export default function ClientProviders({
    children
}: {
    children: React.ReactNode
}) {
    const isCartSidebarOpen = useCartSidebar()

    return (
        <>
        {isCartSidebarOpen ? (
            <div className="flex min-h-screen">
                <div className="flex-1 overflow-hidden">{children}</div>
                <CartSideBar />
            </div>
        ): (
            <div>{children}</div>
        )}
        <Toaster />
        </>
    )
}