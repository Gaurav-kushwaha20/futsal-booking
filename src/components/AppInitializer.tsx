"use client"
import React, { useEffect } from 'react'
import { endpoints } from '@/constant/endpoints.constant'
import { useGetDataQuery } from '@/service/api'
import { useDispatch } from 'react-redux'
import { setUser } from '@/service/auth.services'
import { IApiDetailsResponse } from '@/interface/IResponse'

type CurrentUserType = IApiDetailsResponse<{
    id: string;
    username: string;
}>

const AppInitializer: React.FC = () => {
    const dispatch = useDispatch();
    const { data } = useGetDataQuery<{ data: CurrentUserType }>({
        url: endpoints.auth.me
    })
    useEffect(() => {
        dispatch(setUser({ id: data?.data?.id, userName: data?.data?.username }))
    }, [])
    return null;
}
export default AppInitializer