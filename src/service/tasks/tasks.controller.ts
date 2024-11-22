import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Search} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './tasks-dto/create-task.dto';
import { UpdateTaskDto } from './tasks-dto/update-task.dto';
import { SearchTaskDto } from './tasks-dto/search-task.dto';
import { TaskEntity } from './task.entity';


// provide http request

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){};

    @Get()
    getAllTasks(@Query() searchTaskDto: SearchTaskDto): Promise<TaskEntity[]>{
        return this.tasksService.get(searchTaskDto)
    };

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<TaskEntity | any> {
        return this.tasksService.find(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
           return this.tasksService.create(createTaskDto);
    };

    @Patch('/:id')
    updateTask(@Param('id') id: string,@Body() updateTaskDto: UpdateTaskDto): Promise<TaskEntity>{
        return this.tasksService.update(id, updateTaskDto)
    };

    @Delete('/:id')
    deleteTask(@Param('id') id:string): Promise<boolean>{
        return this.tasksService.delete(id)
    };

}
