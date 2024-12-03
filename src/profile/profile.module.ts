import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [ProfileController],
})
export class ProfileModule {}
