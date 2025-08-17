import { endpoints } from '@/constant/endpoints.constant';
import { useGetDataQuery } from '@/service/api';
import { ITimeSlotDetailsResponse } from '../interface/ITimeSlot';

interface IProps {
 futsalId: string;
}

export const useGetTimeSlotDetails = ({ futsalId }: IProps) => {
 const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
  data: ITimeSlotDetailsResponse;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
 }>({ url: endpoints.timeSlot.details.replace('id', futsalId) });

 return { timeSlotDetailsResponse: data, isError, isLoading, isSuccess };
};
