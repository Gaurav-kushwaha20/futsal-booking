"use client";
import { endpoints } from "@/constant/endpoints.constant";
import { useGetDataQuery } from "@/service/api";
import { IGetFutsalSuccess } from "../interface/IGetFutsals";

const useFutsals = () => {
 const { data, isError, isLoading, isSuccess } = useGetDataQuery({ url: endpoints.getAllFutsal, params: { page: 0, pageSize: 5 } });

 const futsalList: IGetFutsalSuccess = data;
 console.log(data);
 return { futsalList, isError, isLoading, isSuccess };
};

export default useFutsals;
