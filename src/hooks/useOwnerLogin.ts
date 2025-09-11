'use client';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { usePostDataMutation } from '@/service/api';
import { endpoints } from '@/constant/endpoints.constant';
import { showErrorMessage, showSuccessMessage } from '@/service/toast.services';
import { loginUser } from '@/store/slices/authSlices';
import { ILoginOwner, ILoginOwnerError } from '@/interface/IOwnerLogin';
import { closeOwnerLoginModal } from '@/store/slices/ownerLoginModalSlice';

export const useOwnerLogin = () => {
 const dispatch = useDispatch();
 const [login, { isLoading, isSuccess, isError }] = usePostDataMutation();

 const initialValues = {
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
    url: endpoints.ownerLogin,
    data: values,
   });

   const response = res?.data as ILoginOwner;
   const error = res?.error as ILoginOwnerError;
   if (response && response?.success) {
    dispatch(
     loginUser({
      accessToken: response.data.token.access,
      refreshToken: response.data.token.refresh,
      userName: response?.data?.user?.username,
      userId: response.data.user.id,
      profilePicture: response?.data?.user?.profileImageUrl ?? undefined,
      isUserLoggedIn: true,
     })
    );
    dispatch(closeOwnerLoginModal());
    showSuccessMessage(response?.message);
   } else if (error) {
    showErrorMessage(error?.data?.message);
   }
  },
 });

 return { formik, isLoading, isSuccess, isError };
};
