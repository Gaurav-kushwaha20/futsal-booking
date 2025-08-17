import { apiTags, endpoints } from '@/constant/endpoints.constant';
import { IApiResponse } from '@/interface/IResponse';
import { useDeleteDataMutation } from '@/service/api';
import { showErrorMessage, showSuccessMessage } from '@/service/toast.services';

interface IParams {
 timeSlotId: string;
}

export const useDeleteTimeSlot = ({ timeSlotId }: IParams) => {
 const [deleteTimeSlot, { isError, isLoading, isSuccess }] = useDeleteDataMutation();

 const handleDelteTimeSlot = async () => {
  const response = (await deleteTimeSlot({
   url: endpoints.timeSlot.delete.replace('id', timeSlotId),
   invalidates: [apiTags.get_owner_time_slot],
  })) as IApiResponse;
  if (response?.data?.message) showSuccessMessage(response?.data?.message);
  if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
 };

 return { handleDelteTimeSlot, isError, isLoading, isSuccess };
};
