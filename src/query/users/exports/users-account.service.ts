import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/users.schema';
import { REST_CONNECTION_NAME } from 'src/common/const';
import { Model } from 'mongoose';
import { UserCreateParam } from '../request/user-create.param';
import { v4 } from 'uuid';

@Injectable()
export class UsersAccountService {
    constructor(
        @InjectModel(User.name, REST_CONNECTION_NAME) private userModel: Model<User>
    ) { }

    async create(param: UserCreateParam): Promise<void> {
        const id = v4();
        await this.userModel.create({
            id,
            ...param,
            rating_movies_id: [],
            favorite_movies_id: [],
            watchlist_movies_id: [],
            history_movies_id: []
        });
    }
}
