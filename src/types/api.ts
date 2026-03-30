export interface BaseMeta {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    filter?: string;
    sort?: string;
}

export interface BaseApiResponse<T = any> {
    status?: string;
    response_code?: number;
    message?: string;
    data?: T;
    meta?: BaseMeta;
    error?: string;
}
