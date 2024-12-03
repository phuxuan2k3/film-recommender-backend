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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async create(
    @Body(new ValidationPipe({ whitelist: true })) userData: CreateUserDto,
  ) {
    return await this.authService.signIn(userData);
  }

  @Public()
  @Post('register')
  async register(
    @Body(new ValidationPipe({ whitelist: true })) userData: CreateUserDto,
  ) {
    return await this.authService.signUp(userData);
  }
}
