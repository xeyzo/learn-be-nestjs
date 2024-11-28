import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './tasks-dto/create-task.dto';
import { UpdateTaskDto } from './tasks-dto/update-task.dto';
import { SearchTaskDto } from './tasks-dto/search-task.dto';
import { TaskEntity } from './task.entity';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';




// provide http request

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){};

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('staff')
    @Get()
    getAllTasks(@Query() searchTaskDto: SearchTaskDto): Promise<TaskEntity[]>{
        return this.tasksService.get(searchTaskDto)
    };

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<string> {
        return this.tasksService.find(id)
    }

    @UseGuards(AuthGuard)
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
           return this.tasksService.create(createTaskDto);
    };

    @UseGuards(AuthGuard)
    @Put('/:id')
    updateTask(@Param('id') id: string,@Body() updateTaskDto: UpdateTaskDto): Promise<TaskEntity>{
        return this.tasksService.update(id, updateTaskDto)
    };

    @UseGuards(AuthGuard)
    @Delete('/:id')
    deleteTask(@Param('id') id:string): Promise<boolean>{
        return this.tasksService.delete(id)
    };

}
