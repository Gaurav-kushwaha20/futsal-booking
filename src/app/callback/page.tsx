"use client"

import { useEffect } from "react";
import { userManager } from "@/lib/oidc-client";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    useEffect(() => {
        userManager.signinRedirectCallback().then(user => {
            console.log("Logged in user:", user);
            router.push("/");
        });
    }, [router]);

    return <div>Logging in...</div>;
};

export default Page;
