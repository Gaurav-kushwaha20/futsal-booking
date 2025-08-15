"use client"
import React from 'react'
import { useGetFutsal } from '../hooks/useGetFutsal';
import OwnerFutsalCard from '@/components/OwnerFutsalCard';

interface IProps {
   handleUpdateClick?: (futsalId:string) => void;
}

const FutsalList: React.FC<IProps> = ({ handleUpdateClick }) => {
   const { data } = useGetFutsal();
   return (
      <div className='grid grid-cols-3 gap-x-6'>
         {data?.data?.data?.map((item, index) => (
            <div key={index}>
               <OwnerFutsalCard data={item} onClickUpdate={handleUpdateClick} />
            </div>
         ))}
      </div>
   )
}

export default FutsalList