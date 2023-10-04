import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Todo } from 'src/app/models/todo';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  private dialogRef = inject(MatDialogRef<void, Omit<Todo, 'id'>>);

  public form = new FormGroup({
    summary: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  public onSubmit(): void {
    if (this.form.valid) {
      const data = this.form.getRawValue() as Omit<Todo, 'id'>;
      this.dialogRef.close(data);
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
