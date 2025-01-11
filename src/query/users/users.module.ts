import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersActionService } from './services/users-aggregate.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { UsersService } from './services/users.service';
import { MoviesModule } from '../movies/movies.module';
import { UsersAccountService } from './exports/users-account.service';

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
    UsersService,
    UsersAccountService,
  ],
  exports: [
    UsersAccountService,
  ]
})
export class UsersModule { }
