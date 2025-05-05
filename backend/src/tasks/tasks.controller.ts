import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create-db')
  async createDB(): Promise<{ message: string }> {
    await this.tasksService.createDB();
    return { message: 'Database created successfully' };
  }

  @Post('create-table')
  async createTable(): Promise<{ message: string }> {
    await this.tasksService.createTable();
    return { message: 'Table created successfully' };
  }

  @Get()
  async getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<Task | null> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.tasksService.createTask(taskData);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateData: Partial<Task>,
  ): Promise<Task | null> {
    return this.tasksService.updateTask(id, updateData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<{ message: string }> {
    await this.tasksService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }
}
