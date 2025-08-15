"use client"

import { endpoints } from "@/constant/endpoints.constant"
import { useGetDataQuery } from "@/service/api"
import { IFutsalDetailsResponse } from "../interface/IGetFutsalDetails"

interface IProps {
    id: string
}

const useGetFutsalDetails = ({ id }: IProps) => { // named export

    const { isError, isLoading, isSuccess, data } = useGetDataQuery<{ data: IFutsalDetailsResponse; isLoading: boolean; isSuccess: boolean, isError: boolean }>({
        url: endpoints.owner.getFutsalsDetails + id
    })

    console.log(data)

    return { isError, data, isLoading, isSuccess }
}

export default useGetFutsalDetails;