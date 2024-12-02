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


    @UseGuards(AuthGuard, RolesGuard)
    @Roles('staff')
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Endpoint that requires credentials' })
    @ApiResponse({ status: 200, description: 'get all data succes' })
    @ApiResponse({ status: 400, description: 'data task is empty' })
    getAllTasks(@Query() searchTaskDto: SearchTaskDto): Promise<TaskEntity[]>{
        return this.tasksService.get(searchTaskDto)
    };

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('staff')
    @Get('/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Endpoint that requires credentials' })
    @ApiResponse({ status: 200, description: 'find data succes' })
    @ApiResponse({ status: 401, description: 'data task is empty' })
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
    @ApiResponse({ status: 500, description: 'bad request' })
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
           return this.tasksService.create(createTaskDto);
    };

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('staff')
    @Put('/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Endpoint that requires credentials' })
    @ApiQuery({type: UpdateTaskDto})
    @ApiResponse({ status: 200, description: 'your task succesfully updated' })
    @ApiResponse({ status: 401, description: 'bad request' }) 
    updateTask(@Param('id') id: string,@Body() updateTaskDto: UpdateTaskDto): Promise<TaskEntity>{
        return this.tasksService.update(id, updateTaskDto)
    };

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('staff')
    @Delete('/:id')
    @ApiResponse({ status: 200, description: 'delete data succesfully' })
    @ApiResponse({ status: 401, description: 'the data is not foundd' })
    deleteTask(@Param('id') id:string): Promise<boolean>{
        return this.tasksService.delete(id)
    };

}
