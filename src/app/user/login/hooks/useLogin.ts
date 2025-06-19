"use client";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { usePostDataMutation } from "@/service/api";
import { endpoints } from "@/constant/endpoints.constant";
import { PATH } from "@/constant/PATH.constant";
import { showErrorMessage, showSuccessMessage } from "@/service/toast.services";
import { loginUser } from "@/service/auth.services";
import { IUserLogin, IUserLoginError, IUserLoginSuccess } from "../interface/ILogin";

const useLogin = () => {
 const router = useRouter();
 const dispatch = useDispatch();
 const [login, { isLoading, isSuccess, isError }] = usePostDataMutation();

 const initialValues: IUserLogin = {
  username: "",
  password: "",
 };

 const formik = useFormik({
  initialValues,
  validationSchema: Yup.object().shape({
   username: Yup.string().required("Username is required"),
   password: Yup.string().required("Password is required"),
  }),
  onSubmit: async (values) => {
   const res = await login({
    url: endpoints.userLogin,
    data: values,
   });

   const response = res?.data as IUserLoginSuccess;
   const error = res?.error as IUserLoginError;
   if (response && response?.success) {
    dispatch(
     loginUser({
      accessToken: response.data.token.access,
      refreshToken: response.data.token.refresh,
      userId: response.data.user.id,
      isUserLoggedIn: true,
     })
    );
    router.replace(PATH.dashboard);
    showSuccessMessage(response?.message);
   } else if (error) {
    showErrorMessage(error?.data?.message);
   }
  },
 });

 return { formik, isLoading, isSuccess, isError };
};

export default useLogin;
