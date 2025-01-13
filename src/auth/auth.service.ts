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
} from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { FirebaseAuthService } from 'src/firebase-auth/firebase-auth.service';


@Injectable()
export class AuthService {
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

  async signIn(userData: CreateUserDto) {
    let res: any;
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        userData.email,
        userData.password,
      );
      const user = userCredential.user;

      //xtodo: get user from database 
      const jwt = this.jwtService.sign({ email: user.email, firstName: 'xuan', lastName: 'nguyen' });

      res = { email: user.email, token: jwt, firstName: 'xuan', lastName: 'nguyen' };
    } catch (error) {
      const errorMessage = error.message;
      res = { message: errorMessage };
    }

    console.log(res);
    return res;
  }

  async signInWithGoogle(idToken: string) {
    try {
      const decodedToken = await this.firebaseAuthService.verifyIdToken(idToken);
      console.log(decodedToken);
      const jwt = this.jwtService.sign({ email: decodedToken.email, firstName: decodedToken.name, lastName: 'nguyen' });

      const res = {
        token: jwt,
        firstName: decodedToken.name, lastName: 'nguyen'
      }

      return res;

      //     const response = await axios.get(
      //       `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
      //     );
      //     const payload = response.data;
      //     const { email, name, picture, sub: googleUid } = payload;
      //     try {
      //       const userCredential = await signInWithCustomToken(this.auth, idToken);
      //       return {
      //         token: await userCredential.user.getIdToken(),
      //         user: {
      //           email: userCredential.user.email,
      //           displayName: userCredential.user.displayName,
      //           photoURL: userCredential.user.photoURL,
      //         },
      //       };
      //     } catch {
      //       // Create a new user if they don't exist
      //       const newUser = await createUserWithEmailAndPassword(
      //         this.auth,
      //         email,
      //         googleUid,
      //       );
      //       return {
      //         token: await newUser.user.getIdToken(),
      //         user: {
      //           email: newUser.user.email,
      //           displayName: name,
      //           photoURL: picture,
      //         },
      //       };
      //     }
    } catch (error) {
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
      const jwt = this.jwtService.sign({ email: user.email, firstName: 'xuan', lastName: 'nguyen' });
      const res = { email: user.email, token: jwt, firstName: 'xuan', lastName: 'nguyen' };

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
      console.log('logout');

      return { message: 'Log out successfully!' };
    } catch (error) {
      const errorMessage = error.message;
      console.log('error', errorMessage);
      return { message: errorMessage };
    }
  }
}