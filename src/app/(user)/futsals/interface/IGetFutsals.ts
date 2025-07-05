import { IFutsal } from "@/app/owner/(owner)/futsals/interface/IGetFutsals";

export interface IGetFutsalSuccess {
 message: string;
 code: number;
 success: boolean;
 data: {
  data: IFutsal[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
 };
 errors: null;
}
