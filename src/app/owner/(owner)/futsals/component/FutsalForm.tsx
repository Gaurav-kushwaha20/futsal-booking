import React from 'react'
import InputText from '@/components/form/InputText'
import InputFile from '@/components/form/InputFile'
import InputFileMultiple from '@/components/form/InputFileMultiple'

const FutsalForm: React.FC = () => {

   return (
      <div className='grid grid-cols-2 gap-5'>
         <InputText
            label='Name'
            name='name'
            placeholder='--Enter Futsal Name--'
         />
         <InputText
            label='Registration Number'
            name='registrationNumber'
            placeholder='--Enter Futsal Name--'
         />
         <InputText
            label='District'
            name='district'
            placeholder='--Enter Your District--'
         />
         <InputText
            label='City'
            name='city'
            placeholder='--Enter City--'
         />
         <InputText
            label='Longitude'
            name='logitude'
            placeholder='--Enter State--'
         />
         <InputText
            label='Latitude'
            name='latitude'
            placeholder='--Enter State--'
         />
         <InputFile
            label='Registration Photo'
            name='registrationPhoto'
         />
         <InputFile
            label='Cover Image'
            name='coverImage'
         />
         <InputFileMultiple
            label='Photos'
            name='images'
         />
      </div>
   )
}

export default FutsalForm