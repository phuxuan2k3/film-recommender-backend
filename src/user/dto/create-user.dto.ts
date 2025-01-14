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

  // firstName: z.string().regex(/^[A-Za-z]+$/, 'First name must contain only letters'),
  // lastName: z.string().regex(/^[A-Za-z]+$/, 'Last name must contain only letters'),
  // email: z.string().email('Invalid email provided'),
  // password: z.string().min(6, 'Password must be at least 6 characters long'),
  // avatarPath: z.string().optional(),

  @IsNotEmpty({ message: 'First name is required' })
  readonly firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  readonly lastName: string;

  readonly avatarPath: string | "https://api-private.atlassian.com/users/9cea692d0a59c5e100680165cbbeb496/avatar";

  readonly emailVerified: boolean | null;

  readonly createdAt: Date | null;
}
