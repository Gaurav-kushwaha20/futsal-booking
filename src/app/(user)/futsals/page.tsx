"use client"
import React, { useState } from 'react'
import FutsalCard from '@/components/FutsalCard';
import useFutsals from './hooks/useFutsals';
import LoadingScreen from '@/components/LoadingScreen';

const Page = () => {
   const { futsalList, handleGetRecommendations, isLoading: isGetFutsalsLoading } = useFutsals();

   if (isGetFutsalsLoading) return <LoadingScreen />
   return (
      <div>
         <div className='grid grid-cols-3 gap-5'>
            {
               futsalList?.data?.data?.length > 0 && futsalList?.data?.data?.map((item, index) => (
                  <FutsalCard key={index} data={item} />
               ))
            }

            <div className="fixed bottom-0 left-0 w-full px-5 pb-5">
               <button onClick={handleGetRecommendations} className="w-full bg-blue-600 text-white py-4 rounded-xl shadow-lg text-lg font-semibold">
                  Get Recommended Futsals
               </button>
            </div>
         </div>
      </div>
   )

}

export default Page