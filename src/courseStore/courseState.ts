import { Course } from "../models/course";
import { Lesson } from "../models/lesson";

export interface AppState {
  courses: CoursesState; // המצב של הקורסים (כולל טעינה ושגיאות)
}

export interface CoursesState {
  courses: Course[];       // רשימת כל הקורסים
  selectedCourse: Course | null; // הקורס שנבחר (יכול להיות null אם לא נבחר)
  lessons: Lesson[];       // רשימת השיעורים של הקורס הנבחר
  loading: boolean;        // האם המערכת בטעינה?
  error: string | null;    // שגיאות אם יש
  isUserInCourse: boolean  // האם המשתמש הצטרף לקורס
}
