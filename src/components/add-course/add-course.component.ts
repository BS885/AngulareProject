import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { GenericFormComponent } from '../generic-form/generic-form.component';
import { catchError, finalize, of, take, tap } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    GenericFormComponent
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  constructor( private courseService: CoursesService, private snackBar: MatSnackBar,private router: Router) {
  }

  onSubmit(formData: any) {
      this.courseService.addCourse({
        title: formData.title,
        description: formData.content})
        .pipe(
          take(1),
          tap(response => {
            console.log('Course added:', response);
            this.snackBar.open('Course added successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar'],
              horizontalPosition: 'center',
              verticalPosition: 'top',
            })
            this.router.navigate(['/courses']);
          }),
          catchError(error => {
            console.error('Error adding course:', error);
            let errorMessage = 'An error occurred while adding the course.';
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            }
            this.snackBar.open(`Error: ${errorMessage} ❌`, 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            return of(null);
          }),
          finalize(() => {
            // פעולות שיש לבצע תמיד (למשל, הסתרת ספינר)
          })
        )
        .subscribe();
  }
}
