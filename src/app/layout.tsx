import { Inter } from "next/font/google";
import './globals.css';
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/providers/Provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Futsal Booking System",
  description: "Book you futsal cort",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-[120rem] mx-auto">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
