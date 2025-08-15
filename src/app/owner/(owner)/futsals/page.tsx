"use client"
import React from 'react'
import FutsalList from './partials/FutsalList'
import Modal from '@/components/Modal'
import useDisclosure from '@/lib/useDisclosure'
import CreateFutsalModal from './modal/CreateFutsalModal'

const page: React.FC = () => {
   const createModal = useDisclosure()
   return (
      <div>
         <div className='my-4 flex items-center justify-between'>
            <p className='text-lg font-medium text-gray-700'>Futsals</p>
            <button onClick={createModal.toggle} className='px-5 py-2 rounded-xl text-white bg-green-400 cursor-pointer'>Create</button>
         </div>
         <FutsalList />

         {/* Create Futsal */}
         <Modal isOpen={createModal.isOpen} name='Create Futsal' onOpenChange={createModal.toggle} className=''>
            <CreateFutsalModal />
         </Modal>
      </div>
   )
}

export default page