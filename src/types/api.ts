export interface BaseApiResponse<T = any> {
    status?: string;
    response_code?: number;
    message?: string;
    data?: T;
    error?: string;
}
