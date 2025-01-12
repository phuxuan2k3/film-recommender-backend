export class PeopleSmallPresenter {
    id: number;
    tmdb_id: number;
    adult: boolean;
    gender: number;
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;

    static getProjection(): Record<string, number> {
        return {
            id: 1,
            tmdb_id: 1,
            adult: 1,
            gender: 1,
            known_for_department: 1,
            name: 1,
            popularity: 1,
            profile_path: 1
        };
    }
}