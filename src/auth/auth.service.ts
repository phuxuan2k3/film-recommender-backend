import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FirebaseAdminService } from 'config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  GoogleAuthProvider,
  Auth,
  signInWithCredential,
  deleteUser,
} from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { FirebaseAuthService } from 'src/firebase-auth/firebase-auth.service';
import { console } from 'inspector';

@Injectable()
export class AuthService {
  isVerify() {
    try {
      console.log('getAuth().currentUser', getAuth().currentUser);
      return getAuth().currentUser.emailVerified ? true : (() => { throw new UnauthorizedException('Email not verified'); })();
    } catch (error) {
      console.error('Error verifying email:', error);
      throw new UnauthorizedException('Error verifying email');
    }
  }


  private authen: FirebaseApp;
  private auth: Auth;
  private provider: GoogleAuthProvider;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private firebaseService: FirebaseAdminService,
    private firebaseAuthService: FirebaseAuthService,
  ) {
    this.authen = this.firebaseService.connect();
    this.auth = getAuth(this.authen);

    this.provider = new GoogleAuthProvider();
  }

  async signIn(userData: { email: string; password: string }) {
    let res: any;
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        userData.email,
        userData.password,
      );
      const user = userCredential.user;

      //xtodo: get user from database 
      const jwt = this.jwtService.sign({ email: user.email, firstName: user.displayName, lastName: '' });

      res = { email: user.email, token: jwt, firstName: user.displayName, lastName: '' };
    } catch (error) {
      const errorMessage = error.message;
      res = { message: errorMessage };
      throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
    }

    return res;
  }

  async resetPassword(email: string) {

    await this.firebaseAuthService.sendPasswordResetEmail(email);
  }

  async signInWithGoogle(idToken: string) {
    try {
      console.log('idToken', idToken);
      const decodedToken = await this.firebaseAuthService.verifyIdToken(idToken);
      const jwt = this.jwtService.sign({ email: decodedToken.email, firstName: decodedToken.name, lastName: '' });

      //update user emailVerified to true
      const currentUser = getAuth().currentUser;
      if (!currentUser) {
        throw new UnauthorizedException('User not authenticated');
      }
      await this.firebaseAuthService.updateUser(currentUser, new CreateUserDto({ emailVerified: true }));
      //xtodo: get user from database

      const res = {
        email: decodedToken.email,
        token: jwt,
        firstName: decodedToken.name, lastName: ''
      }

      return res;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException('Invalid Google ID Token');
    }
  }

  async signUp(userData: CreateUserDto) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        userData.email,
        userData.password,
      );
      const user = userCredential.user;

      //xtodo: save user to database
      this.firebaseAuthService.updateUser(user, userData);

      const jwt = this.jwtService.sign({ email: user.email, firstName: userData.firstName, lastName: userData.lastName });
      const res = { email: user.email, token: jwt, firstName: userData.firstName, lastName: userData.lastName };
      this.firebaseAuthService.sendVerifyAccountEmail(user.email);
      return res;
    } catch (error) {
      const errorMessage = error.message;
      console.log('error', errorMessage);
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  async logOut() {
    try {
      await signOut(this.auth);
      return { message: 'Log out successfully!' };
    } catch (error) {
      const errorMessage = error.message;
      console.log('error', errorMessage);
      return { message: errorMessage };
    }
  }

  async verifyEmail() {
    const currentUser = getAuth().currentUser;
    if (!currentUser) {
      throw new UnauthorizedException('User not authenticated');
    }
    const email = currentUser.email;
    await this.firebaseAuthService.sendVerifyAccountEmail(email);
  }



  async delete() {
    const currentUser = getAuth().currentUser;
    console.log('currentUser', currentUser);
    if (!currentUser) {
      throw new UnauthorizedException('User not authenticated');
    }
    await deleteUser(currentUser);
    console.log('User deleted');
  }
}