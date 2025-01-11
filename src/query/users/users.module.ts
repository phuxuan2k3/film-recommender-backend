import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersActionService } from './services/users-aggregate.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { UsersPersonalService } from './services/users-personal.service';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    MoviesModule
  ],
  controllers: [UsersController],
  providers: [
    UsersActionService,
    UsersPersonalService,
  ]
})
export class UsersModule { }
