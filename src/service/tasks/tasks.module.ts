import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports : [
    TypeOrmModule.forFeature([TaskEntity, UserEntity]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService, UsersService]
})
export class TasksModule {}
