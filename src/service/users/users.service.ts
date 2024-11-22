import { Injectable } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ){}

    async create():Promise<TaskEntity>:
}
