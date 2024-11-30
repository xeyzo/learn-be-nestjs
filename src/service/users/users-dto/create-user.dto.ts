import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator"
import { Roles } from "../users.entity"
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The username of the user', example: 'john_doe' }) 
    username: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The password has secret key to use login', example: 'password' }) 
    password: string

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ description: 'The email of the user', example: 'john_doe@mail.com' }) 
    email: string

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'The phonenumber of the user', example: '089652553041' }) 
    @Matches(/^(\+?\d{1,4}[\s-]?)?(\(?\d{1,3}\)?[\s-]?)?[\d\s-]{7,14}$/, {
        message: 'Phonenumber is invalid',
    })
    phonenumber: string

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'The address of the user', example: 'jl.kenanga no2 kosambi raya' })
    address: string

    @IsNotEmpty()
    @IsEnum(Roles)
    @ApiProperty({ description: 'The role of the user', example: 'Admin' })
    role:Roles
}