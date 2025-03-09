import { createAction, props } from '@ngrx/store';
import { Course } from '../models/course';
import { Lesson } from '../models/lesson';

// טעינת כל הקורסים
export const loadCourses = createAction('[Courses] Load Courses');
export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);
export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: any }>()
);
// הוספת קורס חדש
export const addCourse = createAction(
  '[Courses] Add Course',
  props<{ title: string; description: string }>()
);
export const addCourseSuccess = createAction(
  '[Courses] Add Course Success',
  props<{ course: Course }>()
);
export const addCourseFailure = createAction(
  '[Courses] Add Course Failure',
  props<{ error: string }>()
);

// הרשמה לקורס
export const enrollUserInCourse = createAction(
  '[Courses] Enroll Course',
  props<{ courseId: string }>()
);
export const enrollCourseSuccess = createAction(
  '[Courses] Enroll Course Success',
  props<{ courseId: string }>()
);
export const enrollCourseFailure = createAction(
  '[Courses] Enroll Course Failure',
  props<{ error: string }>()
);

// בדיקת אם המשתמש כבר בקורס
export const checkUserInCourse = createAction(
  '[Courses] Check If User Is In Course',
  props<{ courseId: string }>()
);
export const checkUserInCourseSuccess = createAction(
  '[Courses] Check If User Is In Course Success',
  props<{ isInCourse: boolean }>()
);
export const checkUserInCourseFailure = createAction(
  '[Courses] Check If User Is In Course Failure',
  props<{ error: string }>()
);

// עזיבת קורס
export const unenrollUserFromCourse = createAction(
  '[Courses] Unenroll User From Course',
  props<{ courseId: string }>()
);
export const unenrollUserFromCourseSuccess = createAction(
  '[Courses] Unenroll User From Course Success',
  props<{ courseId: string }>()
);
export const unenrollUserFromCourseFailure = createAction(
  '[Courses] Unenroll User From Course Failure',
  props<{ error: string }>()
);

// טעינת שיעורים עבור קורס
export const loadLessons = createAction(
  '[Courses] Load Lessons',
  props<{ courseId: string }>()
);
export const loadLessonsSuccess = createAction(
  '[Courses] Load Lessons Success',
  props<{ lessons: Lesson[] }>()
);
export const loadLessonsFailure = createAction(
  '[Courses] Load Lessons Failure',
  props<{ error: string }>()
);

// קבלת קורס לפי מזהה
export const getCourseById = createAction(
  '[Courses] Get Course By Id',
  props<{ courseId: string }>()
);
export const getCourseByIdSuccess = createAction(
  '[Courses] Get Course By Id Success',
  props<{ course: Course }>()
);
export const getCourseByIdFailure = createAction(
  '[Courses] Get Course By Id Failure',
  props<{ error: string }>()
);
//  לעדכון קורס
export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ id: string; updates: Partial<Course> }>()
);

export const updateCourseSuccess = createAction(
  '[Courses] Update Course Success',
  props<{ course: Course | null }>()
);

export const updateCourseFailure = createAction(
  '[Courses] Update Course Failure',
  props<{ error: string }>()
);
// Actions למחיקת קורס
export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ courseId: string }>()
);

export const deleteCourseSuccess = createAction(
  '[Courses] Delete Course Success',
  props<{ courseId: string }>()
);

export const deleteCourseFailure = createAction(
  '[Courses] Delete Course Failure',
  props<{ error: string }>()
);
// הוספת שיעור
export const addLesson = createAction(
  '[Lessons] Add Lesson',
  props<{ courseId: string }>()
);
export const addLessonSuccess = createAction(
  '[Lessons] Add Lesson Success',
  props<{ lesson: Lesson }>()
);
export const addLessonFailure = createAction(
  '[Lessons] Add Lesson Failure',
  props<{ error: string }>()
);

// עדכון שיעור
export const updateLesson = createAction(
  '[Lessons] Update Lesson',
  props<{ lesson: Lesson }>()
);
export const updateLessonSuccess = createAction(
  '[Lessons] Update Lesson Success',
  props<{ lesson: Lesson }>()
);
export const updateLessonFailure = createAction(
  '[Lessons] Update Lesson Failure',
  props<{ error: string }>()
);

// מחיקת שיעור
export const deleteLesson = createAction(
  '[Lessons] Delete Lesson',
  props<{ id: string, courseId: string }>()
);
export const deleteLessonSuccess = createAction(
  '[Lessons] Delete Lesson Success',
  props<{ id: string}>()
);
export const deleteLessonFailure = createAction(
  '[Lessons] Delete Lesson Failure',
  props<{ error: string }>()
);