"use client"
import React from 'react'
import { useGetFutsal } from '../hooks/useGetFutsal';
import OwnerFutsalCard from '@/components/OwnerFutsalCard';

interface IProps {
   handleUpdateClick?: (futsalId: string) => void;
   handleViewClick?: (futsalId: string) => void;
   handleClickDelete?: (futsalId: string) => void;
}

const FutsalList: React.FC<IProps> = ({ handleUpdateClick, handleViewClick, handleClickDelete }) => {
   const { data } = useGetFutsal();
   return (
      <div className='grid grid-cols-3 gap-x-6'>
         {data?.data?.data?.map((item, index) => (
            <div key={index}>
               <OwnerFutsalCard data={item} onClickUpdate={handleUpdateClick} onClickView={handleViewClick} onClickDelete={handleClickDelete} />
            </div>
         ))}
      </div>
   )
}

export default FutsalList