"use client"
import React from 'react'
import { useFutsal } from '../hooks/useFutsal';

const FutsalList = () => {
   const { data } = useFutsal();
   return (
      <div>
         {data?.data?.data?.map((item, index) => (
            <div key={index}>
               {item?.name}
            </div>
         ))}
      </div>
   )
}

export default FutsalList