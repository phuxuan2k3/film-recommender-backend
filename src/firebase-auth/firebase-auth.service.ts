// src/firebase-admin/firebase-auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthService {
    async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            return decodedToken;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
