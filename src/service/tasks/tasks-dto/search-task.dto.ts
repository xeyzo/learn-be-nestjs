import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../task.entity";
import { IsOptional } from "class-validator";

export class SearchTaskDto{
    @IsOptional()
    @ApiProperty({ description: 'title', example: 'belajar membaca', required:false })
    title: string

    @IsOptional()
    @ApiProperty({ description: 'status', example: 'Open', required:false })
    status: TaskStatus
}