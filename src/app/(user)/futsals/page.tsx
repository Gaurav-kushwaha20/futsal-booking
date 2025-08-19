"use client"
import React, { useState } from 'react'
import FutsalCard from '@/components/FutsalCard';
import { useGetDataQuery } from '@/service/api';
import useFutsals from './hooks/useFutsals';
// import useDisclosure from '@/lib/useDisclosure';
// import Modal from '@/components/Modal';

const Page = () => {
   // const createModal = useDisclosure()
   // const updateModal = useDisclosure()

   const { futsalList } = useFutsals();

   const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

   const { data } = useGetDataQuery(
      coords
         ? {
            url: "/futsal/get-all",
            params: {
               latitude: coords.lat,
               longitude: coords.lon,
               radius: 3,
            },
         }
         : { url: "/futsal/get-all" }
   );
   console.log(data)

   const handleGetRecommendations = () => {
      if (!("geolocation" in navigator)) {
         alert("Geolocation is not supported by this device");
         return;
      }
      navigator.geolocation.getCurrentPosition(
         (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("User lat and long:", latitude, longitude);
            setCoords({ lat: latitude, lon: longitude });
         },
         (error) => {
            console.error("Error fetching location", error);
            alert("Unable to fetch location. Please allow location access");
         }
      );
   };

   return (
      <div>
         <div className='grid grid-cols-3 gap-5'>
            {
               futsalList?.data?.data?.length > 0 && futsalList?.data?.data?.map((item, index) => (
                  <FutsalCard key={index} data={item} />
               ))
            }
            {/* <Modal isOpen >

            </Modal>
             */}
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