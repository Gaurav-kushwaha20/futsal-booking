/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAllCookies, getCookie, setCookie } from "./cookie";
import { COOKIE_CONFIG } from "@/constant/cookie.constant";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Define types for your API responses
interface ApiResponse<T> {
 data?: T;
 error?: FetchBaseQueryError;
}

interface TokenResponse {
 access: string;
 refresh: string;
}

interface IGetDataArgs {
 url: string;
 params?: Record<string, string | number | boolean>;
 tag?: string;
}

interface IPostDataArgs<T = any> {
 url: string;
 data?: T;
 options?: any;
 invalidateTag?: string[];
}

interface IUpdateDataArgs<T = any> {
 url: string;
 data: T;
 options?: any;
 invalidateTag?: string[];
}

interface IDeleteDataArgs<T = any> {
 url: string;
 body?: T;
 options?: any;
 invalidates?: string[];
}

const baseQuery = fetchBaseQuery({
 baseUrl: process.env.NEXT_PUBLIC_BASE_API,
 prepareHeaders: (headers) => {
  const access = getCookie(COOKIE_CONFIG.access);
  if (access) {
   headers.set("Authorization", `Bearer ${access}`);
  }
  headers.set("Accept", "application/json");
  return headers;
 },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
 let result = await baseQuery(args, api, extraOptions);
 // if unauthorized the re-fetch with refresh token
 if (result.error && (result.error.status === 401 || result.error.status === 500)) {
  const refreshToken = getCookie(COOKIE_CONFIG.refresh);
  console.log(result);
  const refreshResult = await baseQuery(
   {
    url: "/user/token-refresh/",
    method: "POST",
    body: { refresh: refreshToken },
   },
   api,
   extraOptions
  );

  if (refreshResult.data) {
   const { access, refresh } = refreshResult.data as TokenResponse;
   setCookie({
    cookieName: COOKIE_CONFIG.access,
    value: access,
    expiresIn: COOKIE_CONFIG.accessTime,
   });
   setCookie({
    cookieName: COOKIE_CONFIG.refresh,
    value: refresh,
    expiresIn: COOKIE_CONFIG.refreshTime,
   });
   result = await baseQuery(args, api, extraOptions);
  } else {
   clearAllCookies();
  }
 }
 return result;
};

export const apiSlice = createApi({
 baseQuery: baseQueryWithReauth,
 tagTypes: ["Data"],
 endpoints: (builder) => ({
  getData: builder.query<ApiResponse<any>, IGetDataArgs>({
   query: ({ url, params }) => ({
    url,
    method: "GET",
    params,
   }),
   providesTags: (result, error, { tag }) => (tag ? [{ type: "Data", id: tag }] : []),
  }),

  postData: builder.mutation<ApiResponse<any>, IPostDataArgs>({
   query: ({ url, data, options }) => ({
    url,
    method: "POST",
    body: data,
    ...options,
   }),
   invalidatesTags: (result, error, { invalidateTag }) => (invalidateTag ? invalidateTag.map((tag) => ({ type: "Data", id: tag })) : []),
  }),

  updateData: builder.mutation<ApiResponse<any>, IUpdateDataArgs>({
   query: ({ url, data }) => ({
    url,
    method: "PATCH",
    body: data,
   }),
   invalidatesTags: (result, error, { invalidateTag }) => (invalidateTag ? invalidateTag.map((tag) => ({ type: "Data", id: tag })) : []),
  }),

  updatePutData: builder.mutation<ApiResponse<any>, IUpdateDataArgs>({
   query: ({ url, data }) => ({
    url,
    method: "PUT",
    body: data,
   }),
   invalidatesTags: (result, error, { invalidateTag }) => (invalidateTag ? invalidateTag.map((tag) => ({ type: "Data", id: tag })) : []),
  }),

  deleteData: builder.mutation<ApiResponse<void>, IDeleteDataArgs>({
   query: ({ url, body }) => ({
    url,
    method: "DELETE",
    body,
   }),
   invalidatesTags: (result, error, { invalidates }) => (invalidates ? invalidates.map((tag) => ({ type: "Data", id: tag })) : []),
  }),
 }),
});

export const { useGetDataQuery, usePostDataMutation, useUpdateDataMutation, useUpdatePutDataMutation, useDeleteDataMutation } = apiSlice;
