import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export default class TodoService {
  constructor(private httpClient: HttpClient) {}

  public getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${environment.apiUrl}/todos`);
  }

  public getTodoById(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(`${environment.apiUrl}/todos/${id}`);
  }

  public createTodo(summary: string, description: string): Observable<Todo> {
    return this.httpClient.post<Todo>(`${environment.apiUrl}/todos`, {
      summary,
      description,
    });
  }

  public updateTodo(
    id: number,
    summary: string,
    description: string
  ): Observable<Todo> {
    return this.httpClient.put<Todo>(`${environment.apiUrl}/todos/${id}`, {
      summary,
      description,
    });
  }

  public deleteTodo(id: number): Observable<Todo> {
    return this.httpClient.delete<Todo>(`${environment.apiUrl}/todos/${id}`);
  }
}
