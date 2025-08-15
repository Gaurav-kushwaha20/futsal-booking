"use client"
import React from 'react'
import { useGetFutsal } from '../hooks/useGetFutsal';
import OwnerFutsalCard from '@/components/OwnerFutsalCard';

const FutsalList = () => {
   const { data } = useGetFutsal();
   return (
      <div className='grid grid-cols-3 gap-x-6'>
         {data?.data?.data?.map((item, index) => (
            <div key={index}>
               <OwnerFutsalCard data={item} />
            </div>
         ))}
      </div>
   )
}

export default FutsalList