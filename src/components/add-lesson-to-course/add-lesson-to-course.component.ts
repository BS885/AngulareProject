import { Component, EventEmitter, Input, Output } from '@angular/core';
import { take, tap, catchError, of } from 'rxjs';
import { GenericFormComponent } from '../generic-form/generic-form.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'add-lesson-to-course',
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: './add-lesson-to-course.component.html',
  styleUrl: './add-lesson-to-course.component.css'
})
export class AddLessonToCourseComponent {
  constructor(private lessonsService: LessonsService, private route: ActivatedRoute, private snackBar: MatSnackBar
  ) { }
  @Input() courseID: string = '';
  @Output() courseAdded = new EventEmitter<any>()

  onSubmit(formData: any) {
    console.log("this.courseId in addLesson in onSubmit", formData);
    console.log("this.courseId in addLesson in onSubmit", this.courseID);
    this.lessonsService.addLesson({ title: formData.title, content: formData.content, courseId: this.courseID })
      .pipe(
        take(1),
        tap(response => {
          console.log('Lesson added:', response);
          this.snackBar.open('שיעור נוסף בהצלחה! ', 'סגור', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.courseAdded.emit(response);
        }),
        catchError(error => {
          console.error('Error adding lesson:', error);
          let errorMessage = 'אירעה שגיאה בעת הוספת השיעור.';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.snackBar.open(`שגיאה: ${errorMessage} ❌`, 'סגור', {
            duration: 3000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          return of(null);
        }),
      )
      .subscribe();
  }

}

