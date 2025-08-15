import React from 'react';
import { useUpdateFutsal } from '../hooks/useUpdateFutsal';
import { FormikProvider } from 'formik';
import FutsalForm from '../component/FutsalForm';
import { Loader } from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';

interface IProps {
    futsalId: string;
    closeModal: () => void;
}

const UpdateFutsalModal: React.FC<IProps> = ({ closeModal, futsalId }) => {
    const { formik, isLoading, isGetDetailsLoading } = useUpdateFutsal({ closeModal: closeModal, id: futsalId })
    if (isGetDetailsLoading) return <LoadingScreen />
    return (
        <FormikProvider value={formik} >
            <form onSubmit={formik.handleSubmit}>
                <FutsalForm />
                <div className='w-full'>
                    <button disabled={isLoading} type='submit' className='block w-full mx-auto py-2.5 text-white bg-green-500 cursor-pointer'>
                        Update
                        {isLoading && <Loader />}
                    </button>
                </div>
            </form>
        </FormikProvider>
    );
}

export default UpdateFutsalModal;
