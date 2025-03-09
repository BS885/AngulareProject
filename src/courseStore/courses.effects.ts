import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as CoursesActions from './courses.actions';
import { CoursesService } from '../services/courses.service';
import { LessonsService } from '../services/lessons.service';

@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(CoursesActions.loadCourses),
        mergeMap(() =>
          this.courseService.getAllCourses().pipe(
            map((courses) => CoursesActions.loadCoursesSuccess({ courses })),
            catchError((error) => {
              console.error('Error loading courses:', error);
              return of(CoursesActions.loadCoursesFailure({ error: error.message }));
            })
          )
        )
      )
    )
  );

  getCourseById$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(CoursesActions.getCourseById),
        mergeMap((action) =>
          this.courseService.getCourseById(action.courseId).pipe(
            map((course) => CoursesActions.getCourseByIdSuccess({ course })),
            catchError((error) => {
              console.error('Error getting course by ID:', error);
              return of(CoursesActions.getCourseByIdFailure({ error: error.message }));
            })
          )
        )
      )
    )
  );

  loadLessons$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(CoursesActions.loadLessons),
        mergeMap(({ courseId }) =>
          this.lessonsService.getLessonsByCourseId(courseId).pipe(
            map((lessons) => CoursesActions.loadLessonsSuccess({ lessons })),
            catchError((error) => {
              console.error('Error loading lessons:', error);
              return of(CoursesActions.loadLessonsFailure({ error: error.message }));
            })
          )
        )
      )
    )
  );

  enrollUserInCourse$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(CoursesActions.enrollUserInCourse),
        mergeMap(({ courseId }) =>
          this.courseService.enrollUserInCourse(courseId).pipe(
            map(() => CoursesActions.enrollCourseSuccess({ courseId })),
            catchError((error) => {
              console.error('Error enrolling user in course:', error);
              return of(CoursesActions.enrollCourseFailure({ error: error.message }));
            })
          )
        )
      )
    )
  );

  unenrollUserFromCourse$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(CoursesActions.unenrollUserFromCourse),
        mergeMap(({ courseId }) =>
          this.courseService.unenrollUserFromCourse(courseId).pipe(
            map(() => CoursesActions.unenrollUserFromCourseSuccess({ courseId })),
            catchError((error) => {
              console.error('Error unenrolling user from course:', error);
              return of(CoursesActions.unenrollUserFromCourseFailure({ error: error.message }));
            })
          )
        )
      )
    )
  );

  updateCourse$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(CoursesActions.updateCourse),
        mergeMap(({ id, updates }) =>
          this.courseService.updateCourse(id, updates).pipe(
            map((course) => CoursesActions.updateCourseSuccess({ course })),
            catchError((error) => {
              console.error('Error updating course:', error);
              return of(CoursesActions.updateCourseFailure({ error: error.message }));
            })
          )
        )
      )
    )
  );
  addCourse$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(CoursesActions.addCourse),
        mergeMap(({ title, description }) =>
          this.courseService.addCourse({ title, description }).pipe(
            map((course) => {
              if (course) {
                return CoursesActions.addCourseSuccess({ course });
              } else {
                return CoursesActions.addCourseFailure({ error: 'Course addition failed' });
              }
            }),
            catchError((error) => {
              console.error('Error adding course:', error);
              return of(CoursesActions.addCourseFailure({ error: error.message }));
            })
          )
        )
      )
    )
  );
  deleteCourse$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(CoursesActions.deleteCourse),
        mergeMap(({ courseId }) =>
          this.courseService.deleteCourse(courseId).pipe(
            map(() => CoursesActions.deleteCourseSuccess({ courseId })),
            catchError((error) => {
              console.error('Error deleting course:', error);
              return of(CoursesActions.deleteCourseFailure({ error: error.message }));
            })
          )
        )
      )
    )
  );

  deleteLesson$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(CoursesActions.deleteLesson),
        mergeMap(({ courseId, id }) =>
          this.lessonsService.deleteLesson(id, courseId).pipe(
            map(() => CoursesActions.deleteLessonSuccess({ id })),
            catchError((error) => {
              console.error('Error deleting lesson:', error);
              return of(CoursesActions.deleteLessonFailure({ error: error.message }));
            })
          )
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private courseService: CoursesService,
    private lessonsService: LessonsService
  ) { }
}