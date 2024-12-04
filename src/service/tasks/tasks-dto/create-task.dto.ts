import { IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import { TaskStatus } from "../task.entity"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTaskDto{

    @ApiProperty({ description: 'title', example: 'belajar membaca' })
    @IsNotEmpty()
    title: string
    
    @ApiProperty({ description: 'description', example: 'aku sedang belajar membaca buku pemograman' })
    @IsNotEmpty()
    description: string

    @ApiProperty({ description: 'status', example: 'Open' })
    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus

    @ApiProperty({ description: 'user id', example: '12312blabla1234' })
    @IsNotEmpty()
    userId: string
}