import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth-dto/login-dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post()
    createUser(@Body() loginDto: LoginDto): Promise<object> {
           return this.authService.login(loginDto);
    };
}
