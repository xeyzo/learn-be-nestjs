import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './users-dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService 
    ){}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
           return this.usersService.create(createUserDto);
    };
}
