export type PagingResult<T> = {
    results: T[];
    page: number;
    total_pages: number;
    total_results: number;
};