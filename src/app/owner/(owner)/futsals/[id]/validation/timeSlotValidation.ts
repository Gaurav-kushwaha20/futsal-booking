import * as Yup from 'yup';

export const timeSlotSchema = Yup.object().shape({
 startTime: Yup.string().required('Start time is required'),

 endTime: Yup.string()
  .required('End time is required')
  .test('is-after-start', 'End time must be later than start time', function (value) {
   const { startTime } = this.parent;
   if (!startTime || !value) return true;
   return value > startTime; // compares strings "HH:mm:ss"
  }),

 price: Yup.number().typeError('Price must be a number').positive('Price must be greater than 0').required('Price is required'),
});

export type ITimeSlotForm = Yup.InferType<typeof timeSlotSchema>;
