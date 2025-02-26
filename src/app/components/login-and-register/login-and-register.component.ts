import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-and-register',
  standalone: true,
  imports: [LoginComponent,RegisterUserComponent, MatButtonModule,
      MatCardModule],
  templateUrl: './login-and-register.component.html',
  styleUrl: './login-and-register.component.css'
})
export class LoginAndRegisterComponent {
  showLogin!: boolean;
}
