import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { baseLLMUrl, GEMINI_API_KEY } from 'src/common/env';
import { LLMSearchQuery as LLMSearchQuery } from '../param/llm-search.query';
import { NavigateBody } from '../param/navigate.body';
import { MoviesLLMService } from './movies-llm.service';
import { PagingResult } from 'src/domain/common/dto/paging.result';
import { MovieSmallPresenter } from 'src/domain/movies/response/movies-small.presenter';
import { AxiosError } from 'axios';
import { RoutePresenter } from '../presenter/route-presenter';
import { firstValueFrom } from 'rxjs';
import { RouteHandlerService } from './route-handler';

const healthyUrl = baseLLMUrl + '/healthy';
const retrieverUrl = baseLLMUrl + '/retriever/';
const navigateUrl = baseLLMUrl + '/navigate/';

const movies_collection = 'movies';

@Injectable()
export class LlmService {
    constructor(
        private readonly httpService: HttpService,
        private readonly llmMoviesService: MoviesLLMService,
        private readonly llmRouteHandlerService: RouteHandlerService
    ) { }

    async ping() {
        return (await this.httpService.axiosRef.get(healthyUrl)).data;
    }

    async llmQuerySearchMovies(query: LLMSearchQuery): Promise<PagingResult<MovieSmallPresenter>> {
        const response = (await this.httpService.axiosRef.get(retrieverUrl, {
            params: {
                llm_api_key: GEMINI_API_KEY,
                collection_name: movies_collection,
                query: query.query,
                amount: query.amount,
                threshold: query.threshold
            }
        }).catch(err => {
            if (err instanceof AxiosError) {
                throw new Error('axios: ' + err.message);
            }
            throw new Error('Unknown error');
        }));
        const mongo_ids = response.data.data.result;
        const movies = await this.llmMoviesService.transferMovies(mongo_ids);
        const total_results = movies.length;
        const total_pages = Math.ceil(total_results / query.limit);
        const offset = (query.page - 1) * query.limit;
        const movies_slice = movies.slice(offset, offset + query.limit);
        return {
            page: query.page,
            total_results: total_results,
            total_pages: total_pages,
            results: movies_slice
        };
    }

    async llmNavigate(body: NavigateBody): Promise<string> {
        try {
            const response = await firstValueFrom(this.httpService.post(navigateUrl, null, {
                params: {
                    llm_api_key: GEMINI_API_KEY,
                    query: body.query,
                }
            }));
            const route_presenter = response.data.data as RoutePresenter;
            return this.llmRouteHandlerService.routeToURL(route_presenter);
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new Error('axios: ' + err.message);
            }
            throw new Error('Unknown error');
        }
    }
}
