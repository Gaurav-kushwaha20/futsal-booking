import React from 'react'
// import CreateFutsalForm from './partials/CreateFutsalForm'
import FutsalList from './partials/FutsalList'
import Link from 'next/link'
import { PATH } from '@/constant/PATH.constant'

const page: React.FC = () => {

   return (
      <div>
         <div className='my-4 flex items-center justify-between'>
            <p className='text-lg font-medium text-gray-700'>Futsals</p>
            <Link href={PATH.owner.createFutsal}>
               <button className='px-5 py-2 rounded-xl text-white bg-green-400'>Create</button>
            </Link>
         </div>
         <FutsalList />
         {/* <CreateFutsalForm /> */}
      </div>
   )
}

export default page