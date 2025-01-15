import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersAccountService } from '../domain/users/exports/users-account.service';
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
import { UserCreateBody } from 'src/domain/users/request/user-create.body';
import { UsersService } from '../domain/users/services/users.service';

@Injectable()
export class AuthService {

  async isVerify(jwt: string) {
    try {
      console.log('jwt rec', jwt);
      const decoded = this.jwtService.decode(jwt);
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.firebaseAuthService.getUserByEmail(decoded.email);

      return user.emailVerified ? true : (() => { throw new UnauthorizedException('Email not verified'); })();
    } catch (error) {
      console.error('Error verifying email:', error);
      throw new UnauthorizedException('Error verifying email');
    }
  }


  private authen: FirebaseApp;
  private auth: Auth;
  private provider: GoogleAuthProvider;

  constructor(
    private readonly usersAccountService: UsersAccountService,
    private jwtService: JwtService,
    private firebaseService: FirebaseAdminService,
    private firebaseAuthService: FirebaseAuthService,
    private usersService: UsersService
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

      console.log('user by email sign in', await this.firebaseAuthService.getUserByEmail(user.email));

      //xtodo: get user from database 
      const jwt = this.jwtService.sign({ email: user.email, firstName: user.displayName, lastName: '' });

      res = { email: user.email, token: { accessToken: jwt, refreshToken: jwt }, firstName: user.displayName, lastName: '' };
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
      const decodedToken = await this.firebaseAuthService.verifyIdToken(idToken);

      const userFireBase = await this.firebaseAuthService.getUserByEmail(decodedToken.email);

      const existingUser = await this.usersService.getDetail(userFireBase.uid);
      if (!existingUser) {
        const userCreateBody = new UserCreateBody();
        userCreateBody.email = userFireBase.email;
        userCreateBody.first_name = userFireBase.displayName;
        userCreateBody.last_name = ' ';
        userCreateBody.avatar_path = ' ';
        await this.usersAccountService.create(userFireBase.uid, userCreateBody);
      }

      const jwt = this.jwtService.sign({ sub: userFireBase.uid, email: decodedToken.email, firstName: decodedToken.name, lastName: '' });
      console.log('jwt send', jwt);
      const res = {
        email: decodedToken.email,
        token: { accessToken: jwt, refreshToken: jwt },
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

      //xtodo: create user in database
      const userFireBase = await this.firebaseAuthService.getUserByEmail(user.email);
      const existingUser = await this.usersService.getDetail(userFireBase.uid);
      if (!existingUser) {
        const userCreateBody = new UserCreateBody();
        userCreateBody.email = userFireBase.email;
        userCreateBody.first_name = userData.firstName;
        userCreateBody.last_name = userData.lastName;
        userCreateBody.avatar_path = userData.avatarPath;
        await this.usersAccountService.create(userFireBase.uid, userCreateBody);
      }

      this.firebaseAuthService.updateUser(user, userData);

      const jwt = this.jwtService.sign({ email: user.email, firstName: userData.firstName, lastName: userData.lastName });
      const res = { email: user.email, token: { accessToken: jwt, refreshToken: jwt }, firstName: userData.firstName, lastName: userData.lastName };
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

  async verifyEmail(email: string) {

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