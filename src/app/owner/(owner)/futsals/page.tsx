"use client"
import React from 'react'
import FutsalList from './partials/FutsalList'
import Modal from '@/components/Modal'
import useDisclosure from '@/lib/useDisclosure'
import CreateFutsalModal from './modal/CreateFutsalModal'
import useStringState from '@/lib/useStringState'
import UpdateFutsalModal from './modal/UpdateFutsalModal'

const OwnerFutsal: React.FC = () => {
   const createModal = useDisclosure()
   const updateModal = useDisclosure()
   const updateId = useStringState("")
   const handleUpdateClick = (futsalId: string) => {
      updateModal.toggle()
      updateId.setValue(futsalId)
   }
   return (
      <div>
         <div className='my-4 flex items-center justify-between'>
            <p className='text-lg font-medium text-gray-700'>Futsals</p>
            <button onClick={createModal.toggle} className='px-5 py-2 rounded-xl text-white bg-green-400 cursor-pointer'>Create</button>
         </div>
         <FutsalList handleUpdateClick={handleUpdateClick} />

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