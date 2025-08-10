"use client";
import { endpoints } from "@/constant/endpoints.constant";
import { useGetDataQuery } from "@/service/api";
import { IGetFutsals } from "../interface/IGetFutsals";
import { useState } from "react";

export const useGetFutsal = () => {
    const [page, setPage] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)
    // const [search , setSearch] = useState()

    const { data } = useGetDataQuery<{ data: IGetFutsals }>({
        url: endpoints.owner.futsalList,
        tag: "owner_futsalList",
        params: {
            page: page,
            pageSize: pageSize,
        }
    });
    return { data, page, setPage, pageSize, setPageSize };
};
