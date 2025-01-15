import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './public';
import { JwtService } from '@nestjs/jwt';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private jwtService: JwtService,
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
  async isVerify(@Request() req) {
    const jwt = req.headers.authorization.split(' ')[1];
    return await this.authService.isVerify(jwt);
  }

  @Get('verify')
  async verifyEmail(@Request() req) {
    const jwt = req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.decode(jwt);
    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }

    return await this.authService.verifyEmail(decoded.email);
  }

  @Delete('delete')
  async delete() {
    return await this.authService.delete();
  }
}
