import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ServiceModule,
    DatabaseModule
  ]
})
export class AppModule {}
