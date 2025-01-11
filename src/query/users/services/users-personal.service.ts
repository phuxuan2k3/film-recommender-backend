import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/users.schema';
import { REST_CONNECTION_NAME } from 'src/common/const';
import { Model } from 'mongoose';

@Injectable()
export class UsersPersonalService {
    constructor(
        @InjectModel(User.name, REST_CONNECTION_NAME) private userModel: Model<User>
    ) { }

    async getDetail(user_id: string): Promise<User> {
        const users = await this.userModel.findOne({ id: user_id }).exec();
        if (!users) return null;
        return users;
    }

    // Database sharding?
    async create(): Promise<void> {
    }

    async update(): Promise<void> {
    }

    async delete(): Promise<void> {
    }
}
