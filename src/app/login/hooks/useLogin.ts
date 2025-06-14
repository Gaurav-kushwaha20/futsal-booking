"use client";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { ILoginError, ILoginSuccess } from "../interface/ILogin";
import { useRouter } from "next/navigation";
import { usePostDataMutation } from "@/service/api";
import { endpoints } from "@/constant/endpoints.constant";
import { PATH } from "@/constant/PATH.constant";
import { showErrorMessage, showSuccessMessage } from "@/service/toast.services";
import { loginUser } from "@/service/auth.services";

const useLogin = () => {
 const router = useRouter();
 const dispatch = useDispatch();
 const [login, { isLoading, isSuccess, isError }] = usePostDataMutation();

 const formik = useFormik({
  initialValues: {
   email: "",
   password: "",
  },
  validationSchema: Yup.object().shape({
   email: Yup.string().required("Email is required"),
   password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 6 characters")
    .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .matches(/(?=.*\d)/, "Password must contain at least one number")
    .matches(/(?=.*[!@#$%^&*()_+={}\[\]:;"\'<>,.?/\\|`~])/, "Password must contain at least one special character"),
  }),
  onSubmit: async (values) => {
   const res = await login({
    url: endpoints.login,
    data: values,
   });

   const response = res?.data as ILoginSuccess;
   const error = res?.error as ILoginError;
   if (response && response?.success) {
    dispatch(
     loginUser({
      accessToken: response?.token?.access,
      refreshToken: response?.token?.refresh,
      userId: response?.user?.id,
      isUserLoggedIn: true,
     })
    );
    router.push(PATH.dashboard);
    showSuccessMessage(response?.message);
   } else if (error) {
    showErrorMessage(error?.data?.message);
   }
  },
 });

 return { formik, isLoading, isSuccess, isError };
};

export default useLogin;
