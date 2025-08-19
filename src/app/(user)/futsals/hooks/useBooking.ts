import FutsalCard from '@/components/FutsalCard';
import { endpoints } from '@/constant/endpoints.constant';
import useDisclosure from '@/lib/useDisclosure';
import useStringState from '@/lib/useStringState';
import { useGetDataQuery, usePostDataMutation } from '@/service/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TimeSlotByFutsalResponse } from '../interface/IGetTimeSlot';
import { IOption } from '@/components/form/ReactSelect';
import { IApiResponse } from '@/interface/IResponse';
import { showErrorMessage, showSuccessMessage } from '@/service/toast.services';

export const bookingSchema = Yup.object().shape({
 customerName: Yup.string().required('Customer name is required').min(3, 'Customer name must be at least 3 characters'),
 phone: Yup.string()
  .required('Phone number is required')
  .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
 bookedDate: Yup.date().required('Booking date is required').typeError('Invalid date format'),
 bookedTime: Yup.string()
  .required('Booking time is required')
  .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:mm format'),
});
export type BookingForm = Yup.InferType<typeof bookingSchema>;

export const useBooking = () => {
 const bookingModalState = useDisclosure();
 const futsalIdState = useStringState('');
 const handleBook = (futsalId: string) => {
  bookingModalState.open();
  futsalIdState.setValue(futsalId);
 };

 const [createBooking, { isLoading }] = usePostDataMutation();
 const initialValues: BookingForm = {
  bookedDate: new Date(),
  bookedTime: '',
  customerName: '',
  phone: '',
 };
 const formik = useFormik({
  initialValues,
  onSubmit: async (values) => {
   const response = (await createBooking({
    url: endpoints.booking.create.replace('id', futsalIdState.values),
    data: { ...values, paid: false, price: 500 },
   })) as IApiResponse;

   if (response?.data?.message) {
    showSuccessMessage(response?.data?.message);
    bookingModalState.close();
   }

   if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
  },
 });

 // Get Selected Futsal Time Slot
 const { data } = useGetDataQuery<{ data: TimeSlotByFutsalResponse }>(
  {
   url: endpoints.timeSlot.getByFutsalId.replace('id', futsalIdState.values),
  },
  { skip: !futsalIdState.values }
 );
 const timeSlotList: IOption[] = data?.data?.data?.map((item) => ({ label: `${item?.startTime} - ${item?.endTime}`, value: item?.startTime }));

 return { bookingModalState, futsalIdState, handleBook, formik, timeSlotList };
};
