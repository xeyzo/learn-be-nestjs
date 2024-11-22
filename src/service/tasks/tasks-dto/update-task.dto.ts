import { IsEnum } from "class-validator"
import { TaskStatus } from "../task-status.enum"

export class UpdateTaskDto{
    title: string

    @IsEnum(TaskStatus)
    status: TaskStatus
}