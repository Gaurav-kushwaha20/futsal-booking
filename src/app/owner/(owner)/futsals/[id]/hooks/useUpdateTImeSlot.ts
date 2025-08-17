import { useFormik } from 'formik';
import { useGetTimeSlotDetails } from './useGetTimeSlotDetails';
import { useUpdatePutDataMutation } from '@/service/api';
import { apiTags, endpoints } from '@/constant/endpoints.constant';
import { IApiResponse } from '@/interface/IResponse';
import { showErrorMessage, showSuccessMessage } from '@/service/toast.services';

interface IProps {
 futsalId: string;
 closeModal?: () => void;
}
export const useUpdateTimeSlot = ({ futsalId, closeModal }: IProps) => {
 const { timeSlotDetailsResponse, isLoading: isInitialDataLoading } = useGetTimeSlotDetails({ futsalId });
 const [updateTimeSlot, { isLoading, isError, isSuccess }] = useUpdatePutDataMutation();

 const initialValues = {
  startTime: timeSlotDetailsResponse?.data?.startTime || '',
  endTime: timeSlotDetailsResponse?.data?.endTime || '',
  price: timeSlotDetailsResponse?.data?.price || '',
 };
 const formik = useFormik({
  initialValues,
  enableReinitialize: true,
  onSubmit: async (values) => {
   const response = (await updateTimeSlot({
    url: endpoints.timeSlot.update.replace('id', futsalId),
    data: values,
    invalidateTag: [apiTags.get_owner_time_slot],
   })) as IApiResponse;
   if (response?.data?.message) {
    showSuccessMessage(response?.data?.message);
    closeModal?.();
   }
   if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
  },
 });

 return { formik, isLoading, isError, isSuccess, isInitialDataLoading };
};
