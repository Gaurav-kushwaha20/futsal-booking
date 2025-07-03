"use client";
import { endpoints } from "@/constant/endpoints.constant";
import { useGetDataQuery } from "@/service/api";
import { IGetFutsals } from "../interface/IGetFutsals";

export const useFutsal = () => {
 const { data } = useGetDataQuery<{ data: IGetFutsals }>({
  url: endpoints.owner.futsalList,
  tag: "owner_futsalList",
 });
 return { data };
};
