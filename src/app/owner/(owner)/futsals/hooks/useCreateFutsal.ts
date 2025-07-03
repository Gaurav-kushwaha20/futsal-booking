import { useFormik } from "formik";
import { ICreateFutsal } from "../interface/ICreateFutsal";

export const useCreateFutsal = () => {
 const initialValues: ICreateFutsal = {
  name: "",
  address: "",
  state: "",
  district: "",
  city: "",
  coverImage: null,
  images: null,
  location: "",
  registrationNumber: "",
  registrationPhoto: "",
 };

 const formik = useFormik({
  initialValues,
  onSubmit: async (values) => {
   console.info(values);
  },
 });

 return { formik };
};
