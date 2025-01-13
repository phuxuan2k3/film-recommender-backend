import { Inject, Injectable } from "@nestjs/common";
import { RoutePresenter } from "../presenter/route-presenter";
import { MoviesExportService } from "src/domain/movies/exports/movie-export.service";

enum PageEnum {
    HOME_PAGE = 'HOME_PAGE',
    SEARCH_PAGE = 'SEARCH_PAGE',
    MOVIE_PAGE = 'MOVIE_PAGE',
    GENRE_PAGE = 'GENRE_PAGE',
    CAST_PAGE = 'CAST_PAGE',
    PROFILE_PAGE = 'PROFILE_PAGE',
    NONE = 'NONE',
}

@Injectable()
export class RouteHandlerService {
    constructor(
        private readonly moviesExportService: MoviesExportService
    ) { }

    routeToURL(route: RoutePresenter): string {
        switch (route.route) {
            case PageEnum.NONE:
                return null;
            case PageEnum.HOME_PAGE:
                return '/';
            case PageEnum.PROFILE_PAGE:
                return '/profile';
            case PageEnum.SEARCH_PAGE:
                return `/movies/search?query=${route.params?.keyword}`;
            case PageEnum.CAST_PAGE:
                return null;
            case PageEnum.MOVIE_PAGE:
                if (route.params?.movie_ids && route.params?.movie_ids.length > 0) {
                    const movie_id = route.params.movie_ids[0];
                    const id = this.moviesExportService.getMovieById(movie_id);
                    return `/movies/:${id}`;
                }
                return null;
            case PageEnum.GENRE_PAGE:
                return null;
            default:
                return null;
        }
    }
}

