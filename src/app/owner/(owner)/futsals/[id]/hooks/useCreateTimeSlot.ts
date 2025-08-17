import { usePostDataMutation } from '@/service/api';
import { useFormik } from 'formik';
import { ITimeSlotForm, timeSlotSchema } from '../validation/timeSlotValidation';
import { apiTags, endpoints } from '@/constant/endpoints.constant';
import { IApiResponse } from '@/interface/IResponse';
import { showErrorMessage, showSuccessMessage } from '@/service/toast.services';

interface IProps {
 futsalId: string;
 closeModal?: () => void;
}

export const useCreateTimeSlot = ({ futsalId, closeModal }: IProps) => {
 const [createTimeSlot, { isError, isLoading, isSuccess }] = usePostDataMutation();
 const initialValues = {
  startTime: '',
  endTime: '',
  price: 0,
 };
 const formik = useFormik<ITimeSlotForm>({
  initialValues,
  validationSchema: timeSlotSchema,
  onSubmit: async (values) => {
   const response = (await createTimeSlot({
    url: endpoints.timeSlot.create.replace('id', futsalId),
    data: values,
    invalidateTag: [apiTags.get_owner_time_slot],
   })) as IApiResponse;
   console.log(response);
   if (response?.data?.message) {
    showSuccessMessage(response?.data?.message);
    closeModal?.();
   }
   if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
  },
 });

 return { formik, isError, isLoading, isSuccess };
};
