export class PeopleMediumPresenter {
    id: number;
    tmdb_id: number;
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;

    static getProjection(): Record<string, number> {
        return {
            tmdb_id: 1,
            adult: 1,
            also_known_as: 1,
            biography: 1,
            birthday: 1,
            deathday: 1,
            gender: 1,
            homepage: 1,
            id: 1,
            imdb_id: 1,
            known_for_department: 1,
            name: 1,
            place_of_birth: 1,
            popularity: 1,
            profile_path: 1
        };
    }
}