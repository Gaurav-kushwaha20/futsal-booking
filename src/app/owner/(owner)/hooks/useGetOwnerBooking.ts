import { BookingListResponse } from '@/app/(user)/bookings/interface/IBooking';
import { endpoints } from '@/constant/endpoints.constant';
import useStringState from '@/lib/useStringState';
import { useGetDataQuery } from '@/service/api';

export const useGetOwnerBooking = () => {
 const page = useStringState('0');
 const pageSize = useStringState('10');

 const { data } = useGetDataQuery<{ data: BookingListResponse }>({
  url: endpoints.booking.getOwnerBooking,
  params: { page: page.values, pageSize: pageSize.values },
 });

 return { data };
};
