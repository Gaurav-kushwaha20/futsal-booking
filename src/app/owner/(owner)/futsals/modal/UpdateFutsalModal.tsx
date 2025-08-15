import React from 'react';
import { useUpdateFutsal } from '../hooks/useUpdateFutsal';
import { FormikProvider } from 'formik';
import FutsalForm from '../component/FutsalForm';
import { Loader } from 'lucide-react';

interface IProps {
    futsalId: string;
    closeModal: () => void;
}

const UpdateFutsalModal: React.FC<IProps> = ({ closeModal, futsalId }) => {
    const { formik, isLoading } = useUpdateFutsal({ closeModal: closeModal, id: futsalId })
    return (
        <div>
            <FormikProvider value={formik} >
                <form onSubmit={formik.handleSubmit}>
                    <FutsalForm formik={formik} />
                    <div className='w-full'>
                        <button disabled={isLoading} type='submit' className='block w-full mx-auto py-2.5 text-white bg-green-500'>
                            Update
                            {isLoading && <Loader />}
                        </button>
                    </div>
                </form>
            </FormikProvider>

        </div>
    );
}

export default UpdateFutsalModal;
