import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports : [
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule
    ],
    controllers: [UsersController],
    providers:[ UsersService ]
})
export class UsersModule {}
