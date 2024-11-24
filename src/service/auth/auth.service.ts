import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './auth-dto/login-dto';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken'



@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UsersService,
        private readonly configService: ConfigService
    ){}

    async login(payload: LoginDto) : Promise<object>{
        const found = await this.userService.getUserByEmail(payload.email)

        await this.userService.comparePassword(payload.password, found.password)

        const jwtPayload : object = {
            id: found.id,
            email: found.email,
            role: found.role
        }

        const token = jwt.sign(jwtPayload, this.configService.get<string>('SECRET_KEY'), {
            expiresIn: '1h'
        })

        return {token}
    }

    validateToken(token: string): any{
        const tokenValid = jwt.verify(token, this.configService.get<string>('SECRET_KEY'))
        return tokenValid
    }
}
