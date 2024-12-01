import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './tasks-dto/create-task.dto';
import { UpdateTaskDto } from './tasks-dto/update-task.dto';
import { SearchTaskDto } from './tasks-dto/search-task.dto';
import { TaskEntity } from './task.entity';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';
import { ApiQuery, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

// provide http request

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){};

    @Get()
    @ApiQuery({type: SearchTaskDto}) 
    @ApiResponse({ status: 200, description: 'get all data succes' })
    getAllTasks(@Query() searchTaskDto: SearchTaskDto): Promise<TaskEntity[]>{
        return this.tasksService.get(searchTaskDto)
    };

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<string> {
        return this.tasksService.find(id)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles('staff')
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Endpoint that requires credentials' })
    @ApiQuery({type: CreateTaskDto}) 
    @ApiResponse({ status: 200, description: 'your task succesfully created' })
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
           return this.tasksService.create(createTaskDto);
    };

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('staff')
    @Put('/:id')
    updateTask(@Param('id') id: string,@Body() updateTaskDto: UpdateTaskDto): Promise<TaskEntity>{
        return this.tasksService.update(id, updateTaskDto)
    };

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('staff')
    @Delete('/:id')
    deleteTask(@Param('id') id:string): Promise<boolean>{
        return this.tasksService.delete(id)
    };

}
