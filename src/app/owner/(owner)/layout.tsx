"use client"
import Sidebar from "@/common/sidebar/SideBar";
import { useState } from "react";
import Header from "@/common/header/Header";
import { useRouter } from "next/navigation";
import OwnerLoginModal from "@/components/modal/OwnerLoginModal";

export default function UserLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const router = useRouter()
   const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
   return (
      <div className="flex flex-col h-screen bg-gray-100">
         <Header toggleSidebar={toggleSidebar} />
         <div className="flex flex-1 overflow-hidden">
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <main className="flex-1 overflow-auto p-6 bg-white shadow-md rounded-t-xl">
               <div className="max-w-full mx-auto">
                  {children}
                  <OwnerLoginModal />
               </div>
            </main>
         </div>
      </div>

   );
}
