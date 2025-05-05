import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchControl = new FormControl('');

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(private tasksService: TasksService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTasks();
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((searchTerm) => {
        this.filterTasks(searchTerm || '');
      });
  }

  createTask(): void {
    const task = {
      title: this.taskForm.get('title')?.value || '',
      description: this.taskForm.get('description')?.value || '',
      status: 'pending',
    };

    this.tasksService.createTask(task).subscribe(
      (response: any) => {
        this.tasks = response.tasks || [];
        this.getTasks();
        this.taskForm.reset();
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }

  getTasks(): void {
    this.tasksService.getTasks().subscribe(
      (response: Task[]) => {
        this.tasks = response || [];
        this.filteredTasks = [...this.tasks];
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  filterTasks(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '300px',
      data: { task },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.tasksService.editTask(result).subscribe(
        (response) => {
          this.getTasks();
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    });
  }

  deleteTask(task: Task): void {
    this.tasksService.deleteTask(task).subscribe(
      (response) => {
        this.getTasks();
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }
}
