import { IsDate, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  constructor(data: Partial<CreateUserDto>) {
    Object.assign(this, data);
  }
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;

  readonly createdAt: Date | null;
}
