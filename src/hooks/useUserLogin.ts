'use client';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { usePostDataMutation } from '@/service/api';
import { endpoints } from '@/constant/endpoints.constant';
import { showErrorMessage, showSuccessMessage } from '@/service/toast.services';
import { loginUser } from '@/store/slices/authSlices';
import { IUserLogin, IUserLoginError, IUserLoginSuccess } from '@/interface/IUserLogin';
import { closeUserLoginModal } from '@/store/slices/userLoginModalSlice';

export const useUserLogin = () => {
 const dispatch = useDispatch();
 const [login, { isLoading, isSuccess, isError }] = usePostDataMutation();

 const initialValues: IUserLogin = {
  username: '',
  password: '',
 };

 const formik = useFormik({
  initialValues,
  validationSchema: Yup.object().shape({
   username: Yup.string().required('Username is required'),
   password: Yup.string().required('Password is required'),
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
      accessToken: response?.data?.token?.access,
      refreshToken: response?.data?.token?.refresh,
      userName: response?.data?.user?.username,
      userId: response?.data?.user?.id,
      isUserLoggedIn: true,
      profilePicture: response?.data?.user?.profile_picture ?? undefined,
     })
    );
    dispatch(closeUserLoginModal());
    showSuccessMessage(response?.message);
   } else if (error) {
    showErrorMessage(error?.data?.message);
   }
  },
 });

 return { formik, isLoading, isSuccess, isError };
};
