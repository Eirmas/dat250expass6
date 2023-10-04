import {
  CommonModule,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import TodoService from './services/TodoService';
import { Todo } from './models/todo';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { catchError, of, take, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public snackBar = inject(MatSnackBar);
  public todoService = inject(TodoService);
  public matDialog = inject(MatDialog);
  public todosLoading = signal<boolean>(false);
  public columns: string[] = ['id', 'summary', 'description', 'delete'];
  public dataSource = new MatTableDataSource<Todo>([]);

  public ngOnInit(): void {
    this.fetchTodos();
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public addTodo(): void {
    this.matDialog
      .open<CreateTodoComponent, void, Omit<Todo, 'id'>>(CreateTodoComponent, {
        maxWidth: '600px',
        maxHeight: '350px',
        width: '100%',
        height: '100%',
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.onCreateTodo(data);
        }
      });
  }

  public onCreateTodo(data: Omit<Todo, 'id'>): void {
    this.todoService
      .createTodo(data.summary, data.description)
      .pipe(
        take(1),
        tap(() => this.fetchTodos()),
        catchError((err) => of(this.handleError(err)))
      )
      .subscribe();
  }

  public onDelete(id: number): void {
    this.todoService
      .deleteTodo(id)
      .pipe(
        take(1),
        tap(() => this.fetchTodos()),
        catchError((err) => of(this.handleError(err)))
      )
      .subscribe();
  }

  public fetchTodos(): void {
    this.todosLoading.set(true);
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.dataSource.data = todos;
        this.todosLoading.set(false);
      },
      error: (err) => {
        this.handleError(err);
        this.todosLoading.set(false);
      },
    });
  }

  public handleError(error: HttpErrorResponse): void {
    this.snackBar.open(error.message, 'Dismiss', { duration: 5000 });
  }
}
