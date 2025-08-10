"use client"
import { FormikProvider } from 'formik'
import React from 'react'
import InputText from '@/components/form/InputText'
import { useCreateFutsal } from '../create/hooks/useCreateFutsal'

const CreateFutsalForm = () => {
   const { formik } = useCreateFutsal()
   return (
      <FormikProvider value={formik}>
         <div className='grid grid-cols-2'>
            <InputText label='Name' name='name' />
            <InputText label='Address' name='address' />
         </div>
      </FormikProvider>
   )
}

export default CreateFutsalForm