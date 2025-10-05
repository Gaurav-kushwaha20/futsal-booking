"use client"

import { useEffect } from "react";
import { userManager } from "@/lib/oidc-client";
import { useRouter } from "next/navigation";
import { usePostDataMutation } from "@/service/api";
import { apiTags, endpoints } from "@/constant/endpoints.constant";

const Page = () => {
    const [createUser, { isLoading }] = usePostDataMutation()
    const router = useRouter();
    useEffect(() => {
        userManager.signinRedirectCallback().then(async user => {
            const response = await createUser({
                url: endpoints.auth.createUser,
                data: { keycloakId: user.profile.sub },
                invalidateTag: [apiTags.createUser]
            })
            console.log(user);
            router.replace("/",);
        });
    }, [router]);

    return <div>Logging in...</div>;
};

export default Page;
