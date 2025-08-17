import InputText from '@/components/form/InputText'
import React from 'react'

const TimeSlotForm = () => {
    return (
        <div className='grid grid-cols-1 gap-6'>
            <InputText label='Start Time' name='startTime' type='time' />
            <InputText label='End Time' name='endTime' type='time' />
            <InputText label='Price' name='price' placeholder='Enter price of time slot' />
        </div>
    )
}

export default TimeSlotForm