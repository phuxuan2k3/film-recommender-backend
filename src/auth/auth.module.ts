import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth.guard';
import { FirebaseAdminService } from 'config/firebase';
import { firebaseConfig } from 'config/firebase.config';
import * as dotenv from 'dotenv';
import { FirebaseAdminModule } from 'src/firebase-admin/firebase-admin.module';
dotenv.config();

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    FirebaseAdminModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    FirebaseAdminService,
    {
      provide: 'FIREBASE_CONFIG',
      useValue: firebaseConfig,
    },
  ],
  exports: [AuthService],
})
export class AuthModule { }
