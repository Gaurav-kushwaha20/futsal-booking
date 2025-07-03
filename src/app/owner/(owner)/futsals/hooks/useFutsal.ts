"use client";
import { endpoints } from "@/constant/endpoints.constant";
import { useGetDataQuery } from "@/service/api";

export const useFutsal = () => {
 const { data } = useGetDataQuery({
  url: endpoints.owner.futsalList,
  tag: "owner_futsalList",
 });
 console.log(data);
 return {};
};
