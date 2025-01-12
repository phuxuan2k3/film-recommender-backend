export class PeopleMoviePresenter {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
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
    character: string;
    credit_id: string;
    order: number;

    static getProjection(): Record<string, number> {
        return {
            adult: 1,
            backdrop_path: 1,
            genre_ids: 1,
            id: 1,
            original_language: 1,
            original_title: 1,
            overview: 1,
            popularity: 1,
            poster_path: 1,
            release_date: 1,
            title: 1,
            video: 1,
            vote_average: 1,
            vote_count: 1,
            character: 1,
            credit_id: 1,
            order: 1
        };
    }
}