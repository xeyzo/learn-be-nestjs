import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './auth-dto/login-dto';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'




@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UsersService,
        private readonly configService: ConfigService
    ){}

    async login(payload: LoginDto) : Promise<object>{
        const found = await this.userService.getUserByEmail(payload.email)

        await this.comparePassword(payload.password, found.password)

        const jwtPayload : object = {
            id: found.id,
            email: found.email,
            role: found.role
        }

        const token = this.encode(jwtPayload)
        return {token}
    }

    encode(payload : object): any{
        const encodeToken = jwt.sign(payload, this.configService.get<string>('SECRET_KEY'), {
            expiresIn: '1h'
        })

        return encodeToken
    }

    decode(token: string): any{
        const tokenValid = jwt.verify(token, this.configService.get<string>('SECRET_KEY'))
        return tokenValid
    }

    async comparePassword(inputPassword:string, internalPassword: string):Promise<boolean>{     
        const data = await bcrypt.compare(inputPassword,internalPassword)

        if (!data) {
            throw new BadRequestException('Password tidak valid')     
        }

        return data
    };
}
