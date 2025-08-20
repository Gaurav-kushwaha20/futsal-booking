'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { IFutsal } from '@/app/owner/(owner)/futsals/interface/IGetFutsals';

interface IProjectCardProps {
   data: IFutsal;
   className?: string;
   setCompareProject?: React.Dispatch<React.SetStateAction<string>>;
   onClickView?: (futsalId: string) => void
   onClickUpdate?: (futsalId: string) => void
   onClickDelete?: (futsalId: string) => void
}

export const OwnerFutsalCard: React.FC<IProjectCardProps> = ({
   data,
   className,
   onClickUpdate,
   onClickView,
   onClickDelete
}) => {
   if (!data) return null;
   return (
      <div className={`pt-4 ${className}`}>
         <div className="bg-blue-50 hover:shadow-[0px_4px_27.5px_5px_rgba(181,222,255,0.44)] pb-4 rounded-[6px] hover:outline-1 hover:outline-black-100 transition-shadow duration-300 ease-in-out">
            {/* Image Section */}

            <div className="relative aspect-[400/235] overflow-hidden">
               <Image
                  alt={data?.coverImage}
                  src={data?.coverImage}
                  width={400}
                  height={300}
                  loading='eager'
                  priority={true}
                  className="rounded-[6px] w-full h-full object-cover"
               />
               <span className="top-3 md:top-5 left-3 md:left-5 absolute bg-blue-50 backdrop-blur-[4px] px-2.5 py-1 rounded-[6px] text-blue-500 typography-c1-semibold">
                  {data?.district}
               </span>
            </div>

            {/* Contect Section */}
            <div className="flex flex-col px-2.5 md:px-5">
               {/* Heading Part */}
               <Link href={`/projects/${"data.slug"}`}>
                  <div className="flex flex-col items-start gap-1 mt-4 mb-3">
                     <p className="text-blue-500 uppercase line-clamp-2 typography-p3-semi-bold">
                        {data?.name}
                     </p>
                     <p className="text-black-400 line-clamp-2 typography-h4-bold">
                        {data?.address}
                     </p>
                  </div>
               </Link>

               {/* Content Part */}
               <div className="flex flex-col gap-2 bg-background-50 p-2.5">
                  <div className="flex justify-between items-center">
                     <span className="text-black-300 typography-p2-regular">
                        Registration Number
                     </span>
                     <span className="text-blue-400 typography-p2-semibold">
                        {data?.registrationNumber}
                     </span>
                  </div>

                  <div className="flex justify-between items-center">
                     <span className="text-black-300 typography-p2-regular">
                        City
                     </span>
                     <span className="text-blue-400 typography-p2-semibold">
                        {data?.owner?.fullName}
                     </span>
                  </div>

                  <div className="flex justify-between items-center">
                     <span className="text-black-300 typography-p2-regular">
                        Phone No.
                     </span>
                     <span className="text-blue-400 typography-p2-semibold">
                        {data?.owner?.phone_no}
                     </span>
                  </div>

               </div>

               {/* Footer Part */}
               <div className="flex justify-between items-center gap-2 mt-3">
                  {/* Book Now Button */}
                  <button onClick={() => { onClickView?.(data?.id) }} className="flex justify-center items-center gap-1 bg-blue-400 p-1 2xl:p-2.5 rounded-[6px] w-full cursor-pointer text-white whitespace-nowrap typography-btn">
                     View
                  </button>
                  <button onClick={() => { onClickUpdate?.(data?.id) }} className="flex justify-center items-center gap-1 bg-green-400 p-1 2xl:p-2.5 rounded-[6px] w-full cursor-pointer">
                     <span className="text-white whitespace-nowrap typography-btn">
                        Edit
                     </span>
                  </button>
                  <button onClick={() => { onClickDelete?.(data?.id) }} className="flex justify-center items-center gap-1 bg-red-500 p-1 2xl:p-2.5 rounded-[6px] w-full cursor-pointer">
                     <span className="text-white whitespace-nowrap typography-btn">
                        Delete
                     </span>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default OwnerFutsalCard;
