"use client"
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <nav className="bg-white shadow-md sticky top-0 left-0 right-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
               {/* Logo */}
               <Link href="/" className="text-xl font-bold text-primary">
                  FutsalBooking
               </Link>

               {/* Desktop Menu */}
               <div className="hidden md:flex space-x-8">
                  <Link href="/" className="text-gray-700 hover:text-primary transition font-medium">
                     Home
                  </Link>
                  <Link href="/futsals" className="text-gray-700 hover:text-primary transition font-medium">
                     Futsals
                  </Link>
                  <Link href="/bookings" className="text-gray-700 hover:text-primary transition font-medium">
                     Bookings
                  </Link>
                  <Link href="/about" className="text-gray-700 hover:text-primary transition font-medium">
                     About
                  </Link>
               </div>

               {/* Mobile menu button */}
               <div className="md:hidden flex items-center">
                  <button onClick={() => setIsOpen(!isOpen)}>
                     {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile Menu */}
         {isOpen && (
            <div className="md:hidden bg-white shadow-md px-4 pb-4">
               <Link href="/" className="block py-2 text-gray-700 hover:text-primary font-medium">Home</Link>
               <Link href="/futsals" className="block py-2 text-gray-700 hover:text-primary font-medium">Futsals</Link>
               <Link href="/bookings" className="block py-2 text-gray-700 hover:text-primary font-medium">Bookings</Link>
               <Link href="/about" className="block py-2 text-gray-700 hover:text-primary font-medium">About</Link>
            </div>
         )}
      </nav>
   );
};

export default Navbar;
