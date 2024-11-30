import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './users-dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';
import { ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService 
    ){}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiQuery(CreateUserDto) 
    @ApiResponse({ status: 200, description: 'Successful response.' })
    createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
           return this.usersService.create(createUserDto);
    };
}
