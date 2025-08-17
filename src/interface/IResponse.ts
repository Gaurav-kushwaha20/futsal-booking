interface IPaginatedData<T> {
 data: T[];
 page: number;
 pageSize: number;
 totalItems: number;
 totalPages: number;
 counter: number;
}
export interface IApiPaginationResponse<T> {
 message: string;
 code: number;
 success: boolean;
 data: IPaginatedData<T>;
 errors: string[] | null;
}

// Details Response
export interface IApiDetailsResponse<T> {
 message: string;
 code: number;
 success: boolean;
 data: T;
 errors: string[] | null;
}

// Response
export interface IApiResponse {
 data?: {
  message: string;
  code: number;
  error: string;
 };
 error?: {
  data: {
   message: string;
   code: number;
   erroor: null;
  };
 };
}
