import { Routes } from '@angular/router';
import { techerGuard } from '../guards/techer-guard.guard';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterUserComponent } from '../components/register-user/register-user.component';
import { LoginAndRegisterComponent } from '../components/login-and-register/login-and-register.component';
import { CourseListComponent } from '../components/course-list/course-list.component';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { CoursComponent } from '../components/cours/cours.component';
import { AddLessonToCourseComponent } from '../components/add-lesson-to-course/add-lesson-to-course.component';
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterUserComponent },
    { path: '', component: HomepageComponent },
    { path: 'login-and-register', component: LoginAndRegisterComponent },
    { path: "courses", component: CourseListComponent },
    { path: "manage-courses", component: AddCourseComponent, canActivate: [techerGuard] },
    {
        path: 'course/:id', component: CoursComponent,
        children: [{ path: 'add-lesson', component: AddLessonToCourseComponent }]
    },
];