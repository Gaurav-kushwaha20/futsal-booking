import React from 'react'
import { useUpdateTimeSlot } from '../hooks/useUpdateTImeSlot'
import { FormikProvider } from 'formik'
import TimeSlotForm from '../component/TimeSlotForm'
import { Loader } from 'lucide-react'
import LoadingScreen from '@/components/LoadingScreen'

interface IProps {
    futsalId: string;
    closeModal?: () => void;
}
const UpdateTImeSlotModal = ({ futsalId, closeModal }: IProps) => {
    const { formik, isLoading, isInitialDataLoading } = useUpdateTimeSlot({ futsalId, closeModal })
    if (isInitialDataLoading) return <LoadingScreen />
    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <TimeSlotForm />
                <div className='w-full'>
                    <button disabled={isLoading} type='submit' className='block w-full mx-auto py-2.5 text-white bg-green-500 rounded-xl'>
                        Submit
                        {isLoading && <Loader />}
                    </button>
                </div>
            </form>
        </FormikProvider>
    )
}

export default UpdateTImeSlotModal