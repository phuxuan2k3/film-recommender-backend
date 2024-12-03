"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const bcryptjs = require("bcryptjs");
const profile_user_dto_1 = require("./dto/profile-user.dto");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOneByID(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return new profile_user_dto_1.ProfileUser(user);
    }
    async create(dataInfo) {
        const hashedPassword = await bcryptjs.hash(dataInfo.password, 10);
        const newData = new create_user_dto_1.CreateUserDto({
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
    async findOneByEmail(email) {
        return await this.prisma.user.findUnique({ where: { email } });
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map