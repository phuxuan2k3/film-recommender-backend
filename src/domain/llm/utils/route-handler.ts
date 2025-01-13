import { RoutePresenter } from "../presenter/route-presenter";

enum PageEnum {
    HOME_PAGE = 'HOME_PAGE',
    SEARCH_PAGE = 'SEARCH_PAGE',
    MOVIE_PAGE = 'MOVIE_PAGE',
    GENRE_PAGE = 'GENRE_PAGE',
    CAST_PAGE = 'CAST_PAGE',
    PROFILE_PAGE = 'PROFILE_PAGE',
    NONE = 'NONE',
}

export function routeToURL(route: RoutePresenter): string {
    switch (route.route) {
        case PageEnum.HOME_PAGE:
            return '/home';
        case PageEnum.PROFILE_PAGE:
            return '/profile';
        case PageEnum.NONE:
            return '#';
        case PageEnum.SEARCH_PAGE:
            return `/search?keyword=${route.params?.keyword}`;
        case PageEnum.CAST_PAGE:
        case PageEnum.MOVIE_PAGE:
            return route.params?.movie_ids ? `/movies?ids=${route.params.movie_ids.join(',')}` : '/movies';
        case PageEnum.GENRE_PAGE:
            return route.params?.genres_id ? `/genres?ids=${route.params.genres_id.join(',')}` : '/genres';
        default:
            return '/';
    }
}