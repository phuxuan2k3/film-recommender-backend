import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findOneByID(arg0: number): void;
    create(dataInfo: CreateUserDto): Promise<{
        message: string;
    }>;
    findAll(): string;
    findOneByEmail(email: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
