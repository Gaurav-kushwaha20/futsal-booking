import { IApiDetailsResponse, IApiPaginationResponse } from '@/interface/IResponse';

export interface ITimeSlotListItem {
 id: number;
 futsalId: number;
 futsalName: string;
 startTime: string;
 endTime: string;
 price: number;
}
export type ITimeSlotListResponse = IApiPaginationResponse<ITimeSlotListItem>;

// time slot details
interface ITimeSlotDetails {
 id: number;
 futsalId: number;
 futsalName: string;
 startTime: string;
 endTime: string;
 price: number;
}
export type ITimeSlotDetailsResponse = IApiDetailsResponse<ITimeSlotDetails>;
