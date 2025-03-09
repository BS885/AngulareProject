import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Lesson } from '../models/lesson';
import { Store } from '@ngrx/store';
import * as CoursesActions from '../courseStore/courses.actions';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LessonsService implements OnInit {
  private apiUrl = 'http://localhost:3000/api/courses';
  private courseId: string = '';
  constructor(private http: HttpClient, private store: Store, private route: ActivatedRoute) { }
  ngOnInit(): void {

    console.log();

  }

  getLessonsByCourseId(courseId: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`).pipe(
      map((lessons) => {
        this.store.dispatch(CoursesActions.loadLessonsSuccess({ lessons }));
        return lessons;
      }),
      catchError((error) => {
        this.store.dispatch(CoursesActions.loadLessonsFailure({ error: error.message }));
        return of([]);
      })
    );
  }

  // הוספת שיעור
  addLesson({ title, content, courseId }: { title: string; content: string, courseId: string }): Observable<Lesson | null> {
    return this.http.post<Lesson>(`${this.apiUrl}/${courseId}/lessons`, { title, content }).pipe(
      map((lesson) => {
        this.store.dispatch(CoursesActions.addLessonSuccess({ lesson }));
        return lesson;
      }),
      catchError((error) => {
        this.store.dispatch(CoursesActions.addLessonFailure({ error: error.message }));
        return of(null);
      })
    );
  }
  // עדכון שיעור
  updateLesson(courseId: string, lesson: Lesson): Observable<Lesson | null> {
    console.log("enter updateLesson in service", courseId);
    return this.http.put<Lesson>(`${this.apiUrl}/${courseId}/lessons/${lesson.id}`, lesson).pipe(
      map((lesson) => {
        this.store.dispatch(CoursesActions.updateLessonSuccess({ lesson }));
        return lesson;
      }),
      catchError((error) => {
        this.store.dispatch(CoursesActions.updateLessonFailure({ error: error.message }));
        return of(null);
      })
    );
  }

  // מחיקת שיעור
  deleteLesson(courseId: string, id: string): Observable<boolean> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${courseId}/lessons/${id}`).pipe(
      map(() => {
        console.log("deleteLesson");
        this.store.dispatch(CoursesActions.deleteLessonSuccess({ id }));
        return true;
      }),
      catchError((error) => {
        console.log("error in deleteLesson in service", error);
        this.store.dispatch(CoursesActions.deleteLessonFailure({ error: error.message }));
        return of(false);
      })
    );
  }
}