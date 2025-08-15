"use client"
import { COOKIE_CONFIG } from '@/constant/cookie.constant';
import { PATH } from '@/constant/PATH.constant';
import { getCookie } from '@/service/cookie';
import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react'

const RouteTest = () => {
   const params = useParams();

   useEffect(() => {
      const access = getCookie(COOKIE_CONFIG.access);
      const refresh = getCookie(COOKIE_CONFIG.refresh);
      if (!access || !refresh) {
         redirect(PATH.login);
      }
   }, [params]);
   return null
}

export default RouteTest