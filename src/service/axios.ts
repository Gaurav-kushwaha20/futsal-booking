import axios from "axios";

const axiosInstance = axios.create({
 baseURL: process.env.NEXT_PUBLIC_BASE_API,
 headers: {
  "Content-Type": "application/json",
 },
 timeout: 30000,
});

export const getData = async <T>(
 url: string,
 params?: Record<string, string>,
 options?: {
  timeout?: number;
 }
): Promise<T> => {
 try {
  const response = await axiosInstance.get<T>(url, {
   params,
   timeout: options?.timeout,
   headers: {
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
   },
  });
  return response.data;
 } catch (error) {
  if (axios.isAxiosError(error)) {
   console.error(`Request failed to ${url}:`, {
    message: error.message,
    code: error.code,
    status: error.response?.status,
   });
  }
  throw error;
 }
};
