import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users-dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly configService: ConfigService
    ){}

    async create(payload: CreateUserDto):Promise<UserEntity>{
        const { username, email, password, phonenumber, address, role } = payload;

        const findEmail = await this.userRepository.findOne({
            where: {email}
        })

        if(findEmail){
            throw new BadRequestException(`email : ${email} is exist`)
        }

        const findUsername = await this.userRepository.findOne({
            where: {username}
        })

        if(findUsername){
            throw new BadRequestException(`username : ${email} is exist`)
        }

        const hash = await this.hashPassword(password)
        const users = this.userRepository.create({
            email,
            username,
            password:hash,
            phonenumber,
            address,
            role
        })

        await this.userRepository.save(users)

        return users 
    };


    async findUserById(id: string): Promise<UserEntity> {
        const result = await this.userRepository.findOneBy({
            id
        })

        return result
    }

    async hashPassword(password: string): Promise<string> {
        const salt: number = parseInt(this.configService.get('BCRYPT_SALT_ROUNDS'))

        const genSalt = await bcrypt.genSalt(salt)
        const hash = bcrypt.hash(password, genSalt)
        return hash
    }

    async getUserByEmail(email: string): Promise<UserEntity>{
        const found = await this.userRepository.findOneBy({email})

        if (!found) {
            throw new NotFoundException(`User with emai : ${email} is not exist, please signup before login`)
        }
        return found
    }
    
}
