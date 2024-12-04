import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/users.entity';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [AuthService,  UsersService, ConfigService, AuthGuard, RolesGuard],
  controllers: [AuthController],
  exports:[AuthService, AuthGuard, RolesGuard]
})
export class AuthModule {}

