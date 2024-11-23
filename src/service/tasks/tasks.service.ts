import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './tasks-dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './tasks-dto/update-task.dto';
import { SearchTaskDto } from './tasks-dto/search-task.dto';


// provide bussines procees

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ){}

    async get(Query: SearchTaskDto): Promise<TaskEntity[]> {
        const data = this.taskRepository.createQueryBuilder('task_entity');
        
        if (Query.status) {
            data.andWhere('task_entity.status = :status', { status: Query.status });
        }

        if (Query.title) {
            data.andWhere('LOWER(task_entity.title) LIKE :title', { title: `%${Query.title.toLowerCase()}%` });
        }

        const tasks = await data.getMany()

        if (tasks.length === 0) {
            throw new NotFoundException(`No tasks found matching the search criteria`);
        }

        return tasks
    };

    async create(payload: CreateTaskDto): Promise<TaskEntity>{
        const { title, description, status } = payload

        const found = await this.taskRepository.findOneBy({title})

        if (found) {
            throw new BadRequestException(`Task ${title} is exist`)
        }

        
        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.Open || status,
        })
        
        await this.taskRepository.save(task)

        return task
    }

    async find(id:string): Promise<TaskEntity | any>{
        const found =  await this.taskRepository.findOne({
            where: {id}
        })

        console.log(found)

        if(!found){
            throw new NotFoundException('Task not found')
        }
        return found
    }

    async delete(id:string): Promise<boolean>{
        const found = await this.taskRepository.findOne({
            where:{id}
        })

        if(!found){
            throw new NotFoundException(`${id} not found`)
        }

        await this.taskRepository.remove(found)
        return true
    }

    async update(id:string, updateTaskDto: UpdateTaskDto): Promise<any>{
        const { title, status } = updateTaskDto

        const found = await this.taskRepository.findOne({where: {id}})

        console.log(found)

        if (!found) {
            throw new NotFoundException(`${id} not found`)
        }

        
        const task = this.taskRepository.create({
            id,
            title,
            status
        })

        await this.taskRepository.update(id, task)
        
        return {
            before:{
                found
            },
            after:{
                task
            }
        }
    }
};
