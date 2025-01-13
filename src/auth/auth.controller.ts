import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './public';

@Public()
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService
  ) { }

  @Post('login')
  async login(@Body() userData: CreateUserDto) {
    console.log(userData);
    return await this.authService.signIn(userData);
  }

  @Post('loginWithGoogle')
  async loginGoole(@Body('idToken') idToken: string) {
    return await this.authService.signInWithGoogle(idToken);
  }

  @Post('register')
  async register(
    @Body() // new ValidationPipe({ whitelist: true })
    userData: CreateUserDto,
  ) {
    console.log(userData);

    return await this.authService.signUp(userData);
  }

  @Post('logout')
  async logOut() {
    return await this.authService.logOut();
  }
}
