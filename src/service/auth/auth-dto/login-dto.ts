import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDto { 
    @ApiProperty({ description: 'email', example: 'staff@mail.com' })
    @IsNotEmpty()
    @IsEmail() 
    email: string

    @ApiProperty({ description: 'password', example: 'staff' })
    @IsNotEmpty()
    @IsString()
    password: string
}