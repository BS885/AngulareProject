import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription, Subject } from "rxjs";
import { switchMap, filter, takeUntil } from "rxjs/operators";
import { selectCourse, selectLessons, selectCourseLoading, selectIsUserInCourse } from "../../courseStore/courses.selectors";
import { Course } from "../../models/course";
import { Lesson } from "../../models/lesson";
import * as CoursesActions from '../../courseStore/courses.actions';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { CoursesService } from "../../services/courses.service";
import { AddLessonToCourseComponent } from "../add-lesson-to-course/add-lesson-to-course.component";
import { LessonsService } from "../../services/lessons.service";
import { MatDialog } from "@angular/material/dialog";
import { EditLessonComponent } from "../edit-lesson/edit-lesson.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    RouterOutlet,
    AddLessonToCourseComponent],
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit, OnDestroy {
  courseID!: string;
  course$!: Observable<Course | null>;
  lessons$!: Observable<Lesson[]>;
  loading$!: Observable<boolean>;
  attache!: boolean;
  addLessonFormVisible = false;
  private destroy$ = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute, private courseService: CoursesService,
    private lessonsService: LessonsService, public dialog: MatDialog, private snackBar: MatSnackBar
  ) {
    this.course$ = this.store.select(selectCourse);
    this.lessons$ = this.store.select(selectLessons);
    this.loading$ = this.store.select(selectCourseLoading);
  }

  async ngOnInit(): Promise<void> {
    this.route.params.pipe(
      filter(params => !!params['id']),
      switchMap(params => {
        this.courseID = params['id'];
        console.log("this.courseID in ngOnInit in component", this.courseID);
        this.store.dispatch(CoursesActions.getCourseById({ courseId: this.courseID }));
        this.store.dispatch(CoursesActions.loadLessons({ courseId: this.courseID }));
        return [];
      }),
      takeUntil(this.destroy$)
    ).subscribe();
    this.attache = await this.courseService.isUserInCourse(this.courseID);
    console.log("ngOnInit this.attache", this.attache);

  }

  async addCourse(): Promise<void> {
    this.store.dispatch(CoursesActions.enrollUserInCourse({ courseId: this.courseID }));
    try {
      this.attache = await this.courseService.isUserInCourse(this.courseID);
      this.snackBar.open('הרשמה לקורס בוצעה בהצלחה! ✔️', 'סגור', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
    } catch (error) {
      console.error('Error enrolling user in course:', error);
      this.snackBar.open('שגיאה בהרשמה לקורס אנא נסה שוב ❌.', 'סגור', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  async leaveCourse(): Promise<void> {
    console.log("unenrollUserFromCourse");
    this.store.dispatch(CoursesActions.unenrollUserFromCourse({ courseId: this.courseID }));
    try {
      this.attache = await this.courseService.isUserInCourse(this.courseID);
      this.snackBar.open('ביטול הרשמה לקורס בוצע בהצלחה! ✔️', 'סגור', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } catch (error) {
      console.error('Error un-enrolling user from course:', error);
      this.snackBar.open('שגיאה בביטול ההרשמה לקורס אנא נסה שוב ❌.', 'סגור', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
  isTeacher(): boolean {
    const role = sessionStorage.getItem('role');
    return role === 'teacher';
  }
  addLesson(): void {
    this.addLessonFormVisible = true
  }
  onCourseAdded($event: any): void {
    this.addLessonFormVisible = false;
    this.store.dispatch(CoursesActions.loadLessons({ courseId: this.courseID }));
  }
  removeLesson(lessonId: string): void {
    console.log("removeLesson called with lessonId:", lessonId);
    this.lessonsService.deleteLesson(this.courseID, lessonId).subscribe(() => {
      this.store.dispatch(CoursesActions.loadLessons({ courseId: this.courseID }));
    });
  }

  openEditLessonDialog(lesson: Lesson): void {
    const dialogRef = this.dialog.open(EditLessonComponent, {
      width: '400px',
      data: {
        lesson: lesson,
        courseID: this.courseID
      }
    });
    dialogRef.componentInstance.lesson = lesson;
    dialogRef.componentInstance.lessonUpdated.subscribe((updatedLesson) => {
      this.store.dispatch(CoursesActions.loadLessons({ courseId: this.courseID }));
      console.log('Lesson updated:', updatedLesson);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}