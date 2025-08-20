import { endpoints } from '@/constant/endpoints.constant';
import useStringState from '@/lib/useStringState';
import { useGetDataQuery } from '@/service/api';
import { BookingListResponse } from '../interface/IBooking';

export const useGetUserBooking = () => {
 const page = useStringState('0');
 const pageSize = useStringState('10');

 const { data } = useGetDataQuery<{ data: BookingListResponse }>({
  url: endpoints.booking.getUserBooking,
  params: { page: page.values, pageSize: pageSize.values },
 });

 return { data };
};
