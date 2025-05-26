export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    errors?: string[];
    timestamp: string;
    pagination?: Pagination;
}
