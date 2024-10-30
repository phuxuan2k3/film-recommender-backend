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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async create(
    @Body(new ValidationPipe({ whitelist: true })) userData: CreateUserDto,
  ) {
    return {
      access_token: (
        await this.authService.signIn(userData.email, userData.password)
      ).access_token,
    };
  }
}
