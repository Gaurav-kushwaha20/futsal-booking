"use client"
import React, { useState } from 'react'
import FutsalCard from '@/components/FutsalCard';
import useFutsals from './hooks/useFutsals';
import LoadingScreen from '@/components/LoadingScreen';
import { useBooking } from './hooks/useBooking';
import Modal from '@/components/Modal';
import BookingModal from './modal/BookingModal';

const Page = () => {
   const { futsalList, handleGetRecommendations, isLoading: isGetFutsalsLoading } = useFutsals();
   const { handleBook, timeSlotList, formik, bookingModalState } = useBooking()
   if (isGetFutsalsLoading) return <LoadingScreen />
   return (
      <div>
         <div className='grid grid-cols-3 gap-5'>
            {
               futsalList?.data?.data?.length > 0 && futsalList?.data?.data?.map((item, index) => (
                  <FutsalCard key={index} data={item} handleBookNow={handleBook} />
               ))
            }

            <div className="fixed bottom-0 left-0 w-full px-5 pb-5">
               <button onClick={handleGetRecommendations} className="w-full bg-blue-600 text-white py-4 rounded-xl shadow-lg text-lg font-semibold">
                  Get Recommended Futsals
               </button>
            </div>
         </div>
         {/* Booking Modal */}
         <Modal isOpen={bookingModalState?.isOpen} name='Book Futsal' onOpenChange={bookingModalState?.close}>
            <BookingModal formik={formik} timeSlotList={timeSlotList} />
         </Modal>
      </div>
   )

}

export default Page