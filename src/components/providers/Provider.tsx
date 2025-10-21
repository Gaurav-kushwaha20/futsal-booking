// components/Providers.tsx
"use client";

import { ReduxProvider } from "@/components/ReduxProvider";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ReduxProvider>
                <ProtectedRoutes>{children}</ProtectedRoutes>
            </ReduxProvider>
        </SessionProvider>
    );
}
