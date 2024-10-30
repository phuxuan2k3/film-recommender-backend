import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/authguard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // This route is protected by the AuthGuard
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    return "This is the user's profile";
  }

  @UseGuards(AuthGuard)
  @Get('dashboard')
  getDashboard() {
    return 'This is the dashboard';
  }
}
