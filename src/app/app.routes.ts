import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterUserComponent },
    { path: '', component: LoginAndRegisterComponent }
];