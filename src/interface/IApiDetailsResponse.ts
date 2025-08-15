export interface IApiDetailResponse<T> {
    message: string;
    code: number;
    success: boolean;
    data: T;
    errors: null;
}

