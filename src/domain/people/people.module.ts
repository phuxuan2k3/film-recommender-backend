import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { MongooseModule } from '@nestjs/mongoose';
import { REST_CONNECTION_NAME } from 'src/common/const';
import { People, PeopleSchema } from './schemas/people.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: People.name,
                schema: PeopleSchema,
            },
        ], REST_CONNECTION_NAME),
    ],
    controllers: [PeopleController],
    providers: [PeopleService]
})
export class PeopleModule { }
