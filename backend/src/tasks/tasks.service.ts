import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async createDB(): Promise<void> {
    const query = `CREATE DATABASE IF NOT EXISTS task-manager`;
    await this.dataSource.query(query);
  }

  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await this.dataSource.query(query);
  }

  async getTasks(): Promise<Task[]> {
    const query = `SELECT * FROM tasks`;
    return this.dataSource.query(query);
  }

  async getTaskById(id: number): Promise<Task | null> {
    const query = `SELECT * FROM tasks WHERE id = ?`;
    const result: Task[] = await this.dataSource.query(query, [id]);
    return result.length ? result[0] : null;
  }

  async createTask(taskData: Partial<Task>): Promise<Task> {
    const query = `
      INSERT INTO tasks (title, description, status)
      VALUES (?, ?, ?)
    `;
    return await this.dataSource.query(query, [
      taskData.title,
      taskData.description || null,
      taskData.status || 'pending',
    ]);
  }

  async updateTask(
    id: number,
    updateData: Partial<Task>,
  ): Promise<Task | null> {
    const query = `
      UPDATE tasks
      SET title = ?, description = ?, status = ?
      WHERE id = ?
    `;
    await this.dataSource.query(query, [
      updateData.title || null,
      updateData.description || null,
      updateData.status || 'pending',
      id,
    ]);
    return this.getTaskById(id);
  }

  async deleteTask(id: number): Promise<void> {
    const query = `DELETE FROM tasks WHERE id = ?`;
    await this.dataSource.query(query, [id]);
  }
}
