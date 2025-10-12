"use client"
import React from 'react'
import HeroSection from './partials/HeroSection'
import { useSession } from 'next-auth/react'

const page = () => {
   return (
      <div className='max-w-full overflow-y-auto'>
         <HeroSection />
      </div>
   )
}

export default page