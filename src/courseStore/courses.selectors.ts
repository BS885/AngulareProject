import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CoursesState } from './courseState';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.courses
);

export const selectCoursesError = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.error
);

export const selectCourse = createSelector(
  selectCoursesState,
  (state) => state.selectedCourse
);

export const selectLessons = createSelector(
  selectCoursesState,
  (state) => state.lessons
);

export const selectCourseLoading = createSelector(
  selectCoursesState,
  (state) => state.loading
);

export const selectIsUserInCourse = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isUserInCourse
);