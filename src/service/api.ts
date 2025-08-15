/* eslint-disable @typescript-eslint/no-explicit-any */
// import { logoutUser } from "@/store/features/authSlice";
import type { BaseQueryApi, BaseQueryArg } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearAllCookies, getCookie, setCookie } from './cookie';
import { COOKIE_CONFIG } from '@/constant/cookie.constant';

interface IGetDataArgs {
 url: string;
 params?: Record<string, string | number | boolean>;
 tag?: string;
}

interface IPostDataArgs {
 url: string;
 data?: any;
 options?: any;
 invalidateTag?: string[];
}

interface IUpdateDataArgs {
 url: string;
 data: any;
 options?: any;
 invalidateTag?: string[];
}

interface IDeleteDataArgs {
 url: string;
 body?: any;
 options?: any;
 invalidates?: string[];
}

type InitialPageParam = {
 page: number;
 size: number;
};

export interface PaginatedResponse<T> {
 links: Links;
 total_items: number;
 total_pages: number;
 current_page: number;
 page_size: number;
 results: T;
}

export interface Links {
 next: string;
 previous: string;
}

const baseQuery = fetchBaseQuery({
 baseUrl: process.env.NEXT_PUBLIC_BASE_API,
 prepareHeaders: (headers) => {
  const access = getCookie(COOKIE_CONFIG.access);
  if (access) {
   headers.set('Authorization', `Bearer ${access}`);
  }
  headers.set('Accept', 'application/json');
  return headers;
 },
 // credentials: "include",
});

const baseQueryWithReauth = async (args: BaseQueryArg<any>, api: BaseQueryApi, extraOptions: any) => {
 let result = await baseQuery(args, api, extraOptions);
 if (result.error && (result?.error?.status === 401 || result?.error?.status === 500)) {
  const refreshToken = getCookie(COOKIE_CONFIG.refresh);
  const refreshResult = await baseQuery(
   {
    url: '/auth/refresh',
    method: 'POST',
    body: { refresh: refreshToken },
   },
   api,
   extraOptions
  );
  if (refreshResult.data) {
   const { access, refresh } = refreshResult.data as {
    access: string;
    refresh: string;
   };
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
 tagTypes: ['Data'],
 endpoints: (builder) => ({
  getData: builder.query<any, IGetDataArgs>({
   query: ({ url, params }) => ({
    url,
    method: 'GET',
    params,
   }),
   providesTags: (_, __, { tag }) => (tag ? [{ type: 'Data', id: tag }] : []),
  }),

  postData: builder.mutation<any, IPostDataArgs>({
   query: ({ url, data, options }) => ({
    url,
    method: 'POST',
    body: data,
    ...options,
   }),
   invalidatesTags: (_, __, { invalidateTag }) => (invalidateTag ? invalidateTag.map((tag: string) => ({ type: 'Data', id: tag })) : []),
  }),

  updateData: builder.mutation<any, IUpdateDataArgs>({
   query: ({ url, data }) => ({
    url,
    method: 'PATCH',
    body: data,
   }),
   invalidatesTags: (_, __, { invalidateTag }) => (invalidateTag ? invalidateTag.map((tag: string) => ({ type: 'Data', id: tag })) : []),
  }),

  updatePutData: builder.mutation<any, IUpdateDataArgs>({
   query: ({ url, data }) => ({
    url,
    method: 'PUT',
    body: data,
   }),
   invalidatesTags: (_, __, { invalidateTag }) => (invalidateTag ? invalidateTag.map((tag: string) => ({ type: 'Data', id: tag })) : []),
  }),

  deleteData: builder.mutation<any, IDeleteDataArgs>({
   query: ({ url, body }) => ({
    url,
    method: 'DELETE',
    body,
   }),
   invalidatesTags: (_, __, { invalidates }) => (invalidates ? invalidates.map((tag: string) => ({ type: 'Data', id: tag })) : []),
  }),
  getAllData: builder.infiniteQuery<PaginatedResponse<any>, IGetDataArgs, InitialPageParam>({
   query: ({ pageParam: { page, size }, queryArg: { url, params } }) => ({
    url,
    method: 'GET',
    params: { ...params, p: page, page_size: size },
   }),
   providesTags: (_, __, { tag }) => (tag ? [{ type: 'Data', id: tag }] : []),
   infiniteQueryOptions: {
    initialPageParam: {
     page: 1,
     size: 10,
    },
    getNextPageParam: (lastPage) => {
     const nextPage = lastPage.links.next;
     if (nextPage) {
      return {
       page: lastPage.current_page + 1,
       size: lastPage.page_size,
      };
     }
     return undefined;
    },
    getPreviousPageParam: (lastPage) => {
     const prevPage = lastPage?.links.previous;
     if (prevPage) {
      return {
       page: lastPage.current_page - 1,
       size: lastPage.page_size,
      };
     }
     return undefined;
    },
   },
  }),
 }),
});

export const { useGetDataQuery, usePostDataMutation, useUpdateDataMutation, useUpdatePutDataMutation, useDeleteDataMutation, useGetAllDataInfiniteQuery } = apiSlice;
