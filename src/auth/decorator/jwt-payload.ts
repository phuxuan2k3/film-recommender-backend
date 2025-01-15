import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

export type JwtPayloadData = {
    email: string;
    firstName: string;
    lastName: string;
    iat: number;
    exp: number;
}

export const JwtPayload = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): JwtPayloadData => {
        const request = ctx.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Authorization header missing or invalid');
        }
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT secret not provided');
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded as JwtPayloadData;
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    },
);
