import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './tasks.model';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task | any> {
    return this.http.post<Task>(`${apiUrl}/tasks`, task);
  }

  getTasks(): Observable<Task[] | any> {
    return this.http.get<Task[]>(`${apiUrl}/tasks`);
  }

  editTask(task: Task): Observable<Task | any> {
    return this.http.put<Task>(`${apiUrl}/tasks/${task.id}`, task);
  }

  deleteTask(task: Task): Observable<string | any> {
    return this.http.delete(`${apiUrl}/tasks/${task.id}`, {
      responseType: 'text' as 'text',
    });
  }
}
