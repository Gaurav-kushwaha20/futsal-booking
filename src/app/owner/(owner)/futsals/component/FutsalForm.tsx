import { FormikProps, FormikProvider } from 'formik'
import React from 'react'
import { IFutsalForm } from '../interface/IFutsalForm'
import InputText from '@/components/form/InputText'
import InputFile from '@/components/form/InputFile'
import InputFileMultiple from '@/components/form/InputFileMultiple'

interface IProps {
   formik: FormikProps<IFutsalForm>
}

const FutsalForm: React.FC<IProps> = ({ formik }) => {

   return (
      <FormikProvider value={formik}>
         <form onSubmit={formik.handleSubmit}>
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
            <div className='w-full'>
               <button type='submit' className='block w-full mx-auto py-2.5 text-white bg-green-500 rounded-xl'>Submit</button>
            </div>
         </form>
      </FormikProvider>
   )
}

export default FutsalForm