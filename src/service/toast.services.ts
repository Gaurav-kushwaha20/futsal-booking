import { toast, ToastOptions } from "react-toastify";
export const showSuccessMessage = (message: string, options?: ToastOptions) => {
 toast.success(message, {
  ...options,
 });
};

export const showErrorMessage = (message: string, options?: ToastOptions) => {
 toast.error(message, {
  ...options,
 });
};
