// config/firebase.ts
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class FirebaseAdminService {
  constructor(@Inject('FIREBASE_CONFIG') private firebaseConfig: any) { }

  connect() {
    const app: FirebaseApp = initializeApp(this.firebaseConfig);
    return app;
  }
}
