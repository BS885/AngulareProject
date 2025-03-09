import { createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { Course } from '../models/course';
import { Lesson } from '../models/lesson';

// הגדרת state ראשוני
export interface CoursesState {
  courses: Course[];
  course: Course | null;
  lessons: Lesson[];
  error: string | null;
}

export const initialState: CoursesState = {
  courses: [],
  course: null,
  lessons: [],
  error: null,
};

// יצירת reducer
export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses: courses,
    error: null,
  })),
  on(CoursesActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CoursesActions.addCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course],
    error: null,
  })),
  on(CoursesActions.addCourseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CoursesActions.enrollCourseSuccess, (state, { courseId }) => ({
    ...state,
    courses: state.courses.map(course =>
      course.id === courseId ? { ...course, enrolled: true } : course
    ),
    error: null,
  })),
  on(CoursesActions.enrollCourseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CoursesActions.getCourseByIdSuccess, (state, { course }) => ({
    ...state,
    course,
    error: null,
  })),
  on(CoursesActions.getCourseByIdFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CoursesActions.loadLessonsSuccess, (state, { lessons }) => ({
    ...state,
    lessons,
    error: null,
  })),
  on(CoursesActions.loadLessonsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  // הוספת reducer לעוד פעולות כאן לפי הצורך
);

