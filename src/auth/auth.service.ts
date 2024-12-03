import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userData: CreateUserDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(userData.email);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordValid = await bcryptjs.compare(
      userData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id, email: user.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(userData: CreateUserDto) {
    const existingUser = await this.userService.findOneByEmail(userData.email);
    if (existingUser) {
      throw new HttpException('Email is already used!', HttpStatus.BAD_REQUEST);
    }
    await this.userService.create(userData);

    return { message: 'User registered successfully!' };
  }
}
