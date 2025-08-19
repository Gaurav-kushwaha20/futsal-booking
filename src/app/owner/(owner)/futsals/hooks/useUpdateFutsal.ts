import { useGetDataQuery, useUpdatePutDataMutation } from '@/service/api';
import { IFutsalForm } from '../interface/IFutsalForm';
import { apiTags, endpoints } from '@/constant/endpoints.constant';
import { useFormik } from 'formik';
import { IGetFutsalDetails } from '../interface/IGetFutsalDetails';
import { showErrorMessage, showSuccessMessage } from '@/service/toast.services';

interface IProps {
 id: string;
 closeModal: () => void;
}

export const useUpdateFutsal = ({ closeModal, id }: IProps) => {
 const { data, isLoading: isGetDetailsLoading } = useGetDataQuery<{ data: IGetFutsalDetails; isLoading: boolean }>({
  url: endpoints.owner.getFutsalsDetails + id,
 });

 const [updateFutsal, { isLoading }] = useUpdatePutDataMutation();

 const initialValues: IFutsalForm = {
  name: data?.data?.name || '',
  city: data?.data?.city || '',
  coverImage: data?.data?.coverImage || '',
  district: data?.data?.district || '',
  images: data?.data?.images || null,
  longitude: data?.data?.longitude?.toString() || '',
  latitude: data?.data?.latitude?.toString() || '',
  registrationNumber: data?.data?.registrationNumber || '',
  registrationPhoto: data?.data?.registrationPhoto || null,
 };

 const formik = useFormik({
  initialValues,
  enableReinitialize: true,
  onSubmit: async (values) => {
   const form = new FormData();

   // append registration Photo
   // if (values.registrationPhoto) {
   //  form.append("registration_photo", values.registrationPhoto);
   // }

   // append cover photo
   if (values.coverImage && values.coverImage instanceof File) {
    form.append('cover_image', values.coverImage);
   }

   // append images
   if (values.images) {
    values.images?.forEach((file) => {
     if (file instanceof File) {
      form.append('images', file);
     }
    });
   }

   // append data
   // Append data as JSON string with proper content type
   const data = new Blob(
    [
     JSON.stringify({
      name: values?.name,
      district: values?.district,
      city: values?.city,
      registrationNumber: values?.registrationNumber,
      latitude: values?.latitude,
      longitude: values?.longitude,
     }),
    ],
    { type: 'application/json' }
   );

   form.append('data', data);

   //   Send the data to the backend

   const response = await updateFutsal({
    url: endpoints.owner.updateFutsal + id,
    data: form,
    invalidateTag: [apiTags.ownerGetAllFutsals],
   });

   if (response.data) {
    showSuccessMessage(response?.data?.message);
    formik.resetForm();
    closeModal();
   } else showErrorMessage('Some error occured');
  },
 });

 return { formik, isLoading, isGetDetailsLoading };
};
