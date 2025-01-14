export class UserMovieInfo {
    is_favorite: boolean;
    is_watchlist: boolean;
    is_rated: boolean;
    score_rated: number;
    static getProjection() {
        return {
            is_favorite: 1,
            is_watchlist: 1,
            is_rated: 1,
            score_rated: 1
        };
    }
}