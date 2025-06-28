import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
   return (
      <div className="relative w-screen h-screen bg-cover bg-center bg-no-repeat">
         <div className="absolute h-full w-screen aspect-video -z-10 inset-0">
            <Image
               alt="hero section background image"
               src={"/hero/2.png"}
               width={1920}
               height={1080}
               className="w-full h-full object-cover sm:object-fill"
            />
         </div>

         {/* Heading  */}
         <div className="py-10 md:py-20">
            <p className="text-[#fff] max-w-3xl mx-auto text-center text-[3rem] 2xl:text-[4.5rem] font-semibold leading-[111.11%]">
               {"Kick. Play. Win. Your Game Starts Here"}
            </p>

            {/*  */}
            <div className="py-6 px-4 ">
               <p className="text-center typography-p1-medium text-[#fff]">
                  {"GoalPoint Arena"}
               </p>
            </div>

            <div className="flex justify-center">
               <Link
                  href={`https://wa.me/9828890052`}
               >
                  <button className="px-6 py-3 typography-h4-semi-bold text-blue-50 rounded-[0.75rem] bg-blue-400 border border-white cursor-pointer">
                     Book an Appointment
                  </button>
               </Link>
            </div>
         </div>

         {/* Bottom Gradient */}
         <div
            style={{
               backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.37) 19.94%, rgba(255, 255, 255, 0.78) 39.06%, rgba(255, 255, 255, 0.94) 65.28%, #FFF 88.54%)`,
            }}
            className="absolute bottom-0 w-full inset-x-0 h-40"
         />
      </div>
   )
}

export default HeroSection