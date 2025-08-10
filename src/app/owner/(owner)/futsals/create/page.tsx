'use client'
import React from 'react'
import FutsalForm from '../component/FutsalForm'
import { useCreateFutsal } from './hooks/useCreateFutsal'

const Page: React.FC = () => {
   const { formik } = useCreateFutsal()
   return (
      <div>
         <FutsalForm formik={formik} />
      </div>
   )
}

export default Page