export class MovieMediumPresenter {
    id: number;
    tmdb_id: number;
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: string;
    budget: number = 0;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    categories: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number = 0;
    runtime: number = 0;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;

    static getProjection() {
        return {
            id: 1,
            tmdb_id: 1,
            adult: 1,
            backdrop_path: 1,
            belongs_to_collection: 1,
            budget: 1,
            genres: 1,
            homepage: 1,
            categories: 1,
            original_language: 1,
            original_title: 1,
            overview: 1,
            popularity: 1,
            poster_path: 1,
            production_companies: 1,
            production_countries: 1,
            release_date: 1,
            revenue: 1,
            runtime: 1,
            spoken_languages: 1,
            status: 1,
            tagline: 1,
            title: 1,
            video: 1,
            vote_average: 1,
            vote_count: 1
        };
    }
}