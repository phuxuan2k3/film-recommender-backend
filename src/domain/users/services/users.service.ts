import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/users.schema';
import { REST_CONNECTION_NAME } from 'src/common/const';
import { Model } from 'mongoose';
import { PagingQuery } from 'src/domain/common/dto/paging.query';
import { PagingResult } from 'src/domain/common/dto/paging.result';
import { UserSmallPresenter } from '../response/user-small.presenter';
import { UserUpdateBody } from '../request/user-update.body';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name, REST_CONNECTION_NAME) private userModel: Model<User>
    ) { }

    async getUserIdFromEmail(email: string): Promise<string> {
        const user = await this.userModel.findOne({
            email: email
        }).lean();
        if (!user) return null;
        return user.id;
    }

    async getDetail(user_id: string): Promise<User> {
        const users = await this.userModel.findOne({ id: user_id }).exec();
        if (!users) return null;
        return users;
    }

    async geAlltUsers(query: PagingQuery): Promise<PagingResult<UserSmallPresenter>> {
        const { page, limit } = query;
        const users = await this.userModel.find({}, UserSmallPresenter.getProjection())
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        const total_results = await this.userModel.countDocuments();
        const total_pages = Math.ceil(total_results / limit);
        return {
            page,
            results: users,
            total_results,
            total_pages
        };
    }

    async update(param: UserUpdateBody): Promise<void> {
        await this.userModel.updateOne({ id: param.id }, param);
    }
    async delete(id: string): Promise<void> {
        await this.userModel.deleteOne({ id });
    }
}
