import { FormikProvider } from 'formik'
import React from 'react'
import TimeSlotForm from '../component/TimeSlotForm'
import { useCreateTimeSlot } from '../hooks/useCreateTimeSlot'
import { Loader } from 'lucide-react'

interface IProps {
    futsalId: string
    closeModal?: () => void
}

const CreateTImeSlotModal = ({ futsalId, closeModal }: IProps) => {
    const { formik, isLoading } = useCreateTimeSlot({ futsalId, closeModal })
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

export default CreateTImeSlotModal