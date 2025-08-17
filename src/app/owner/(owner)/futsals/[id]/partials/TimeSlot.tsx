import React from 'react'
import { useGetTimeSlot } from '../hooks/useGetTimeSlot'
import LoadingScreen from '@/components/LoadingScreen';
import { Pencil, Plus, Trash } from 'lucide-react';
import Modal from '@/components/Modal';
import CreateTImeSlotModal from '../modal/CreateTImeSlotModal';
import useDisclosure from '@/lib/useDisclosure';
import UpdateTImeSlotModal from '../modal/UpdateTImeSlotModal';
import useStringState from '@/lib/useStringState';
import AlertModal from '@/components/AlertModal';
import { useDeleteTimeSlot } from '../hooks/useDeleteTimeSlot';

interface IProps {
    futsalId: string;
}

const TimeSlot: React.FC<IProps> = ({ futsalId }) => {
    const { timeSlotListResponse, isLoading } = useGetTimeSlot({ futsalId })
    const createTimeSlotState = useDisclosure()
    const updateTimeSlotState = useDisclosure()
    const updateTimeSlotId = useStringState("")
    const deleteTimeSlotId = useStringState("")
    const deleteTimeSlotState = useDisclosure()
    const { handleDelteTimeSlot, isLoading: isDeleteLoading } = useDeleteTimeSlot({ timeSlotId: deleteTimeSlotId.values })
    if (isLoading) return <LoadingScreen />
    return (
        <div>
            <div className='flex items-center justify-end'>
                <button
                    onClick={createTimeSlotState.open}
                    className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition duration-200">
                    <Plus size={18} />
                    Create
                </button>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {timeSlotListResponse?.data?.data?.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 rounded-2xl shadow-md border hover:shadow-lg transition duration-200 cursor-pointer bg-white space-y-4"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">
                                {item.startTime} - {item.endTime}
                            </span>
                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-600">
                                Rs. {item.price}
                            </span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className="mt-2 text-gray-600 text-sm">{item.futsalName}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <button
                                onClick={() => {
                                    updateTimeSlotId.setValue(item?.id.toString());
                                    updateTimeSlotState.open();
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-200 cursor-pointer">
                                <Pencil size={16} />
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    deleteTimeSlotState.open()
                                    deleteTimeSlotId.setValue(item?.id.toString())
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white font-medium shadow-md hover:bg-red-700 transition duration-200">
                                <Trash size={16} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Create Time Slot */}
            <Modal isOpen={createTimeSlotState.isOpen} name='Create Time Slot' onOpenChange={createTimeSlotState.toggle} className='max-w-xl'>
                <CreateTImeSlotModal futsalId={futsalId} closeModal={createTimeSlotState.close} />
            </Modal>

            {/* Update Time Slot */}
            <Modal isOpen={updateTimeSlotState.isOpen} name='Create Time Slot' onOpenChange={updateTimeSlotState.toggle} className='max-w-xl'>
                <UpdateTImeSlotModal futsalId={updateTimeSlotId.values} closeModal={updateTimeSlotState.close} />
            </Modal>

            {/* Delete Futsal */}
            <AlertModal isLoading={isDeleteLoading} isOpen={deleteTimeSlotState.isOpen} onClose={deleteTimeSlotState.close} onDelete={handleDelteTimeSlot} />
        </div>
    )
}

export default TimeSlot