import { COOKIE_CONFIG } from '@/constant/cookie.constant'
import { getCookie } from '@/service/cookie'
import React from 'react'

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const access = getCookie(COOKIE_CONFIG.access);
    const refresh = getCookie(COOKIE_CONFIG.refresh);
    console.log("access ", access)
    console.log("refresh ", refresh)
    return (
        children
    )
}

export default ProtectedRoutes