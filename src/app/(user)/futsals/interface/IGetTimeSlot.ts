import { IApiPaginationResponse } from '@/interface/IResponse';

export interface ITimeSlot {
 id: number;
 futsalId: number;
 futsalName: string;
 startTime: string; // format: "HH:mm:ss"
 endTime: string; // format: "HH:mm:ss"
 price: number;
}
export type TimeSlotByFutsalResponse = IApiPaginationResponse<ITimeSlot>;
