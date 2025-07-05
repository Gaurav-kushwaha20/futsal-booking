"use client"
import Sidebar from "@/common/Sidebar";
import { useEffect, useState } from "react";
import Header from "@/common/header/Header";
import { COOKIE_CONFIG } from "@/constant/cookie.constant";
import { useRouter } from "next/navigation";
import { PATH } from "@/constant/PATH.constant";
import { getCookie } from "@/service/cookie";

export default function UserLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const router = useRouter()
   const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

   const isLoggedIn = getCookie(COOKIE_CONFIG.refresh)
   useEffect(() => {
      if (!isLoggedIn) {
         router.push(PATH.owner.login);
      }
   }, [isLoggedIn, router]);
   return (
      <div className="flex flex-col bg-[#F3F4F6] h-screen">
         <Header toggleSidebar={toggleSidebar} />
         <div className="flex flex-1 overflow-hidden">
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <main className="relative flex-1 -mt-8 -ml-4 pt-8 overflow-hidden">
               <div className="flex flex-col bg-white shadow-xl px-4 w-full h-full min-h-0 overflow-auto">
                  <div className="flex-1 shadow-inner p-4 rounded-t-xl">
                     <div className="mx-auto w-full max-w-full">
                        {children}
                     </div>
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
}
