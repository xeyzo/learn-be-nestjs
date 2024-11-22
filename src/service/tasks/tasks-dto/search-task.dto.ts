import { TaskStatus } from "../task-status.enum";

export class SearchTaskDto{
    title: string
    status: TaskStatus
}