import { apiTags, endpoints } from '@/constant/endpoints.constant';
import { useGetDataQuery } from '@/service/api';
import { ITimeSlotListResponse } from '../interface/ITimeSlot';

interface IProps {
 futsalId: string;
}

export const useGetTimeSlot = ({ futsalId }: IProps) => {
 const { isError, isLoading, isSuccess, data } = useGetDataQuery<{
  data: ITimeSlotListResponse;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
 }>({
  url: endpoints.timeSlot.list.replace('futsalid', futsalId),
  tag: apiTags.get_owner_time_slot,
 });

 return { timeSlotListResponse: data, isError, isSuccess, isLoading };
};
