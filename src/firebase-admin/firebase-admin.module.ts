// src/firebase-admin/firebase-admin.module.ts
import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { EmailService } from 'src/email/email.service';
import { FirebaseAuthService } from 'src/firebase-auth/firebase-auth.service';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        const serviceAccount = {
          "project_id": process.env.FIREBASE_PROJECT_ID,
          "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          "clientEmail": process.env.FIREBASE_CLIENT_EMAIL,
        }
        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      },
    },
    FirebaseAuthService,
    EmailService,
  ],
  exports: ['FIREBASE_ADMIN', FirebaseAuthService],
})
export class FirebaseAdminModule { }
