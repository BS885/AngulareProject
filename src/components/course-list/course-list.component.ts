import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { Store } from '@ngrx/store';
import { selectAllCourses, selectCoursesError } from '../../courseStore/courses.selectors';
import { loadCourses } from '../../courseStore/courses.actions';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoursComponent } from '../cours/cours.component';
import { CourseCardComponent } from '../course-card/course-card.component';
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [AsyncPipe,MatProgressSpinnerModule,
    CourseCardComponent,
    MatGridListModule,      // לייבוא רשימות (mat-grid-list)
    MatIconModule,          // אם יש צורך באייקונים (mat-icon)
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses$!: Observable<Course[]>;
  error$!: Observable<any>;
  private store = inject(Store);
  
  constructor() {
    this.courses$ = this.store.select(selectAllCourses);
    this.error$ = this.store.select(selectCoursesError);
  }
  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    console.log('Courses:', this.courses$);
  }
  loadCourses(): void {
    this.store.dispatch(loadCourses());
  }
}
