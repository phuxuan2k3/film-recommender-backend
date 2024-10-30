import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findOneByID(arg0: number) {
    throw new Error('Method not implemented.');
  }

  async create(dataInfo: CreateUserDto): Promise<{ message: string }> {
    const existingUser = await this.findOneByEmail(dataInfo.email);
    if (existingUser) {
      throw new HttpException('Email is already used!', HttpStatus.BAD_REQUEST);
    }

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

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
