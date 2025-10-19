// components/Providers.tsx
"use client";

import { ReduxProvider } from "@/components/ReduxProvider";
import ProtectedRoutes from "@/components/ProtectedRoutes";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <ProtectedRoutes>{children}</ProtectedRoutes>
        </ReduxProvider>
    );
}
