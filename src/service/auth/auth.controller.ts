import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth-dto/login-dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('/login')
    @ApiQuery({type: LoginDto}) 
    @ApiResponse({ status: 200, description: 'Login succes' })
    @ApiResponse({ status: 400, description: 'User cannot registered' })
    async createUser(@Body() loginDto: LoginDto): Promise<any> {
        return this.authService.login(loginDto);
    };
}
