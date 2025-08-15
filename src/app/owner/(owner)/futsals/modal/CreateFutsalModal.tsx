import React from 'react'
import { useCreateFutsal } from '../hooks/useCreateFutsal'
import { FormikProvider } from 'formik'
import FutsalForm from '../component/FutsalForm'
import { Loader } from 'lucide-react'

const CreateFutsalModal = () => {
 const { formik, isLoading } = useCreateFutsal()
 return (
  <div>
   <FormikProvider value={formik}>
    <form onSubmit={formik.handleSubmit}>
     <FutsalForm formik={formik} />
     <div className='w-full'>
      <button disabled={isLoading} type='submit' className='block w-full mx-auto py-2.5 text-white bg-green-500 rounded-xl'>
       Submit
       {isLoading && <Loader />}
      </button>
     </div>
    </form>
   </FormikProvider>
  </div>
 )
}

export default CreateFutsalModal