"use client"
import React from 'react'
import useFutsals from './hooks/useFutsals'
import FutsalCard from '@/components/FutsalCard';

const Page = () => {
   const { futsalList } = useFutsals();
   console.log(futsalList)
   return (
      <div className='grid grid-cols-3 gap-5'>
         {
            futsalList?.data?.data?.length > 0 && futsalList?.data?.data?.map((item, index) => (
               <FutsalCard key={index} data={item} number='2' />

            ))
         }
      </div>
   )
}

export default Page