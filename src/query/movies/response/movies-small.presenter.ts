export class MovieSmallPresenter {
    id: number;
    tmdb_id: number;
    adult: boolean;
    backdrop_path: string;
    categories: string[];
    // genre_ids: number[];
    // media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;

    static getProjection() {
        return {
            _id: 1,
            tmdb_id: 1,
            adult: 1,
            backdrop_path: 1,
            categories: 1,
            genre_ids: 1,
            id: 1,
            media_type: 1,
            original_language: 1,
            original_title: 1,
            overview: 1,
            popularity: 1,
            poster_path: 1,
            release_date: 1,
            title: 1,
            video: 1,
            vote_average: 1,
            vote_count: 1
        };
    }
}
