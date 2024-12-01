import { Body, Controller, Post } from '@nestjs/common';
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
    createUser(@Body() loginDto: LoginDto): Promise<object> {
           return this.authService.login(loginDto);
    };
}
