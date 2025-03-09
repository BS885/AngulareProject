import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { EllipsisPipe } from '../../pipes/ellipsis.pipe';

@Component({
  selector: 'course-card',
  standalone: true,
  imports:  [
      MatCardModule,
      MatCardModule,
      MatGridListModule,
      MatButtonModule,
      MatIconModule,
      EditCourseComponent,
      EllipsisPipe
    ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() icon!: string;
  @Input() textBottun!: string;
  @Output() finish = new EventEmitter<any>();
  openEditForm = false;
  constructor(private router: Router,private courseService: CoursesService) { }

  viewCourse(courseId: string) {
    this.router.navigate(['/course', courseId]);
  }
  isTeacher(): boolean {
    return sessionStorage.getItem('role') === 'teacher';
  }
  removeCourse(){
    console.log("this.course.id in remove in c",this.course.id);
    let result  =this.courseService.deleteCourse(this.course.id);
    console.log("result",result);
    this.finish.emit();
  }
  editCourse(){
    this.openEditForm = !this.openEditForm;
    this.finish.emit();
  }
}
