"use client"
import React from 'react'
import FutsalList from './partials/FutsalList'
import Modal from '@/components/Modal'
import useDisclosure from '@/lib/useDisclosure'
import CreateFutsalModal from './modal/CreateFutsalModal'
import useStringState from '@/lib/useStringState'
import UpdateFutsalModal from './modal/UpdateFutsalModal'
import { useRouter } from 'next/navigation'

const OwnerFutsal: React.FC = () => {
   const createModal = useDisclosure()
   const updateModal = useDisclosure()
   const updateId = useStringState("")
   const router = useRouter();

   const handleUpdateClick = (futsalId: string) => {
      updateModal.toggle()
      updateId.setValue(futsalId)
   }
   const handleViewClick = (futsalId: string) => {
      router.push(`/owner/futsals/${futsalId}`)
   }
   const handleClickDelete = (futsalId: string) => {
      
      console.log("Deleted Id:", futsalId)
   }
   return (
      <div>
         <div className='my-4 flex items-center justify-between'>
            <p className='text-lg font-medium text-gray-700'>Futsals</p>
            <button onClick={createModal.toggle} className='px-5 py-2 rounded-xl text-white bg-green-400 cursor-pointer'>Create</button>
         </div>
         <FutsalList handleUpdateClick={handleUpdateClick} handleViewClick={handleViewClick} handleClickDelete={handleClickDelete} />

         {/* handleClickDelete is the name that futsalList is expecting and the {handleClickDelete is the function or handler that we are passing to perform certain operations} */}

         {/* Create Futsal */}
         <Modal isOpen={createModal.isOpen} name='Create Futsal' onOpenChange={createModal.toggle} className=''>
            <CreateFutsalModal />
         </Modal>

         {/* Update Futsal */}
         <Modal isOpen={updateModal.isOpen} name='Update Futsal' onOpenChange={updateModal.toggle} className=''>
            <UpdateFutsalModal closeModal={updateModal.close} futsalId={updateId.values} />
         </Modal>

      </div>
   )
}

export default OwnerFutsal