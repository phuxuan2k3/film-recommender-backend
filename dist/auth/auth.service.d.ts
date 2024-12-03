import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signIn(userData: CreateUserDto): Promise<{
        access_token: string;
    }>;
    signUp(userData: CreateUserDto): Promise<{
        message: string;
    }>;
}
