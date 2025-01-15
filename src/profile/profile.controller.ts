import {
  Controller,
  Get,
  Request,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Public } from 'src/auth/public';
import { ProfileUser } from 'src/user/dto/profile-user.dto';
import { UserService } from 'src/user/user.service';

@Public()
@Controller('profile')
export class ProfileController {
  constructor(private userService: UserService) { }

  @Get()
  async getProfile(@Request() req): Promise<ProfileUser | null> {
    if (!req.user) {
      throw new UnauthorizedException('ID is required');
    }
    return await this.userService.findOneByID(req.user.sub);
  }
}
