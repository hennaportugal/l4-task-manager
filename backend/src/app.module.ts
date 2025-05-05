import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'task-manager',
      entities: [Task],
      synchronize: true, // Disable in production
    }),
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
