import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../task.entity";

export class SearchTaskDto{
    @ApiProperty({ description: 'title', example: 'belajar membaca' })
    title: string

    @ApiProperty({ description: 'status', example: 'Open' })
    status: TaskStatus
}