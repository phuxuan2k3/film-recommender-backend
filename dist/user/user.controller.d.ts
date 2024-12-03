import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): string;
    findOne(id: string): Promise<import("./dto/profile-user.dto").ProfileUser>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
