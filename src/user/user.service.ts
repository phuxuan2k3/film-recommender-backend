import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { ProfileUser } from './dto/profile-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOneByID(id: number): Promise<ProfileUser | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return new ProfileUser(user);
  }

  async create(dataInfo: CreateUserDto): Promise<{ message: string }> {
    const hashedPassword = await bcryptjs.hash(dataInfo.password, 10);
    const newData = new CreateUserDto({
      ...dataInfo,
      password: hashedPassword,
    });
    console.log(newData);

    await this.prisma.user.create({ data: newData });

    return { message: 'User registered successfully!' };
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
