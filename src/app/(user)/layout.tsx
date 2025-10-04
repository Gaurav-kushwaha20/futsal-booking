"use client"
import Header from "@/common/header/Header";
import "../globals.css";

export default function UserLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="flex flex-col h-screen overflow-hidden">
         <Header
            navitems={[
               { label: "Home", link: "/" },
               { label: "Futsals", link: "/futsals" },
               { label: "Message", link: "/message" },
               { label: "About", link: "/about" },
               { label: "Bookings", link: "/bookings" },

            ]} />
         <div className="flex-1 flex overflow-hidden">
            <main className="flex-1 flex flex-col mt-3.5 overflow-hidden rounded-xl px-4 py-5">
               {children}
            </main>
         </div>
      </div>
   );
}
