import { IApiDetailResponse } from "@/interface/IApiDetailsResponse";

export interface FutsalData {
  id: number;
  name: string;
  city: string;
  district: string;
  registrationNumber: string;
  registrationPhoto: string;
  coverImage: string;
  latitude: number | null;
  longitude: number | null;
  images: string[];
}

export type IFutsalDetailsResponse = IApiDetailResponse<FutsalData>;
