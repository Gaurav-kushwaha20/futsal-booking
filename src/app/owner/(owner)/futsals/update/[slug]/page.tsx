"use client"
import { useParams } from 'next/navigation';
import React from 'react';
import FutsalForm from '../../component/FutsalForm';
import { useUpdateFutsal } from '../hooks/useUpdateFutsal';

const Page: React.FC = () => {
   const params = useParams() as { slug: string }
   const { formik } = useUpdateFutsal({ id: params.slug })
   return (
      <div>
         <FutsalForm formik={formik} />
      </div>
   );
};

export default Page;
