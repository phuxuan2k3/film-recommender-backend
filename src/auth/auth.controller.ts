import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
  Delete,
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
  async login(@Body('email') email: string, @Body('password') password: string) {
    return await this.authService.signIn({ email, password });
  }

  @Post('resetPassword')
  async resetPassword(@Body('email') email: string) {
    return await this.authService.resetPassword(email);
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
    return await this.authService.signUp(userData);
  }

  @Post('logout')
  async logOut() {
    return await this.authService.logOut();
  }

  @Get('isVerify')
  async isVerify() {
    return await this.authService.isVerify();
  }

  @Get('verify')
  async verifyEmail() {
    return await this.authService.verifyEmail();
  }

  @Delete('delete')
  async delete() {
    return await this.authService.delete();
  }
}
