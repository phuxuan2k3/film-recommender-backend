import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Public } from './auth/public';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
