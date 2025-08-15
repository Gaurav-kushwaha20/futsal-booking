"use client";
import { apiTags, endpoints } from "@/constant/endpoints.constant";
import { useDeleteDataMutation, useGetDataQuery } from "@/service/api";
import { IGetFutsalSuccess } from "../interface/IGetFutsals";
import { useState } from "react";
import { showErrorMessage, showSuccessMessage } from "@/service/toast.services";

const useFutsals = async () => {
 const { data, isError, isLoading, isSuccess } = useGetDataQuery({ url: endpoints.getAllFutsal, params: { page: 0, pageSize: 5 } });


 const futsalList: IGetFutsalSuccess = data;
 return { futsalList, isError, isLoading, isSuccess };
};

export default useFutsals;
