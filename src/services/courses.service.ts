import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CoursesActions from '../courseStore/courses.actions'
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient, private store: Store) { }

  addCourse({ title, description }: { title: string; description: string }): Observable<Course | null> {
    console.log("title", title + "description", description);
    return this.http.post<Course>(this.apiUrl, { title, description }).pipe(
      map((course) => {
        this.store.dispatch(CoursesActions.addCourseSuccess({ course }));  // Success action
        return course;
      }),
      catchError((error) => {
        this.store.dispatch(CoursesActions.addCourseFailure({ error: error.message }));  // Failure action
        return of(null);
      })
    );
  }

  getAllCourses(): Observable<any> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      map((courses) => {
        this.store.dispatch(CoursesActions.loadCoursesSuccess({ courses }));  // Success action
        return courses;
      }),
      catchError((error) => {
        this.store.dispatch(CoursesActions.loadCoursesFailure({ error: error.message }));  // Failure action
        return of([]);
      })
    );
  }

  getCourseById(id: string): Observable<any> {
    console.log("id", id);
    console.log(`${this.apiUrl}/${id}`);

    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      map((course) => {
        this.store.dispatch(CoursesActions.getCourseByIdSuccess({ course }));  // Success action
        return course;
      }),
      catchError((error) => {
        this.store.dispatch(CoursesActions.getCourseByIdFailure({ error: error.message }));  // Failure action
        return of(null);
      })
    );
  }

  async getCoursesByIdStudent(): Promise<Course[]> {
    let id = sessionStorage.getItem('id');
    if (!id) throw new Error("User ID not found in sessionStorage");
    const result = await this.http.get<Course[]>(`${this.apiUrl}/student/${id}`);
    return firstValueFrom(result);
  }

  async isUserInCourse(courseId: string): Promise<boolean> {
    try {
      const courses = await this.getCoursesByIdStudent();
      const isInCourse = courses.filter((course: Course) => course.id == courseId).length > 0;
      this.store.dispatch(CoursesActions.checkUserInCourseSuccess({ isInCourse }));
      return isInCourse;
    } catch (error: any) {
      this.store.dispatch(CoursesActions.checkUserInCourseFailure({ error: error.message }));
      return false;
    }
  }

  enrollUserInCourse(courseId: string): Observable<any> {
    let userId = sessionStorage.getItem('id') || '';
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }).pipe(
      map(() => {
        this.store.dispatch(CoursesActions.enrollCourseSuccess({ courseId }));
        return true;
      }),
      catchError((error) => {
        this.store.dispatch(CoursesActions.enrollCourseFailure({ error: error.message }));
        return of(false);
      })
    );
  }

  unenrollUserFromCourse(courseId: string): Observable<any> {
    let userId = sessionStorage.getItem('id') || '';
    return this.http.delete<any>(`${this.apiUrl}/${courseId}/unenroll`, { body: { userId } }).pipe(
      map(() => {
        this.store.dispatch(CoursesActions.unenrollUserFromCourseSuccess({ courseId }));
        return true;
      }),
      catchError((error) => {
        this.store.dispatch(CoursesActions.unenrollUserFromCourseFailure({ error: error.message }));
        return of(false);
      })
    );
  }

  updateCourse(id: string, updates: Partial<Course>): Observable<Course | null> {
    console.log("update course in service", id);
    console.log(`${this.apiUrl}/${id}`);
    return this.http.put<Course>(`${this.apiUrl}/${id}`, updates)
  }

  deleteCourse(id: string): Observable<any> {
    console.log("remove course in service", id);
    console.log(`${this.apiUrl}/${id}`);
    let result = this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
    console.log("result in service", firstValueFrom(result));

    return result;
  }
}