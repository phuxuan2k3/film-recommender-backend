export declare class CreateUserDto {
    constructor(data: Partial<CreateUserDto>);
    email: string;
    readonly password: string;
    readonly createdAt: Date | null;
}
