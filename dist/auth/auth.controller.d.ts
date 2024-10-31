import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    create(userData: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
