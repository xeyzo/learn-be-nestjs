import { IsEnum} from "class-validator"
import { TaskStatus } from "../task.entity"

export class UpdateTaskDto{
    title: string

    @IsEnum(TaskStatus)
    status: TaskStatus
    
}