"use client";
import { apiTags, endpoints } from "@/constant/endpoints.constant";
import { useDeleteDataMutation, useGetDataQuery } from "@/service/api";
import { IGetFutsalSuccess } from "../interface/IGetFutsals";
import { useState } from "react";

const useFutsals = () => {
    const [page, setPage] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(5)
    const [search, setSearch] = useState<string>("")

    const { data, isError, isLoading, isSuccess } = useGetDataQuery({
        url: endpoints.getAllFutsal, params:
            { page: page, pageSize: pageSize, search: search }
    });

    const futsalList: IGetFutsalSuccess = data;
    return { futsalList, isError, isLoading, isSuccess, page, setPage, pageSize, setPageSize, search, setSearch };
};

export default useFutsals;
