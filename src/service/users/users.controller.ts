import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './users-dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService 
    ){}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
           return this.usersService.create(createUserDto);
    };
}
