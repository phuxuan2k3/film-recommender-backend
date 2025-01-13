import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { MoviesModule } from './query/movies/movies.module';
import { UsersModule } from './query/users/users.module';
import { MOVIES_CONNECTION_NAME, REST_CONNECTION_NAME } from './common/const';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { FirebaseAdminModule } from './firebase-admin/firebase-admin.module';
import { FirebaseAuthService } from './firebase-auth/firebase-auth.service';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60, limit: 10, }]),

    MongooseModule.forRoot(process.env.MONGO_URL_MOVIES, {
      dbName: process.env.MONGO_DB_MOVIES || "TMDB",
      connectionName: MOVIES_CONNECTION_NAME
    }),
    MongooseModule.forRoot(process.env.MONGO_URL_REST, {
      dbName: process.env.MONGO_DB_REST || "TMDB",
      connectionName: REST_CONNECTION_NAME
    }),

    AuthModule,
    ProfileModule,
    MoviesModule,
    UsersModule,
    FirebaseAdminModule,

  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }, FirebaseAuthService,
    EmailService],
})
export class AppModule { }
