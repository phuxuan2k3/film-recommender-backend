import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { ProfileUser } from './dto/profile-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findOneByID(id: number): Promise<ProfileUser | null>;
    create(dataInfo: CreateUserDto): Promise<{
        message: string;
    }>;
    findAll(): string;
    findOneByEmail(email: string): Promise<UserEntity | null>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
