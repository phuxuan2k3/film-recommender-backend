// src/firebase-admin/firebase-auth.service.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { actionCodeSettings } from 'config/email-action'
import { EmailService } from 'src/email/email.service';
import { User } from 'firebase/auth';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Injectable()
export class FirebaseAuthService {
    updateUser(user: User, userData: CreateUserDto) {
        this.firebase.auth().updateUser(user.uid, {
            email: userData.email,
            password: userData.password,
            displayName: userData.lastName + ' ' + userData.firstName,
            photoURL: userData.avatarPath,
        });
    }
    constructor(@Inject('FIREBASE_ADMIN') private readonly firebase: admin.app.App, private emailService: EmailService
    ) { }

    async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            return decodedToken;
        } catch (error) {
            console.log('Error verifying token:', error);
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    async sendVerifyAccountEmail(email: string) {
        try {
            console.log(`Sending verification email to ${email}`);
            const link = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings);

            // Gửi email chứa link
            const subject = 'Verify Your Email';
            const text = `Click the following link to verify your email: ${link}`;
            const html = `
        <p>Hi,</p>
        <p>You need to verify your email to activate your account. Click the link below to verify it:</p>
        <a href="${link}">Verify Email</a>
        <p>If you did not create an account, please ignore this email.</p>
      `;

            await this.emailService.sendEmail(email, subject, text, html);

            return link;
        } catch (error) {
            throw new Error(`Failed to generate verification link: ${error.message}`);
        }
    }

    async sendPasswordResetEmail(email: string) {
        try {
            console.log(`Sending password reset email to ${email}`);
            const resetLink = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);


            // Gửi email chứa resetLink
            const subject = 'Password Reset Request';
            const text = `Click the following link to reset your password: ${resetLink}`;
            const html = `
        <p>Hi,</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
      `;

            await this.emailService.sendEmail(email, subject, text, html);

            return resetLink;
        } catch (error) {
            throw new Error(`Failed to generate reset link: ${error.message}`);
        }
    }
}
