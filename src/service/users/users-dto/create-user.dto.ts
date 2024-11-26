import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator"
import { Roles } from "../users.entity"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    @Matches(/^(\+?\d{1,4}[\s-]?)?(\(?\d{1,3}\)?[\s-]?)?[\d\s-]{7,14}$/, {
        message: 'Phonenumber is invalid',
    })
    phonenumber: string

    @IsOptional()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsEnum(Roles)
    role:Roles
}