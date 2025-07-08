import { useFormik } from "formik";
import { IFutsalForm } from "../../interface/IFutsalForm";
import { usePostDataMutation } from "@/service/api";
import { apiTags, endpoints } from "@/constant/endpoints.constant";
import { ICreateFutsalError, ICreateFutsalSuccess } from "../interface/ICreateFutsals";
import { showErrorMessage, showSuccessMessage } from "@/service/toast.services";
import { FILE } from "node:dns";

export const useCreateFutsal = () => {
 const [createFutsal, { isError, isLoading, isSuccess }] = usePostDataMutation();
 const initialValues: IFutsalForm = {
  name: "",
  city: "",
  coverImage: null,
  district: "",
  images: null,
  logitude: "",
  latitude: "",
  registrationNumber: "",
  registrationPhoto: null,
 };

 const formik = useFormik({
  initialValues,
  onSubmit: async (values, { resetForm }) => {
   const form = new FormData();

   // append registration Photo
   if (values.registrationPhoto) {
    form.append("registration_photo", values.registrationPhoto);
   }

   // append cover photo
   if (values.coverImage) {
    form.append("cover_image", values.coverImage);
   }

   // append images
   if (values.images) {
    values.images?.forEach((file) => {
     form.append("images", file);
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
      location: {
       type: "point",
       coordinates: [values.logitude, values.latitude],
      },
     }),
    ],
    { type: "application/json" }
   );

   form.append("data", data);

   //   Send the data to the backend

   const response = await createFutsal({
    url: endpoints.owner.createFutsals,
    data: form,
    invalidateTag: [apiTags.ownerGetAllFutsals],
   });
   const res: ICreateFutsalSuccess = response?.data;
   const error = response?.error as ICreateFutsalError;

   //   show success Message
   if (res) {
    showSuccessMessage(res.message);
    resetForm();
   }
   // show the error message
   if (error) {
    showErrorMessage(error?.data?.message);
   }
  },
 });

 return { formik, isError, isLoading, isSuccess };
};
