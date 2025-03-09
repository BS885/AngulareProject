import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericFormComponent } from '../generic-form/generic-form.component';
import { CoursesService } from '../../services/courses.service';
import { firstValueFrom } from 'rxjs';
import { Course } from '../../models/course';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [GenericFormComponent, MatSnackBarModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  @Input() course!: Course
  @Output() finish = new EventEmitter<any>()
  constructor(private courseService: CoursesService, private snackBar: MatSnackBar
  ) { }
  onSubmit($event: any) {
    this.course = {
      ...this.course,
      title: $event.title,
      description: $event.content
    }
    firstValueFrom(this.courseService.updateCourse(this.course.id, this.course))
      .then((response: any) => {
        if (response.message === "Course updated successfully") {
          console.log('Course updated successfully', response);
          this.snackBar.open('הקורס עודכן בהצלחה ✔️', 'סגור', {
            duration: 3000, // משך ההצגה במילישניות
            panelClass: 'success-snackbar'
          });
          this.finish.emit();
        } else {
          console.error('Error updating course ❌', response);
          this.snackBar.open('שגיאה בעדכון הקורס.', 'סגור', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
        }
      });
  }
}
