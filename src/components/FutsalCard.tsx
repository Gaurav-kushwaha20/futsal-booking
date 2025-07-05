'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { IFutsal } from '@/app/owner/(owner)/futsals/interface/IGetFutsals';

interface IProjectCardProps {
   data: IFutsal;
   className?: string;
   setCompareProject?: React.Dispatch<React.SetStateAction<string>>;
}

export const FutsalCard: React.FC<IProjectCardProps> = ({
   data,
   className,
}) => {
   if (!data) return null;
   return (
      <div className={`pt-4 ${className}`}>
         <div className="bg-blue-50 hover:shadow-[0px_4px_27.5px_5px_rgba(181,222,255,0.44)] pb-4 rounded-[6px] hover:outline-1 hover:outline-black-100 transition-shadow duration-300 ease-in-out">
            {/* Image Section */}

            <div className="relative aspect-[400/235] overflow-hidden">
               <Image
                  alt={data?.converImage}
                  src={data?.converImage}
                  width={400}
                  height={300}
                  className="rounded-[6px] w-full h-full"
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
                        Full Name:
                     </span>
                     <span className="text-blue-400 typography-p2-semibold">
                        {data?.owner?.fullName || data?.owner?.fullName}
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
               <div className="flex justify-between items-center gap-2 mt-3 min-w-max">
                  {/* Book Now Button */}

                  <Link href={`https://wa.me/${data?.owner?.phone_no}`} className="flex-1">
                     <button className="flex justify-center items-center gap-1 bg-blue-400 p-1 2xl:p-2.5 rounded-[6px] w-full cursor-pointer">
                        <span className="text-white whitespace-nowrap typography-btn">
                           Book Now
                        </span>
                        {/* Whatsapp Icon */}
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="23"
                           height="22"
                           viewBox="0 0 23 22"
                           fill="none"
                        >
                           <path
                              d="M11.5734 3.6797C10.1631 3.6779 8.77798 4.02415 7.56125 4.68263C6.34452 5.3411 5.34041 6.28788 4.65281 7.425C3.96522 8.56211 3.61912 9.84826 3.65033 11.1504C3.68153 12.4525 4.08892 13.7232 4.83032 14.8311L3.59375 18.3177L8.19023 17.6098C9.26468 18.0811 10.4402 18.3231 11.6297 18.3176C12.8192 18.3122 13.9921 18.0595 15.0615 17.5784C16.1308 17.0972 17.0692 16.3999 17.8069 15.5382C18.5447 14.6765 19.063 13.6724 19.3233 12.6005C19.5836 11.5286 19.5794 10.4163 19.3108 9.34613C19.0422 8.27594 18.5162 7.27532 17.7718 6.41847C17.0274 5.56161 16.0837 4.87051 15.0107 4.3964C13.9377 3.92228 12.7629 3.67733 11.5734 3.6797Z"
                              fill="#26CC64"
                           />
                           <path
                              d="M3.50865 18.5624C3.46533 18.5623 3.42263 18.5529 3.38404 18.5348C3.34546 18.5167 3.31209 18.4905 3.28665 18.4583C3.26122 18.4261 3.24445 18.3888 3.23771 18.3495C3.23098 18.3102 3.23447 18.27 3.2479 18.2321L4.4501 14.8593C3.52272 13.424 3.13834 11.7474 3.35687 10.0905C3.57539 8.4337 4.38454 6.88979 5.65823 5.69941C6.93191 4.50903 8.59858 3.73903 10.3985 3.50942C12.1984 3.27981 14.0305 3.60348 15.6092 4.42999C17.1879 5.25651 18.4246 6.53943 19.1265 8.07884C19.8285 9.61825 19.9562 11.3277 19.4898 12.9407C19.0235 14.5538 17.9892 15.9798 16.5483 16.9967C15.1073 18.0135 13.3405 18.564 11.5233 18.5624C10.3381 18.5619 9.16725 18.324 8.09238 17.8654L3.56354 18.5586C3.54545 18.5617 3.52704 18.5629 3.50865 18.5624ZM8.12532 17.3511C8.16621 17.3513 8.20654 17.3599 8.24334 17.3763C9.2677 17.8252 10.3883 18.0582 11.5233 18.0582C13.2297 18.0621 14.8892 17.5456 16.2414 16.5898C17.5937 15.634 18.5622 14.293 18.995 12.7771C19.4278 11.2612 19.3004 9.65628 18.6329 8.21406C17.9653 6.77183 16.7953 5.57394 15.3065 4.80831C13.8176 4.04269 12.0941 3.75267 10.4064 3.98374C8.71872 4.21481 7.16229 4.95391 5.98132 6.08507C4.80035 7.21622 4.06166 8.67544 3.88115 10.2338C3.70065 11.7921 4.08853 13.3614 4.98395 14.6954C5.00489 14.7266 5.0182 14.7616 5.02294 14.7979C5.02768 14.8343 5.02374 14.8711 5.0114 14.9059L3.9135 17.9927L8.08278 17.3549C8.09682 17.3525 8.11105 17.3513 8.12532 17.3511Z"
                              fill="#26CC64"
                           />
                           <path
                              d="M6.82814 8.59821C6.82637 10.4177 7.60063 12.1634 8.98076 13.4517C10.3609 14.74 12.234 15.4655 14.1885 15.4688H14.4295C14.6931 15.455 14.9505 15.3887 15.1843 15.2744C15.4181 15.1601 15.6228 15.0005 15.7846 14.8062C15.9465 14.612 16.0616 14.3877 16.1224 14.1484C16.1831 13.9092 16.188 13.6606 16.1367 13.4195C16.1132 13.3077 16.0775 13.1985 16.0302 13.0934L12.9406 12.6347C12.7118 12.8825 12.5643 13.1863 12.5158 13.51C11.6979 13.2649 10.9523 12.8461 10.338 12.2867C9.72367 11.7273 9.25747 11.0426 8.97618 10.2867C9.31309 10.2358 9.62808 10.0984 9.88573 9.89L9.39966 7.02377C9.26409 6.96516 9.1208 6.92348 8.97351 6.89979C8.87282 6.88333 8.77078 6.87504 8.66855 6.875C8.42607 6.87532 8.18603 6.92019 7.96221 7.00703C7.73838 7.09386 7.53516 7.22096 7.36419 7.38104C7.19323 7.54112 7.05787 7.73104 6.96588 7.9399C6.8739 8.14877 6.82709 8.37248 6.82814 8.59821Z"
                              fill="white"
                           />
                        </svg>
                     </button>
                  </Link>

               </div>
            </div>
         </div>
      </div>
   );
};

export default FutsalCard;
