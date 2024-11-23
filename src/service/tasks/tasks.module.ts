import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';



@Module({
  imports : [
    TypeOrmModule.forFeature([TaskEntity]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [
    TasksService
  ]
})
export class TasksModule {}
