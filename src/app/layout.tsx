import './globals.css';
import Providers from "@/components/providers/Provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Futsal Booking System",
  description: "Book you futsal cort",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body>
        <div className="max-w-[120rem] mx-auto">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
