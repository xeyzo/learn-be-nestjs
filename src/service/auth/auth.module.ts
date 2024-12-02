import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/users.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [AuthService,  UsersService, ConfigService],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}

