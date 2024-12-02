import { IsEnum, IsOptional} from "class-validator"
import { TaskStatus } from "../task.entity"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateTaskDto{

    @IsOptional()
    @ApiProperty({ description: 'title', example: 'belajar membaca', required:true })
    title: string

    @IsOptional()
    @ApiProperty({ description: 'status', example: 'belajar membaca', required:false })
    @IsEnum(TaskStatus)
    status: TaskStatus
    
}