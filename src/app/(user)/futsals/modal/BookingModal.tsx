import InputDate from '@/components/form/InputDate'
import InputText from '@/components/form/InputText'
import ReactSelect, { IOption } from '@/components/form/ReactSelect'
import { FormikProps, FormikProvider } from 'formik'
import React from 'react'

interface IProps {
    formik: FormikProps<any>
    timeSlotList: IOption[]
}

const BookingModal: React.FC<IProps> = ({ formik, timeSlotList }) => {
    return (
        <FormikProvider value={formik}>
            <form className='space-y-4'>
                <InputText label='Name' name='customerName' placeholder='Enter your name..' />
                <InputText label='Phone' name='phone' placeholder='Enter your phone number..' />
                <InputDate label='Date' name='bookedDate' />
                <ReactSelect label='Time Slot' name='bookedTime' options={timeSlotList} />

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        formik.handleSubmit()
                    }}
                    className='mb-10 mt-20 w-full bg-blue-500 text-white px-6 py-4 rounded-xl flex items-center justify-center'>Submit</button>

            </form>
        </FormikProvider>
    )
}

export default BookingModal