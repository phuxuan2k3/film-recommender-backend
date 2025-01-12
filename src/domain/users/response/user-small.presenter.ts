export class UserSmallPresenter {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar_path: string;
    country: string;
    static getProjection() {
        return {
            id: 1,
            username: 1,
            first_name: 1,
            last_name: 1,
            email: 1,
            avatar_path: 1,
            country: 1,
        };
    }
}