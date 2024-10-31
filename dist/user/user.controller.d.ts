import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(userData: CreateUserDto): Promise<{
        message: string;
    }>;
    findAll(): string;
    findOne(id: string): void;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
