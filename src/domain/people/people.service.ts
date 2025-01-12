import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { People, PeopleDocument } from './schemas/people.schema';
import { REST_CONNECTION_NAME } from 'src/common/const';
import { Model } from 'mongoose';
import { PeopleMediumPresenter } from './response/people-small.presenter';
import { PeopleMoviePresenter } from './response/people-movie.presenter';

@Injectable()
export class PeopleService {
    constructor(
        @InjectModel(People.name, REST_CONNECTION_NAME) private peopleModel: Model<PeopleDocument>,
    ) { }

    async getDetail(people_id: number): Promise<PeopleMediumPresenter> {
        const doc = await this.peopleModel
            .findOne({ id: people_id }, PeopleMediumPresenter.getProjection())
            .lean();
        return doc;
    }

    async getActingList(people_id: number): Promise<PeopleMoviePresenter[]> {
        const doc = await this.peopleModel
            .findOne({ id: people_id }, { movie_credits: 1 })
            .lean();
        return doc.movie_credits.cast;
    }
}
