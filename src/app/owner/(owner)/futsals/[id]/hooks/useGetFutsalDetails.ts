"use client"

import { endpoints } from "@/constant/endpoints.constant"
import { useGetDataQuery } from "@/service/api"
import { IFutsalDetailsResponse } from "../interface/IGetFutsalDetails"

interface IProps {
    id: string
}

const useGetFutsalDetails = ({ id }: IProps) => { // Destructuring the id from the interface
    // const useGetFutsalDetails = (props:IProps) =>{ const id = props.id} // we can write the above code like this in an understanding way but the upper code is optimized 

    const { isError, isLoading, isSuccess, data } =
        useGetDataQuery<{ data: IFutsalDetailsResponse; isLoading: boolean; isSuccess: boolean, isError: boolean }>
            ({
                url: endpoints.owner.getFutsalsDetails + id
            })

    return { isError, data, isLoading, isSuccess }
}

export default useGetFutsalDetails;