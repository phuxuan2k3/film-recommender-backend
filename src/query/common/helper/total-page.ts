export function totalPage(total_results: number, limit: number): number {
    return Math.ceil(total_results / limit);
}