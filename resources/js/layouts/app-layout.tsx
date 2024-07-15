import React, { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui";
import { Navbar } from "@/components/navbar";

export default function AppLayout({
    children,
    header,
}: PropsWithChildren<{ header?: string }>) {
    return (
        <>
            <Toaster />
            <div className="min-h-screen">
                <Navbar />

                {header && (
                    <header className="bg-background border-b">
                        <h2 className="font-semibold container text-xl text-foreground leading-tight py-4">
                            {header}
                        </h2>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </>
    );
}
