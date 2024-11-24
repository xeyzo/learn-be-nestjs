import { TaskStatus } from "../task.entity";

export class SearchTaskDto{
    title: string
    status: TaskStatus
}